import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronUp } from 'lucide-react';

export const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 500) setIsVisible(true);
      else setIsVisible(false);
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          onClick={scrollToTop}
          className="fixed bottom-8 left-8 z-[60] w-14 h-14 bg-[#1E4D92] dark:bg-[#4B9CD3] text-white dark:text-gray-900 rounded-full flex items-center justify-center shadow-2xl hover:bg-[#1A1A1A] dark:hover:bg-white transition-colors group"
        >
          <ChevronUp className="group-hover:-translate-y-1 transition-transform" />
          <div className="absolute -top-1 px-2 py-0.5 bg-[#4B9CD3] dark:bg-[#1E4D92] text-[10px] text-white font-bold rounded-full opacity-0 group-hover:opacity-100 transition-opacity">TOP</div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};
