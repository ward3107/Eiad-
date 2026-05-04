import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, CheckCircle2 } from 'lucide-react';

export const LanguageSwitcher = ({ currentLang, setLang }: { currentLang: string, setLang: (l: 'he' | 'en' | 'ru' | 'ar' | 'el') => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const langs = [
    { code: 'he', name: 'עברית' },
    { code: 'ar', name: 'العربية' },
    { code: 'en', name: 'English' },
    { code: 'ru', name: 'Русский' },
    { code: 'el', name: 'Ελληνικά' }
  ];

  return (
    <div 
      className="relative"
    >
      <button 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select Language"
        aria-haspopup="true"
        aria-expanded={isOpen}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-200 dark:border-white/10 bg-white dark:bg-gray-800 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-[#1E4D92]/20 dark:focus:ring-[#4B9CD3]/20 text-[#1A1A1A] dark:text-white"
      >
        <Globe size={16} className="text-[#1E4D92] dark:text-[#4B9CD3]" />
        <span className="text-xs font-bold uppercase">{currentLang}</span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-[90]" onClick={() => setIsOpen(false)} />
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              role="menu"
              className="absolute top-full mt-2 left-0 md:right-0 bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-2 min-w-[140px] z-[100] border border-gray-100 dark:border-white/5"
            >
              {langs.map((l) => (
                <button
                  key={l.code}
                  role="menuitem"
                  aria-current={currentLang === l.code ? 'true' : undefined}
                  onClick={() => {
                    setLang(l.code as any);
                    setIsOpen(false);
                  }}
                  className={`w-full text-right px-4 py-2.5 text-sm rounded-xl transition-all flex items-center justify-between ${currentLang === l.code ? 'bg-[#1E4D92] dark:bg-[#4B9CD3] text-white dark:text-gray-900' : 'hover:bg-gray-50 dark:hover:bg-gray-700 text-[#1A1A1A] dark:text-white'}`}
                >
                  <span>{l.name}</span>
                  {currentLang === l.code && <CheckCircle2 size={14} />}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
