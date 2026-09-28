/**
 * Security utilities to protect against common web attacks
 * such as XSS, injection, and malicious input.
 */

/**
 * Escape HTML special characters to prevent XSS attacks.
 * Converts <, >, &, ", and ' into their HTML entities.
 */
export function escapeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Sanitize user input by trimming whitespace and escaping HTML.
 */
export function sanitizeInput(input: string): string {
  return escapeHtml(input.trim());
}

/**
 * Validate email format.
 */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Check if a string contains potentially dangerous protocols.
 */
export function hasDangerousProtocol(input: string): boolean {
  const dangerousProtocols = /^(javascript|data|vbscript|file):/i;
  return dangerousProtocols.test(input.trim());
}

/**
 * Sanitize a URL to prevent javascript: protocol injection.
 * Returns '#' if the URL is unsafe.
 */
export function sanitizeUrl(url: string): string {
  const trimmed = url.trim();
  if (!trimmed) return '#';
  if (hasDangerousProtocol(trimmed)) return '#';
  return trimmed;
}

/**
 * Check if the application is running inside an iframe.
 * Useful for detecting potential clickjacking attempts.
 */
export function isInIframe(): boolean {
  try {
    return window.self !== window.top;
  } catch {
    return true;
  }
}

/**
 * Strip script tags from HTML content.
 * Note: this is a basic filter. For rich HTML, use a dedicated sanitizer like DOMPurify.
 */
export function stripScriptTags(input: string): string {
  return input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
}
