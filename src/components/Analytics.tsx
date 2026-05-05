import { useEffect } from 'react';

// Replace with your actual GA4 Measurement ID
const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // TODO: Update with real GA4 ID

declare global {
  interface Window {
    gtag?: (command: string, targetId: string, config?: Record<string, unknown>) => void;
  }
}

// Initialize Google Analytics
export const initializeGA = () => {
  if (typeof window === 'undefined' || !GA_MEASUREMENT_ID || GA_MEASUREMENT_ID === 'G-XXXXXXXXXX') {
    return;
  }

  // Load gtag script with SRI (Subresource Integrity)
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  script.integrity = 'sha384-dHwgD2k4pSNEEeHNU6dUJ5KJxGJwngcKqtYCrqnVMDoOeEkkOya8WbvfxKJREYeEe';
  script.crossOrigin = 'anonymous';
  script.referrerPolicy = 'no-referrer-when-downgrade';
  document.head.appendChild(script);

  // Initialize gtag using DOM methods for safety
  const configScript = document.createElement('script');
  const configCode = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_MEASUREMENT_ID}',{'anonymize_ip':true,'send_page_view':true});`;
  configScript.textContent = configCode;
  document.head.appendChild(configScript);
};

// Track page views
export const trackPageView = (path: string, title: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: path,
      page_title: title,
    });
  }
};

// Track events
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Specific tracking functions for physiotherapy clinic
export const Analytics = () => {
  useEffect(() => {
    initializeGA();
  }, []);

  return null;
};

// Export tracking functions to use in components
export const analytics = {
  // Track WhatsApp click
  trackWhatsAppClick: (location: string) => {
    trackEvent('click', 'whatsapp', location);
  },

  // Track phone call click
  trackPhoneClick: (location: string) => {
    trackEvent('click', 'phone', location);
  },

  // Track social media click
  trackSocialClick: (platform: string) => {
    trackEvent('click', 'social_media', platform);
  },

  // Track language change
  trackLanguageChange: (lang: string) => {
    trackEvent('change', 'language', lang);
  },

  // Track dark mode toggle
  trackThemeToggle: (theme: 'light' | 'dark') => {
    trackEvent('toggle', 'theme', theme);
  },

  // Track navigation clicks
  trackNavClick: (section: string) => {
    trackEvent('click', 'navigation', section);
  },

  // Track form interactions
  trackFormStart: (formName: string) => {
    trackEvent('start', 'form', formName);
  },

  trackFormSubmit: (formName: string) => {
    trackEvent('submit', 'form', formName);
  },

  // Track FAQ interactions
  trackFAQOpen: (question: string) => {
    trackEvent('open', 'faq', question.substring(0, 50));
  },

  // Track service clicks
  trackServiceClick: (serviceName: string) => {
    trackEvent('click', 'service', serviceName);
  },

  // Track testimonial view
  trackTestimonialView: (index: number) => {
    trackEvent('view', 'testimonial', String(index));
  },
};
