import { useEffect } from 'react';
import { isInIframe } from '../utils/security';

/**
 * Initializes client-side security protections.
 * Run this component once at the root of the application.
 */
export default function SecurityInit() {
  useEffect(() => {
    // Detect clickjacking attempt. CSP frame-ancestors (set via HTTP header) is the
    // primary defense. This log is a non-blocking fallback for development awareness.
    if (isInIframe()) {
      // eslint-disable-next-line no-console
      console.warn('Security warning: this page appears to be loaded inside an iframe.');
    }

    // Ensure all external anchor links open safely.
    const handleDocumentClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const anchor = target.closest('a');
      if (
        anchor &&
        anchor.href &&
        anchor.target === '_blank' &&
        !anchor.rel?.includes('noopener')
      ) {
        anchor.rel = 'noopener noreferrer nofollow';
      }
    };

    document.addEventListener('click', handleDocumentClick);
    return () => document.removeEventListener('click', handleDocumentClick);
  }, []);

  return null;
}
