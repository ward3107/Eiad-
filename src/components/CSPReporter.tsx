import { useEffect } from 'react';

/**
 * CSP Violation Reporter
 * Logs Content Security Policy violations for monitoring and debugging
 * In production, these would be sent to your analytics/security service
 */
export const CSPReporter = () => {
  useEffect(() => {
    // Only in development
    if (import.meta.env.DEV) {
      const handleCSPViolation = (event: SecurityPolicyViolationEvent) => {
        console.group('🔒 CSP Violation Detected');
        console.warn('Blocked URI:', event.blockedURI);
        console.warn('Violated Directive:', event.violatedDirective);
        console.warn('Original Policy:', event.originalPolicy);
        console.warn('Document URI:', event.documentURI);
        console.warn('Referrer:', event.referrer);
        console.warn('Sample:', event.sample);
        console.groupEnd();
      };

      // Listen for CSP violations
      document.addEventListener('securitypolicyviolation', handleCSPViolation);

      return () => {
        document.removeEventListener('securitypolicyviolation', handleCSPViolation);
      };
    }
  }, []);

  return null;
};

/**
 * Helper to report CSP violations to an external service
 * Call this from your backend API to collect reports
 */
export const reportCSPViolation = async (violation: SecurityPolicyViolationEvent) => {
  // In production, send to your monitoring service
  // Example: Send to analytics, Sentry, or custom endpoint
  if (!import.meta.env.DEV) {
    try {
      await fetch('/api/csp-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          blockedURI: violation.blockedURI,
          violatedDirective: violation.violatedDirective,
          documentURI: violation.documentURI,
          referrer: violation.referrer,
          timestamp: new Date().toISOString(),
        }),
      });
    } catch (error) {
      // Fail silently to not affect user experience
      console.error('Failed to report CSP violation:', error);
    }
  }
};
