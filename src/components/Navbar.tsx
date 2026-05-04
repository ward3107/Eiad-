import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { ClinicLogo } from './Shared';
import { LanguageSwitcher } from './LanguageSwitcher';

export const Navbar = ({ t, lang, setLang, darkMode, setDarkMode }: { 
  t: any, 
  lang: string, 
  setLang: any,
  darkMode: boolean,
  setDarkMode: (d: boolean) => void 
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t.nav.services, href: '#services' },
    { name: t.nav.portfolio, href: '#portfolio' },
    { name: t.nav.about, href: '#about' },
    { name: t.nav.gallery, href: '#gallery' },
    { name: t.nav.testimonials, href: '#testimonials' },
    { name: t.faq.tag, href: '#faq' },
    { name: t.nav.contact, href: '#contact' },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const elem = document.getElementById(targetId);
    if (elem) {
      const offset = isScrolled ? 70 : 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elemRect = elem.getBoundingClientRect().top;
      const elemPosition = elemRect - bodyRect;
      const offsetPosition = elemPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center" dir={t.dir}>
        <div className="flex items-center gap-3">
          <div className="w-16 h-12 bg-white dark:bg-gray-800 rounded flex items-center justify-center p-1 transition-colors">
            <ClinicLogo />
          </div>
            <div className={`transition-colors duration-300 ${t.dir === 'ltr' ? 'border-l pl-3 ml-1' : 'border-r pr-3 mr-1'} border-gray-200 dark:border-gray-700`}>
            <h1 className="text-xl font-bold text-[#1A1A1A] dark:text-white leading-tight">{t.name}</h1>
            <p className="text-[10px] uppercase tracking-widest text-[#1E4D92] dark:text-[#4B9CD3] font-black">{t.title}</p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-6">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-[#1A1A1A] dark:text-white/80 hover:text-[#1E4D92] dark:hover:text-[#4B9CD3] font-medium transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-[#1A1A1A] dark:text-white"
              aria-label="Toggle theme"
            >
              {darkMode ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <LanguageSwitcher currentLang={lang} setLang={setLang} />
            <a 
              href="#contact" 
              onClick={(e) => scrollToSection(e, '#contact')}
              className="bg-[#1E4D92] text-white px-6 py-2.5 rounded-full font-medium hover:bg-[#143264] transition-all transform hover:scale-105 shadow-lg shadow-[#1E4D92]/20"
            >
              {t.nav.booking}
            </a>
          </div>
        </div>

        <div className="flex items-center gap-4 md:hidden">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-[#1A1A1A] dark:text-white"
          >
            {darkMode ? <Moon size={24} /> : <Sun size={24} />}
          </button>
          <LanguageSwitcher currentLang={lang} setLang={setLang} />
          <button 
            className="p-2 text-[#1A1A1A] dark:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#1E4D92]/20 dark:focus:ring-[#4B9CD3]/20 rounded-lg" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            id="mobile-menu"
            initial="closed"
            animate="open"
            exit="closed"
            variants={{
              open: { opacity: 1, height: "auto", transition: { duration: 0.3, ease: "easeInOut", staggerChildren: 0.05, delayChildren: 0.1 } },
              closed: { opacity: 0, height: 0, transition: { duration: 0.3, ease: "easeInOut", staggerChildren: 0.05, staggerDirection: -1 } }
            }}
            className="absolute top-full left-0 right-0 bg-white dark:bg-gray-900 shadow-xl overflow-hidden md:hidden border-t border-gray-100 dark:border-gray-800"
            dir={t.dir}
          >
            <div className="py-6 px-4 flex flex-col gap-4 text-center">
              {navLinks.map((link) => (
                <motion.a 
                  key={link.name} 
                  variants={{
                    open: { opacity: 1, y: 0 },
                    closed: { opacity: 0, y: 20 }
                  }}
                  href={link.href} 
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="text-lg font-medium text-[#1A1A1A] dark:text-white py-2 block hover:text-[#1E4D92] dark:hover:text-[#4B9CD3] transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.a 
                variants={{
                  open: { opacity: 1, scale: 1 },
                  closed: { opacity: 0, scale: 0.9 }
                }}
                href="#contact" 
                onClick={(e) => scrollToSection(e, '#contact')}
                className="mt-4 bg-[#1E4D92] text-white px-8 py-4 rounded-full font-bold text-lg block mx-auto w-full max-w-[280px] shadow-lg shadow-[#1E4D92]/20"
              >
                {t.nav.booking}
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
