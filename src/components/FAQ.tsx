import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronUp, Info, Search, Clock, FileText, Zap, Activity } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

const FAQIcon = ({ type, className }: { type: string; className?: string }) => {
  switch (type) {
    case 'Clock': return <Clock className={className} />;
    case 'FileText': return <FileText className={className} />;
    case 'Zap': return <Zap className={className} />;
    case 'Activity': return <Activity className={className} />;
    default: return null;
  }
};

export const FAQ = ({ t }: { t: any }) => {
  const [activeQuestion, setActiveQuestion] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = useMemo(() => {
    return t.faq.items.filter((item: any) => 
      item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.a.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [t.faq.items, searchQuery]);

  return (
    <section id="faq" className="py-24 bg-[#F9F9F9] dark:bg-gray-800 transition-colors duration-500 overflow-hidden" dir={t.dir}>
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <ScrollReveal>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
            className="text-center mb-12"
          >
            <h3 className="text-[#1E4D92] dark:text-[#4B9CD3] uppercase tracking-widest font-bold text-sm mb-4">{t.faq.tag}</h3>
            <h2 className="text-4xl md:text-5xl font-light text-[#1A1A1A] dark:text-white font-serif">
              {t.faq.title} <span className="font-bold italic">{t.faq.accent}</span>
            </h2>
          </motion.div>
        </ScrollReveal>

        {/* Search Bar */}
        <ScrollReveal delay={0.1}>
          <div className="relative max-w-2xl mx-auto mb-12 group">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.faq.searchPlaceholder}
              aria-label={t.faq.searchPlaceholder}
              className={`w-full bg-white dark:bg-gray-700 border border-gray-100 dark:border-gray-600 rounded-2xl py-4 transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1E4D92]/20 dark:focus:ring-[#4B9CD3]/20 focus:border-[#1E4D92] dark:focus:border-[#4B9CD3] text-lg text-[#1A1A1A] dark:text-white ${
                t.dir === 'rtl' ? 'pl-6 pr-14 text-right' : 'pl-14 pr-6 text-left'
              }`}
            />
            <div className={`absolute inset-y-0 flex items-center pointer-events-none transition-colors group-focus-within:text-[#1E4D92] dark:group-focus-within:text-[#4B9CD3] ${
              t.dir === 'rtl' ? 'right-0 pr-6' : 'left-0 pl-6'
            }`}>
              <Search className="h-5 w-5 text-gray-400 dark:text-gray-500 group-focus-within:text-[#1E4D92] dark:group-focus-within:text-[#4B9CD3]" />
            </div>
          </div>
        </ScrollReveal>

        <div className="space-y-4">
          <AnimatePresence mode="popLayout" initial={false}>
            {filteredItems.length > 0 ? (
              filteredItems.map((item: any, i: number) => (
                <motion.div
                  key={item.q}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2, delay: i * 0.05 }}
                >
                  <div className="bg-white dark:bg-gray-700/50 rounded-[2rem] overflow-hidden border border-gray-100 dark:border-white/5 shadow-sm transition-all hover:shadow-md">
                    <button
                      onClick={() => setActiveQuestion(activeQuestion === item.q ? null : item.q)}
                      aria-expanded={activeQuestion === item.q}
                      aria-controls={`faq-answer-${i}`}
                      id={`faq-question-${i}`}
                      className={`w-full flex items-center justify-between p-6 md:p-8 transition-colors ${
                        t.dir === 'rtl' ? 'text-right' : 'text-left'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                          activeQuestion === item.q ? 'bg-[#1E4D92] dark:bg-[#4B9CD3] text-white dark:text-gray-900' : 'bg-gray-50 dark:bg-gray-700 text-[#1E4D92] dark:text-[#4B9CD3]'
                        }`}>
                          <FAQIcon type={item.icon} className="w-5 h-5" />
                        </div>
                        <span className={`text-lg md:text-xl font-bold transition-colors ${activeQuestion === item.q ? 'text-[#1E4D92] dark:text-[#4B9CD3]' : 'text-[#1A1A1A] dark:text-white'}`}>
                          {item.q}
                        </span>
                      </div>
                      <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center border transition-all ${activeQuestion === item.q ? 'bg-[#1E4D92] dark:bg-[#4B9CD3] border-[#1E4D92] dark:border-[#4B9CD3] text-white dark:text-gray-900 rotate-180' : 'bg-transparent border-gray-200 dark:border-gray-600 text-[#1A1A1A] dark:text-white'}`}>
                        <ChevronUp size={20} />
                      </div>
                    </button>
                    <AnimatePresence>
                      {activeQuestion === item.q && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          id={`faq-answer-${i}`}
                          role="region"
                          aria-labelledby={`faq-question-${i}`}
                        >
                          <div className="px-6 pb-8 md:px-8 md:pb-10 pt-0">
                            <div className="h-px bg-gray-100 dark:bg-gray-600 mb-6" />
                            <p className="text-lg text-[#4A4A4A] dark:text-gray-300 leading-relaxed">
                              {item.a}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20 bg-white dark:bg-gray-700 rounded-[2rem] border border-dashed border-gray-200 dark:border-gray-600"
              >
                <Search className="h-12 w-12 text-gray-200 dark:text-gray-600 mx-auto mb-4" />
                <p className="text-xl text-gray-400 dark:text-gray-500 font-medium italic">{t.faq.noResults}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 p-8 rounded-[2.5rem] bg-white dark:bg-gray-700/30 border border-gray-100 dark:border-white/5 flex flex-col md:flex-row items-center gap-6 max-w-3xl mx-auto shadow-sm transition-colors"
        >
          <div className="w-14 h-14 rounded-2xl bg-gray-50 dark:bg-gray-700 flex items-center justify-center text-[#4B9CD3] shadow-sm shrink-0">
            <Info size={28} />
          </div>
          <p className="text-base text-gray-500 dark:text-gray-400 font-medium leading-relaxed italic">
            {t.faq.disclaimer}
          </p>
        </motion.div>
      </div>
    </section>
  );
};
