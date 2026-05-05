/**
 * Cookie Consent — Amendment 13 compliant — GTM Consent Mode v2
 * Signals: analytics_storage, ad_storage, ad_user_data, ad_personalization
 * Built: 2026-05-05
 *
 * Complies with:
 * - Israel's Privacy Protection Law Amendment 13 (August 2025)
 * - PPA's July 2022 notification guidelines
 * - Google Tag Manager Consent Mode v2
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronUp, X, Check } from 'lucide-react';

// Cookie consent data structure
export interface CookieConsent {
  version: string;
  necessary: boolean; // Always true, locked
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
  language: string;
  expires: string;
}

const CONSENT_VERSION = '1.0';
const CONSENT_EXPIRY_MONTHS = 12;
const STORAGE_KEY = 'cookieConsent';

// Initialize GTM Consent Mode v2 with default DENIED state
// Must run before GTM loads
export const initGTMConsentMode = () => {
  if (typeof window !== 'undefined' && (window as any).dataLayer) {
    (window as any).dataLayer = (window as any).dataLayer || [];
    const gtag = (...args: any[]) => (window as any).dataLayer.push(args);

    // Set all consent to denied by default
    gtag('consent', 'default', {
      analytics_storage: 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      wait_for_update: 2000
    });
  }
};

// Update GTM Consent Mode based on user choices
export const updateGTMConsent = (analytics: boolean, marketing: boolean) => {
  if (typeof window !== 'undefined' && (window as any).dataLayer) {
    const gtag = (...args: any[]) => (window as any).dataLayer.push(args);

    gtag('consent', 'update', {
      analytics_storage: analytics ? 'granted' : 'denied',
      ad_storage: marketing ? 'granted' : 'denied',
      ad_user_data: marketing ? 'granted' : 'denied',
      ad_personalization: marketing ? 'granted' : 'denied'
    });

    // Push event for GTM tag triggers (Facebook Pixel, etc.)
    (window as any).dataLayer.push({
      event: 'cookie_consent_update',
      consent_analytics: analytics,
      consent_marketing: marketing
    });
  }
};

// Check if consent exists and is valid
export const checkStoredConsent = (): CookieConsent | null => {
  if (typeof window === 'undefined') return null;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;

    const consent: CookieConsent = JSON.parse(stored);

    // Check version
    if (consent.version !== CONSENT_VERSION) return null;

    // Check expiry
    const now = new Date();
    const expiryDate = new Date(consent.expires);
    if (now > expiryDate) return null;

    return consent;
  } catch {
    return null;
  }
};

// Save consent to localStorage
const saveConsent = (analytics: boolean, marketing: boolean, language: string): CookieConsent => {
  const now = new Date();
  const expires = new Date();
  expires.setMonth(expires.getMonth() + CONSENT_EXPIRY_MONTHS);

  const consent: CookieConsent = {
    version: CONSENT_VERSION,
    necessary: true,
    analytics,
    marketing,
    timestamp: now.toISOString(),
    language,
    expires: expires.toISOString()
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
  return consent;
};

// Translations for the cookie banner
const translations: Record<string, any> = {
  he: {
    dir: 'rtl' as const,
    title: 'הסכמת עוגיות',
    text: 'אנו משתמשים בעוגיות כדי לשפר את חווית הגלישה שלך. אתה יכול לבחור אילו עוגיות לאפשר. פרטיותך מוגנת על פי חוק הגנת הפרטיות (תיקון 13).',
    acceptAll: 'קבל הכל',
    rejectAll: 'דחה הכל',
    customize: 'התאם אישית',
    savePreferences: 'שמור העדפות',
    close: 'סגור',
    privacyPolicy: 'מדיניות פרטיות',
    categories: {
      necessary: {
        name: 'נדרש',
        description: 'חיוני לתפקוד האתר. אין שיתוף נתונים אישיים.',
        locked: 'תמיד פעיל'
      },
      analytics: {
        name: 'ניתוח',
        description: 'Google Analytics — צפיות בדפים, משך סשן. הנתונים נשלחים לשרתי Google. אין נתונים מזהים אישית. משמש לשיפור האתר.'
      },
      marketing: {
        name: 'שיווק',
        description: 'פיקסל פייסבוק, Google Ads — משמש להצגת מודעות רלוונטיות. נתונים משותפים עם Meta ו-Google למיקוד מודעות ומעקב המרות.'
      }
    },
    aria: {
      banner: 'באנר הסכמת עוגיות',
      customize: 'פאנל התאמה אישית של העדפות עוגיות',
      toggle: 'הפעל/כבה {category}',
      close: 'סגור פאנל התאמה אישית'
    }
  },
  en: {
    dir: 'ltr' as const,
    title: 'Cookie Consent',
    text: 'We use cookies to improve your browsing experience. You can choose which cookies to allow. Your privacy is protected under the Privacy Protection Law (Amendment 13).',
    acceptAll: 'Accept All',
    rejectAll: 'Reject All',
    customize: 'Customize',
    savePreferences: 'Save Preferences',
    close: 'Close',
    privacyPolicy: 'Privacy Policy',
    categories: {
      necessary: {
        name: 'Necessary',
        description: 'Required for the site to function. No personal data shared.',
        locked: 'Always on'
      },
      analytics: {
        name: 'Analytics',
        description: 'Google Analytics — page views, session duration. Data sent to Google servers. No personally identifiable data. Used to improve the site.'
      },
      marketing: {
        name: 'Marketing',
        description: 'Facebook Pixel, Google Ads — used to show you relevant ads. Data shared with Meta and Google for ad targeting and conversion tracking.'
      }
    },
    aria: {
      banner: 'Cookie consent banner',
      customize: 'Cookie preferences customization panel',
      toggle: 'Toggle {category}',
      close: 'Close customization panel'
    }
  },
  ar: {
    dir: 'rtl' as const,
    title: 'موافقة ملفات تعريف الارتباط',
    text: 'نحن نستخدم ملفات تعريف الارتباط لتحسين تجربة التصفح الخاصة بك. يمكنك اختيار ملفات تعريف الارتباط المسموح بها. خصوصيتك محمية بموجب قانون حماية الخصوصية (التعديل 13).',
    acceptAll: 'قبول الكل',
    rejectAll: 'رفض الكل',
    customize: 'تخصيص',
    savePreferences: 'حفظ التفضيلات',
    close: 'إغلاق',
    privacyPolicy: 'سياسة الخصوصية',
    categories: {
      necessary: {
        name: 'ضروري',
        description: 'مطلوب لتشغيل الموقع. لا تشارك任何 بيانات شخصية.',
        locked: 'دائمًا نشط'
      },
      analytics: {
        name: 'التحليلات',
        description: 'Google Analytics — مشاهدات الصفحة، مدة الجلسة. يتم إرسال البيانات إلى خوادم Google. لا توجد بيانات شخصية قابلة للتحديد. تستخدم لتحسين الموقع.'
      },
      marketing: {
        name: 'التسويق',
        description: 'بكسل فيسبوك، Google Ads — يُستخدم لإظهار إعلانات ذات صلة. تتم مشاركة البيانات مع Meta وGoogle لاستهداف الإعلانات وتتبع التحويلات.'
      }
    },
    aria: {
      banner: 'بانر موافقة ملفات تعريف الارتباط',
      customize: 'لوحة تخصيص تفضيلات ملفات تعريف الارتباط',
      toggle: 'تفعيل/إلغاء {category}',
      close: 'إغلاق لوحة التخصيص'
    }
  },
  ru: {
    dir: 'ltr' as const,
    title: 'Согласие на использование файлов cookie',
    text: 'Мы используем файлы cookie для улучшения вашего опыта. Вы можете выбрать, какие файлы cookie разрешить. Ваша конфиденциальность защищена Законом о защите конфиденциальности (Поправка 13).',
    acceptAll: 'Принять все',
    rejectAll: 'Отклонить все',
    customize: 'Настроить',
    savePreferences: 'Сохранить настройки',
    close: 'Закрыть',
    privacyPolicy: 'Политика конфиденциальности',
    categories: {
      necessary: {
        name: 'Необходимые',
        description: 'Требуются для работы сайта. Личные данные не передаются.',
        locked: 'Всегда включены'
      },
      analytics: {
        name: 'Аналитика',
        description: 'Google Analytics — просмотры страниц, длительность сессии. Данные отправляются на серверы Google. Нет персональных данных. Используется для улучшения сайта.'
      },
      marketing: {
        name: 'Маркетинг',
        description: 'Facebook Pixel, Google Ads — используются для показа релевантной рекламы. Данные передаются Meta и Google для таргетинга рекламы и отслеживания конверсий.'
      }
    },
    aria: {
      banner: 'Баннер согласия на использование файлов cookie',
      customize: 'Панель настроек файлов cookie',
      toggle: 'Переключить {category}',
      close: 'Закрыть панель настроек'
    }
  },
  el: {
    dir: 'ltr' as const,
    title: 'Συγκατάθεση Cookies',
    text: 'Χρησιμοποιούμε cookies για να βελτιώσουμε την εμπειρία περιήγησής σας. Μπορείτε να επιλέξετε ποια cookies να επιτρέψετε. Το απόρρητό σας προστατεύεται από τον Νόμο Προστασίας της Ιδιωτικής Ζωής (Τροπολογία 13).',
    acceptAll: 'Αποδοχή όλων',
    rejectAll: 'Απόρριψη όλων',
    customize: 'Προσαρμογή',
    savePreferences: 'Αποθήκευση προτιμήσεων',
    close: 'Κλείσιμο',
    privacyPolicy: 'Πολιτική Απορρήτου',
    categories: {
      necessary: {
        name: 'Απαραίτητα',
        description: 'Απαραίτητα για τη λειτουργία του ιστότοπου. Δεν μοιράζονται προσωπικά δεδομένα.',
        locked: 'Πάντα ενεργό'
      },
      analytics: {
        name: 'Αναλυτικά',
        description: 'Google Analytics — προβολές σελίδων, διάρκεια συνεδρίας. Τα δεδομένα αποστέλλονται σε διακομιστές Google. Χωρίς προσωπικά αναγνωρίσιμα δεδομένα. Χρησιμοποιείται για βελτίωση του ιστότοπου.'
      },
      marketing: {
        name: 'Μάρκετινγκ',
        description: 'Facebook Pixel, Google Ads — χρησιμοποιείται για εμφάνιση σχετικών διαφημίσεων. Τα δεδομένα μοιράζονται με τη Meta και την Google για στοχευμένη διαφήμιση και παρακολούθηση μετατροπών.'
      }
    },
    aria: {
      banner: 'Banner συγκατάθεσης cookies',
      customize: 'Πάνελος προσαρμογής προτιμήσεων cookies',
      toggle: 'Ενεργοποίηση/Απενεργοποίηση {category}',
      close: 'Κλείσιμο πίνακα προσαρμογής'
    }
  }
};

interface CookieBannerProps {
  lang?: string;
  onShowPrivacy?: () => void;
  privacyPolicyPath?: string;
}

export const CookieBanner = ({
  lang = 'he',
  onShowPrivacy,
  privacyPolicyPath = '/privacy-policy'
}: CookieBannerProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);
  const [consent, setConsent] = useState({ necessary: true, analytics: false, marketing: false });

  const t = translations[lang] || translations.he;

  useEffect(() => {
    // Check for existing valid consent
    const storedConsent = checkStoredConsent();
    if (storedConsent) {
      // Apply stored consent
      updateGTMConsent(storedConsent.analytics, storedConsent.marketing);
      return; // Don't show banner
    }

    // Show banner after a short delay
    const timer = setTimeout(() => setIsVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleAcceptAll = () => {
    const newConsent = { necessary: true, analytics: true, marketing: true };
    setConsent(newConsent);
    saveConsent(true, true, lang);
    updateGTMConsent(true, true);
    setIsVisible(false);
    setIsCustomizeOpen(false);
  };

  const handleRejectAll = () => {
    const newConsent = { necessary: true, analytics: false, marketing: false };
    setConsent(newConsent);
    saveConsent(false, false, lang);
    updateGTMConsent(false, false);
    setIsVisible(false);
    setIsCustomizeOpen(false);
  };

  const handleSavePreferences = () => {
    saveConsent(consent.analytics, consent.marketing, lang);
    updateGTMConsent(consent.analytics, consent.marketing);
    setIsVisible(false);
    setIsCustomizeOpen(false);
  };

  const handleCustomize = () => {
    setIsCustomizeOpen(!isCustomizeOpen);
  };

  const handleToggle = (category: 'analytics' | 'marketing') => {
    setConsent(prev => ({ ...prev, [category]: !prev[category] }));
  };

  // Handle Enter/Space for keyboard accessibility
  const handleKeyDown = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      action();
    }
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Backdrop when customize is open */}
      <AnimatePresence>
        {isCustomizeOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-[100]"
            onClick={() => setIsCustomizeOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Main Banner */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className={`fixed bottom-0 left-0 right-0 z-[101] ${isCustomizeOpen ? 'md:mb-[300px]' : ''} transition-all duration-300`}
        role="dialog"
        aria-label={t.aria.banner}
        aria-modal="false"
      >
        <div className="bg-[#0A0A0A] dark:bg-black border-t border-white/10" dir={t.dir}>
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 md:py-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              {/* Icon */}
              <div className="shrink-0">
                <svg className="w-8 h-8 text-[#4B9CD3]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>

              {/* Text */}
              <div className="flex-1 text-white/90 text-sm md:text-base">
                <p className="font-medium mb-1">{t.title}</p>
                <p className="opacity-80">{t.text}</p>
              </div>

              {/* Buttons */}
              <div className="flex flex-wrap gap-3 shrink-0">
                <button
                  onClick={handleAcceptAll}
                  onKeyDown={(e) => handleKeyDown(e, handleAcceptAll)}
                  className="px-4 md:px-6 py-2.5 bg-[#4B9CD3] hover:bg-[#5DADE2] text-[#1A1A1A] rounded-full font-semibold text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#4B9CD3] focus:ring-offset-2 focus:ring-offset-[#0A0A0A]"
                >
                  {t.acceptAll}
                </button>

                <button
                  onClick={handleRejectAll}
                  onKeyDown={(e) => handleKeyDown(e, handleRejectAll)}
                  className="px-4 md:px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-full font-semibold text-sm transition-all focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#0A0A0A]"
                >
                  {t.rejectAll}
                </button>

                <button
                  onClick={handleCustomize}
                  onKeyDown={(e) => handleKeyDown(e, handleCustomize)}
                  className="px-4 md:px-6 py-2.5 border border-white/30 hover:border-white/60 text-white rounded-full font-semibold text-sm transition-all focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#0A0A0A] flex items-center gap-2"
                  aria-expanded={isCustomizeOpen}
                  aria-controls="cookie-customize-panel"
                >
                  {t.customize}
                  {isCustomizeOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Customize Panel */}
      <AnimatePresence>
        {isCustomizeOpen && (
          <motion.div
            id="cookie-customize-panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-0 left-0 right-0 z-[102] bg-[#1A1A1A] dark:bg-gray-900 border-t border-white/20 shadow-2xl"
            role="region"
            aria-label={t.aria.customize}
            dir={t.dir}
          >
            <div className="max-w-4xl mx-auto px-4 md:px-8 py-6">
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white">{t.customize}</h3>
                <button
                  onClick={() => setIsCustomizeOpen(false)}
                  className="text-white/60 hover:text-white transition-colors p-1"
                  aria-label={t.aria.close}
                >
                  <X size={24} />
                </button>
              </div>

              {/* Categories */}
              <div className="space-y-4 mb-6">
                {/* Necessary */}
                <div className="flex items-start justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="flex-1 pr-4">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-white">{t.categories.necessary.name}</h4>
                      <span className="text-xs px-2 py-0.5 bg-[#4B9CD3]/20 text-[#4B9CD3] rounded-full">
                        {t.categories.necessary.locked}
                      </span>
                    </div>
                    <p className="text-sm text-white/60">{t.categories.necessary.description}</p>
                  </div>
                  <div className="shrink-0">
                    <div className="w-12 h-6 bg-[#4B9CD3] rounded-full flex items-center justify-center">
                      <Check size={16} className="text-white" />
                    </div>
                  </div>
                </div>

                {/* Analytics */}
                <div className="flex items-start justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="flex-1 pr-4">
                    <h4 className="font-semibold text-white mb-1">{t.categories.analytics.name}</h4>
                    <p className="text-sm text-white/60">{t.categories.analytics.description}</p>
                  </div>
                  <button
                    onClick={() => handleToggle('analytics')}
                    onKeyDown={(e) => handleKeyDown(e, () => handleToggle('analytics'))}
                    className={`shrink-0 w-12 h-6 rounded-full p-1 transition-colors ${
                      consent.analytics ? 'bg-[#4B9CD3]' : 'bg-white/20'
                    }`}
                    role="switch"
                    aria-checked={consent.analytics}
                    aria-label={t.aria.toggle.replace('{category}', t.categories.analytics.name)}
                  >
                    <motion.div
                      className="w-4 h-4 bg-white rounded-full shadow-sm"
                      animate={{ x: consent.analytics ? (t.dir === 'rtl' ? 4 : 20) : (t.dir === 'rtl' ? 20 : 4) }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  </button>
                </div>

                {/* Marketing */}
                <div className="flex items-start justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="flex-1 pr-4">
                    <h4 className="font-semibold text-white mb-1">{t.categories.marketing.name}</h4>
                    <p className="text-sm text-white/60">{t.categories.marketing.description}</p>
                  </div>
                  <button
                    onClick={() => handleToggle('marketing')}
                    onKeyDown={(e) => handleKeyDown(e, () => handleToggle('marketing'))}
                    className={`shrink-0 w-12 h-6 rounded-full p-1 transition-colors ${
                      consent.marketing ? 'bg-[#4B9CD3]' : 'bg-white/20'
                    }`}
                    role="switch"
                    aria-checked={consent.marketing}
                    aria-label={t.aria.toggle.replace('{category}', t.categories.marketing.name)}
                  >
                    <motion.div
                      className="w-4 h-4 bg-white rounded-full shadow-sm"
                      animate={{ x: consent.marketing ? (t.dir === 'rtl' ? 4 : 20) : (t.dir === 'rtl' ? 20 : 4) }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  </button>
                </div>
              </div>

              {/* Footer */}
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-white/10">
                <a
                  href={privacyPolicyPath}
                  onClick={onShowPrivacy}
                  className="text-sm text-[#4B9CD3] hover:text-[#5DADE2] underline"
                >
                  {t.privacyPolicy}
                </a>

                <button
                  onClick={handleSavePreferences}
                  className="px-6 py-3 bg-[#4B9CD3] hover:bg-[#5DADE2] text-[#1A1A1A] rounded-full font-bold transition-all focus:outline-none focus:ring-2 focus:ring-[#4B9CD3] focus:ring-offset-2 focus:ring-offset-[#1A1A1A]"
                >
                  {t.savePreferences}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CookieBanner;
