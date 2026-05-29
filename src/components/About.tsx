import React from 'react';
import { motion } from 'motion/react';
import { Activity, CheckCircle2, ShieldCheck } from 'lucide-react';

export const About = ({ t }: { t: any }) => {
  return (
    <section id="about" className="py-24 bg-[#F5F2ED] dark:bg-gray-800 overflow-hidden transition-colors duration-500" dir={t.dir}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid lg:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <motion.div 
            initial={{ opacity: 0, x: t.dir === 'rtl' ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="pt-12">
              <img
                src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=500"
                alt={t.dir === 'rtl' ? 'פנים הקליניקה - סביבת טיפול נעימה' : 'Clinic interior - welcoming treatment environment'}
                loading="lazy"
                decoding="async"
                className="rounded-3xl h-64 w-full object-cover mb-4 shadow-xl"
              />
              <img
                src="https://images.unsplash.com/photo-1598387181032-a75ff3a5ffbc?auto=format&fit=crop&q=80&w=500"
                alt={t.dir === 'rtl' ? 'ציוד טיפולי מתקדם' : 'Advanced therapeutic equipment'}
                loading="lazy"
                decoding="async"
                className="rounded-3xl h-48 w-full object-cover shadow-xl"
              />
            </div>
            <div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-[#1E4D92] dark:bg-[#4B9CD3] p-6 rounded-3xl text-white dark:text-gray-900 shadow-2xl relative overflow-hidden group"
              >
                <p className="text-5xl font-bold font-serif mb-1">+10</p>
                <p className="text-xs uppercase tracking-widest opacity-80 font-bold">{t.about.exp}</p>
                <Activity className="absolute -bottom-4 -right-4 opacity-10 group-hover:scale-150 transition-transform duration-500" size={100} />
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.div
           initial={{ opacity: 0, x: t.dir === 'rtl' ? 50 : -50 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
        >
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-[#1E4D92] dark:text-[#4B9CD3] uppercase tracking-widest font-bold text-sm mb-4">{t.about.tag}</h3>
            <h2 className="text-4xl md:text-5xl font-light text-[#1A1A1A] dark:text-white font-serif mb-8">{t.about.title} <span className="font-bold underline decoration-[#4B9CD3]/30">{t.about.accent}</span></h2>
          </motion.div>
          <div className="space-y-6 text-[#4A4A4A] dark:text-gray-300 text-lg leading-relaxed font-medium">
            <p>{t.about.p1}</p>
            <p>{t.about.p2}</p>
          </div>
          
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-8">
            <motion.div whileHover={{ x: t.dir === 'rtl' ? -5 : 5 }} className="flex items-start gap-4 p-4 rounded-2xl bg-white/40 dark:bg-white/5 border border-white/60 dark:border-white/10 transition-colors">
              <CheckCircle2 className="text-[#1E4D92] dark:text-[#4B9CD3] shrink-0" size={28} />
              <div>
                <p className="font-bold text-[#1A1A1A] dark:text-white text-xl mb-1">{t.about.feature1}</p>
                <p className="text-sm text-[#6B7280] dark:text-gray-400 font-medium leading-relaxed">{t.about.feature1Desc}</p>
              </div>
            </motion.div>
            <motion.div whileHover={{ x: t.dir === 'rtl' ? -5 : 5 }} className="flex items-start gap-4 p-4 rounded-2xl bg-white/40 dark:bg-white/5 border border-white/60 dark:border-white/10 transition-colors">
              <CheckCircle2 className="text-[#1E4D92] dark:text-[#4B9CD3] shrink-0" size={28} />
              <div>
                <p className="font-bold text-[#1A1A1A] dark:text-white text-xl mb-1">{t.about.feature2}</p>
                <p className="text-sm text-[#6B7280] dark:text-gray-400 font-medium leading-relaxed">{t.about.feature2Desc}</p>
              </div>
            </motion.div>
          </div>

          <div className="mt-12 pt-12 border-t border-[#1A1A1A]/5 dark:border-white/5">
            <h4 className="text-xl font-bold text-[#1A1A1A] dark:text-white mb-8 font-serif flex items-center gap-3">
              <ShieldCheck className="text-[#4B9CD3]" size={24} />
              {t.about.certificationsTitle}
            </h4>
            <div className="grid grid-cols-1 gap-4">
              {t.about.certifications.map((cert: string, index: number) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center gap-3 text-[#4A4A4A] dark:text-gray-300 group hover:text-[#1E4D92] dark:hover:text-[#4B9CD3] transition-colors ${t.dir === 'rtl' ? 'text-right' : 'text-left'}`}
                >
                  <div className="w-2 h-2 rounded-full bg-[#4B9CD3]/50 group-hover:scale-150 transition-transform" />
                  <span className="text-base font-medium">{cert}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
