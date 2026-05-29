import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route, useLocation, Link } from 'react-router-dom';
import { MotionConfig } from 'motion/react';
import { translations } from './constants/translations';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Portfolio } from './components/Portfolio';
import { FAQ } from './components/FAQ';
import { About } from './components/About';
import { Gallery } from './components/Gallery';
import { Testimonials } from './components/Testimonials';
import { CTABar } from './components/CTABar';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { AccessibilityWidget } from './components/AccessibilityWidget';
import { CookieBanner, initGTMConsentMode } from './components/CookieBanner';
import { LegalModal } from './components/LegalModal';
import { BackToTop } from './components/BackToTop';
import { SEO } from './components/SEO';
import { ShareWidget } from './components/ShareWidget';
import { SocialProof } from './components/SocialProof';
import { Analytics } from './components/Analytics';
import { CSPReporter } from './components/CSPReporter';
import { analytics } from './components/Analytics';

// Route-level code splitting: these pages aren't needed for the initial
// home-page render, so keep them out of the main bundle.
const BlogPage = lazy(() => import('./pages/BlogPage').then(m => ({ default: m.BlogPage })));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy').then(m => ({ default: m.PrivacyPolicy })));

// Lightweight fallback shown while a lazy route chunk loads
const RouteFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#FDFCFB] dark:bg-gray-900">
    <div className="w-10 h-10 rounded-full border-4 border-[#1E4D92]/20 border-t-[#1E4D92] animate-spin" />
  </div>
);

// 404 page for unknown routes
const NotFound = ({ t }: { t: any }) => (
  <main id="main-content" tabIndex={-1} dir={t?.dir || 'rtl'}>
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-[#FDFCFB] dark:bg-gray-900 px-6 text-center">
      <p className="text-7xl font-serif font-bold text-[#1E4D92] dark:text-[#4B9CD3]">404</p>
      <h1 className="text-2xl font-serif text-[#1A1A1A] dark:text-white">
        {t?.dir === 'rtl' ? 'הדף לא נמצא' : 'Page not found'}
      </h1>
      <Link
        to="/"
        className="bg-[#1E4D92] hover:bg-[#1A1A1A] text-white font-bold px-8 py-4 rounded-full transition-all"
      >
        {t?.dir === 'rtl' ? 'חזרה לדף הבית' : 'Back to home'}
      </Link>
    </div>
  </main>
);

// Home Page Component
const HomePage = ({ t, lang, setLang, darkMode, setDarkMode, setLegalModal }: any) => (
  <main id="main-content" tabIndex={-1}>
    <SEO t={t} lang={lang} />
    <Hero t={t} />
    <Services t={t} lang={lang} />
    <Portfolio t={t} lang={lang} />
    <FAQ t={t} />
    <About t={t} />
    <Gallery t={t} />
    <Testimonials t={t} />
    <SocialProof t={t} />
    <CTABar t={t} />
    <Contact t={t} />
    <Footer t={t} setLegalModal={setLegalModal} />
    <BackToTop />
  </main>
);

export default function App() {
  const location = useLocation();
  const [lang, setLang] = useState<'he' | 'en' | 'ru' | 'ar' | 'el'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('lang');
      if (saved === 'he' || saved === 'en' || saved === 'ru' || saved === 'ar' || saved === 'el') {
        return saved;
      }
    }
    return 'he';
  });

  // Track language changes (and persist the choice across reloads)
  const handleLanguageChange = (newLang: 'he' | 'en' | 'ru' | 'ar' | 'el') => {
    setLang(newLang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('lang', newLang);
    }
    analytics.trackLanguageChange(newLang);
  };

  // Track theme changes
  const handleThemeChange = (isDark: boolean) => {
    setDarkMode(isDark);
    analytics.trackThemeToggle(isDark ? 'dark' : 'light');
  };
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });
  const [legalModal, setLegalModal] = useState<{ isOpen: boolean, type: 'privacy' | 'terms' }>({ isOpen: false, type: 'privacy' });

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // Update html lang attribute when language changes
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const currentTranslations = (translations as any)[lang];

  return (
    <ErrorBoundary>
    <MotionConfig reducedMotion="user">
    <div className={`min-h-screen transition-colors duration-500 bg-[#FDFCFB] dark:bg-gray-900 ${darkMode ? 'dark' : ''} font-sans selection:bg-[#1E4D92] selection:text-white overflow-x-hidden`}>
      {/* Skip Navigation Link - WCAG 2.4.1 */}
      <a href="#main-content" className="skip-link">
        {currentTranslations.accessibility?.skipToMain || 'Skip to main content'}
      </a>

      <Analytics />
      <CSPReporter />

      {/* Navbar - always visible */}
      <Navbar t={currentTranslations} lang={lang} setLang={handleLanguageChange} darkMode={darkMode} setDarkMode={handleThemeChange} />

      {/* Routes */}
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={
            <HomePage
              t={currentTranslations}
              lang={lang}
              setLang={handleLanguageChange}
              darkMode={darkMode}
              setDarkMode={handleThemeChange}
              setLegalModal={setLegalModal}
            />
          } />
          <Route path="/blog" element={
            <main id="main-content" tabIndex={-1}>
              <BlogPage
                t={currentTranslations}
                lang={lang}
              />
            </main>
          } />
          <Route path="/privacy-policy" element={
            <PrivacyPolicy lang={lang} />
          } />
          <Route path="*" element={<NotFound t={currentTranslations} />} />
        </Routes>
      </Suspense>

      {/* Global widgets - only on home page */}
      {location.pathname === '/' && (
        <>
          <AccessibilityWidget />
          <ShareWidget dir={currentTranslations.dir as 'rtl' | 'ltr'} t={{ instagram: currentTranslations.instagram }} />
        </>
      )}

      {/* Cookie Banner & Legal Modal - on all pages */}
      <CookieBanner
        lang={lang}
        onShowPrivacy={() => setLegalModal({ isOpen: true, type: 'privacy' })}
        privacyPolicyPath="/privacy-policy"
      />
      <LegalModal
        isOpen={legalModal.isOpen}
        onClose={() => setLegalModal(prev => ({ ...prev, isOpen: false }))}
        type={legalModal.type}
        lang={lang}
      />
    </div>
    </MotionConfig>
    </ErrorBoundary>
  );
}
