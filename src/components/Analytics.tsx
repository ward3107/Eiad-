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

  // Load gtag script. Note: gtag/js is served dynamically by Google and its
  // contents change frequently, so a Subresource Integrity (integrity) hash
  // cannot be used here — a pinned hash would cause the browser to block the
  // script on every change and silently disable analytics.
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
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
