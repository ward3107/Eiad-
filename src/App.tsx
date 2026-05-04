import React, { useState, useEffect } from 'react';
import { translations } from './constants/translations';
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
import { CookieBanner } from './components/CookieBanner';
import { LegalModal } from './components/LegalModal';
import { BackToTop } from './components/BackToTop';
import { SEO } from './components/SEO';

export default function App() {
  const [lang, setLang] = useState<'he' | 'en' | 'ru' | 'ar' | 'el'>('he');
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

  const currentTranslations = (translations as any)[lang];

  return (
    <div className={`min-h-screen transition-colors duration-500 bg-[#FDFCFB] dark:bg-gray-900 ${darkMode ? 'dark' : ''} font-sans selection:bg-[#1E4D92] selection:text-white overflow-x-hidden`}>
      <SEO t={currentTranslations} lang={lang} />
      <Navbar t={currentTranslations} lang={lang} setLang={setLang} darkMode={darkMode} setDarkMode={setDarkMode} />
      <Hero t={currentTranslations} />
      <Services t={currentTranslations} lang={lang} />
      <Portfolio t={currentTranslations} lang={lang} />
      <FAQ t={currentTranslations} />
      <About t={currentTranslations} />
      <Gallery t={currentTranslations} />
      <Testimonials t={currentTranslations} />
      <CTABar t={currentTranslations} />
      <Contact t={currentTranslations} />
      <Footer t={currentTranslations} setLegalModal={setLegalModal} />

      <AccessibilityWidget />
      <CookieBanner lang={lang} onShowPrivacy={() => setLegalModal({ isOpen: true, type: 'privacy' })} />
      <LegalModal 
        isOpen={legalModal.isOpen} 
        onClose={() => setLegalModal(prev => ({ ...prev, isOpen: false }))} 
        type={legalModal.type} 
        lang={lang} 
      />
      <BackToTop />
    </div>
  );
}
