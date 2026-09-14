/**
 * Security and Data Protection Utilities for SSC CHSL 2026 Study Index
 * Ensures PII privacy, anti-tampering, and secure session management.
 */

/**
 * Masks phone numbers to prevent shoulder-surfing and screen recording leaks.
 * Example: "+91 9876543210" -> "+91 ••••• •3210"
 */
export function maskPhoneNumber(phone?: string): string {
  if (!phone) return '';
  const trimmed = phone.trim();
  if (trimmed.length <= 4) return '••••';
  
  // Extract country prefix if present
  const parts = trimmed.split(' ');
  if (parts.length > 1) {
    const prefix = parts[0];
    const rest = parts.slice(1).join('');
    const last4 = rest.slice(-4);
    const masked = '•'.repeat(Math.max(rest.length - 4, 3));
    return `${prefix} ${masked} ${last4}`;
  }

  const last4 = trimmed.slice(-4);
  const masked = '•'.repeat(Math.max(trimmed.length - 4, 4));
  return `${masked}${last4}`;
}

/**
 * Masks email addresses to hide personal user identity.
 * Example: "bhativikash8094@gmail.com" -> "bh•••••@gmail.com"
 */
export function maskEmail(email?: string): string {
  if (!email || !email.includes('@')) return '';
  const [user, domain] = email.split('@');
  if (user.length <= 2) {
    return `${user[0] || '•'}•••@${domain}`;
  }
  const visiblePrefix = user.slice(0, 2);
  return `${visiblePrefix}${'•'.repeat(Math.max(user.length - 2, 4))}@${domain}`;
}

/**
 * Sanitizes text input to prevent Cross-Site Scripting (XSS) and injection attacks.
 */
export function sanitizeInput(input: string, maxLength = 2000): string {
  if (!input) return '';
  return input
    .replace(/[<>]/g, '') // Strip brackets
    .replace(/javascript:/gi, '') // Strip js pseudo-protocols
    .slice(0, maxLength)
    .trim();
}

/**
 * Securely clears all local session data and storage from the device.
 * Protects users using shared, public, or library computers.
 */
export function secureWipeAllLocalData(): void {
  try {
    sessionStorage.clear();
    localStorage.removeItem('ssc_chsl_user_session');
    localStorage.removeItem('ssc_chsl_2026_progress_v1');
    
    // Clear any user-specific progress keys
    const keysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('ssc_')) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach((k) => localStorage.removeItem(k));
  } catch (e) {
    console.error('Error during secure wipe:', e);
  }
}
