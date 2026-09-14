import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut as fbSignOut, 
  onAuthStateChanged, 
  RecaptchaVerifier, 
  signInWithPhoneNumber, 
  ConfirmationResult,
  User,
  updateProfile
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc, 
  collection, 
  getDocs, 
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import { AppUser, DayProgress } from '../types';

// Initialize Firebase App singleton
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Auth
export const auth = getAuth(app);

// Initialize Firestore (with custom databaseId if configured)
export const db = firebaseConfig.firestoreDatabaseId 
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);

// Google Auth Provider
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

/**
 * Sign in with Google Popup
 */
export async function loginWithGoogle(): Promise<AppUser> {
  const result = await signInWithPopup(auth, googleProvider);
  const fbUser = result.user;

  const appUser: AppUser = {
    uid: fbUser.uid,
    email: fbUser.email || undefined,
    phoneNumber: fbUser.phoneNumber || undefined,
    displayName: fbUser.displayName || 'Aspirant',
    photoURL: fbUser.photoURL || undefined,
    authProvider: 'google',
  };

  // Sync profile with Firestore (non-blocking if firestore is offline)
  try {
    await syncUserProfile(appUser);
  } catch (e) {
    console.warn('User profile sync skipped or offline:', e);
  }
  return appUser;
}

/**
 * Initialize RecaptchaVerifier for Mobile Number Authentication
 */
export function initPhoneRecaptcha(containerId: string): RecaptchaVerifier {
  // Clear any existing recaptcha widget on the window if present
  if ((window as any).recaptchaVerifier) {
    try {
      (window as any).recaptchaVerifier.clear();
    } catch {
      // ignore
    }
  }

  const verifier = new RecaptchaVerifier(auth, containerId, {
    size: 'invisible',
    callback: () => {
      // reCAPTCHA solved - allow signInWithPhoneNumber
    },
    'expired-callback': () => {
      // Response expired
    }
  });

  (window as any).recaptchaVerifier = verifier;
  return verifier;
}

/**
 * Send OTP to Mobile Number
 * @param phoneNumber Formatted with country code, e.g. +919876543210
 * @param verifier RecaptchaVerifier instance
 */
export async function sendOtpToPhone(
  phoneNumber: string, 
  verifier: RecaptchaVerifier
): Promise<ConfirmationResult> {
  return await signInWithPhoneNumber(auth, phoneNumber, verifier);
}

/**
 * Confirm Mobile OTP and Sign In
 */
export async function verifyPhoneOtp(
  confirmationResult: ConfirmationResult,
  otpCode: string,
  aspirantName?: string
): Promise<AppUser> {
  const userCredential = await confirmationResult.confirm(otpCode);
  const fbUser = userCredential.user;

  if (aspirantName && aspirantName.trim()) {
    try {
      await updateProfile(fbUser, { displayName: aspirantName.trim() });
    } catch (e) {
      console.warn('Could not update profile name', e);
    }
  }

  const appUser: AppUser = {
    uid: fbUser.uid,
    email: fbUser.email || undefined,
    phoneNumber: fbUser.phoneNumber || undefined,
    displayName: fbUser.displayName || aspirantName || `Aspirant (${fbUser.phoneNumber?.slice(-4) || 'User'})`,
    photoURL: fbUser.photoURL || undefined,
    authProvider: 'phone',
  };

  await syncUserProfile(appUser);
  return appUser;
}

/**
 * Save user profile document to /users/{userId}
 */
export async function syncUserProfile(user: AppUser): Promise<void> {
  if (!user.uid) return;

  const userRef = doc(db, 'users', user.uid);
  try {
    const existingSnap = await getDoc(userRef);

    const profileData: any = {
      userId: user.uid,
      displayName: user.displayName || 'Aspirant',
      authProvider: user.authProvider || 'other',
      updatedAt: serverTimestamp(),
    };

    if (user.email) profileData.email = user.email;
    if (user.phoneNumber) profileData.phoneNumber = user.phoneNumber;
    if (user.photoURL) profileData.photoURL = user.photoURL;

    if (!existingSnap.exists()) {
      profileData.createdAt = serverTimestamp();
      await setDoc(userRef, profileData);
    } else {
      const existingData = existingSnap.data();
      if (existingData?.createdAt) {
        profileData.createdAt = existingData.createdAt;
      }
      await setDoc(userRef, profileData, { merge: true });
    }
  } catch (error) {
    console.error('Error syncing user profile to Firestore:', error);
  }
}

/**
 * Save a day's study progress to Firestore subcollection: /users/{userId}/studyProgress/{day}
 */
export async function saveDayProgressToFirestore(
  userId: string,
  day: number,
  dayProg: DayProgress
): Promise<void> {
  if (!userId) return;

  const dayDocRef = doc(db, 'users', userId, 'studyProgress', `day-${day}`);
  try {
    const payload: any = {
      userId,
      day,
      completed: Boolean(dayProg.completed),
      arithmeticDone: Boolean(dayProg.arithmeticDone),
      advancedDone: Boolean(dayProg.advancedDone),
      reasoningDone: Boolean(dayProg.reasoningDone),
      englishDone: Boolean(dayProg.englishDone),
      gkDone: Boolean(dayProg.gkDone),
      arithmeticQs: Math.min(1000, Math.max(0, dayProg.arithmeticQs || 0)),
      advancedQs: Math.min(1000, Math.max(0, dayProg.advancedQs || 0)),
      reasoningQs: Math.min(1000, Math.max(0, dayProg.reasoningQs || 0)),
      englishQs: Math.min(1000, Math.max(0, dayProg.englishQs || 0)),
      gkGsQs: Math.min(1000, Math.max(0, dayProg.gkGsQs || 0)),
      notes: (dayProg.notes || '').slice(0, 2000),
      updatedAt: serverTimestamp(),
    };

    await setDoc(dayDocRef, payload, { merge: true });
  } catch (error) {
    console.error(`Error saving Day ${day} progress to Firestore:`, error);
  }
}

/**
 * Load all 45 days study progress for the user from Firestore
 */
export async function fetchUserProgressFromFirestore(
  userId: string
): Promise<Record<number, DayProgress>> {
  if (!userId) return {};

  const result: Record<number, DayProgress> = {};
  const colRef = collection(db, 'users', userId, 'studyProgress');

  try {
    const querySnapshot = await getDocs(colRef);
    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      const dayNum = Number(data.day);
      if (dayNum >= 1 && dayNum <= 45) {
        result[dayNum] = {
          completed: Boolean(data.completed),
          arithmeticDone: Boolean(data.arithmeticDone),
          advancedDone: Boolean(data.advancedDone),
          reasoningDone: Boolean(data.reasoningDone),
          englishDone: Boolean(data.englishDone),
          gkDone: Boolean(data.gkDone),
          arithmeticQs: data.arithmeticQs || 0,
          advancedQs: data.advancedQs || 0,
          reasoningQs: data.reasoningQs || 0,
          englishQs: data.englishQs || 0,
          gkGsQs: data.gkGsQs || 0,
          notes: data.notes || '',
        };
      }
    });
  } catch (error) {
    console.error('Error fetching study progress from Firestore:', error);
  }

  return result;
}

/**
 * Sign out
 */
export async function logOutUser(): Promise<void> {
  await fbSignOut(auth);
}
