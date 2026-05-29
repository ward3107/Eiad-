import React from 'react';
import { motion } from 'motion/react';
import { ScrollReveal } from './ScrollReveal';
import { Award } from 'lucide-react';

export const Portfolio = ({ t, lang }: { t: any; lang: string }) => {
  const isRtl = t.dir === 'rtl';

  return (
    <section id="portfolio" className="py-24 bg-[#F8F9FA] dark:bg-gray-800/50" dir={t.dir}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <motion.div 
            initial={{ opacity: 0, x: t.dir === 'rtl' ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h3 className="text-[#1E4D92] dark:text-[#4B9CD3] uppercase tracking-widest font-bold text-sm mb-4">{t.portfolio.tag}</h3>
            <h2 className="text-4xl md:text-5xl font-light text-[#1A1A1A] dark:text-white font-serif">{t.portfolio.title} <span className="font-bold underline decoration-[#4B9CD3]/30">{t.portfolio.accent}</span></h2>
          </motion.div>
        </ScrollReveal>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {t.portfolio.cases.map((caseItem: any, index: number) => (
            <ScrollReveal key={caseItem.id} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg border border-[#1A1A1A]/10 dark:border-white/10 group h-full flex flex-col"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={caseItem.image}
                    alt={caseItem.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className={`absolute bottom-4 ${isRtl ? 'right-4' : 'left-4'}`}>
                    <span className="bg-[#1E4D92] text-white text-xs px-3 py-1 rounded-full font-medium">
                      {caseItem.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-[#1A1A1A] dark:text-white mb-3 group-hover:text-[#1E4D92] dark:group-hover:text-[#4B9CD3] transition-colors">
                    {caseItem.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 flex-grow leading-relaxed">
                    {caseItem.description}
                  </p>

                  <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                    <div className="flex items-center gap-2 text-[#2E7D32] dark:text-[#4CAF50] font-medium">
                      <Award size={20} />
                      <span className="text-sm font-semibold">{caseItem.result}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
