import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, ChevronRight, Star } from 'lucide-react';

export const Hero = ({ t }: { t: any }) => {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const elem = document.getElementById(targetId);
    if (elem) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elemRect = elem.getBoundingClientRect().top;
      const elemPosition = elemRect - bodyRect;
      const offsetPosition = elemPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden bg-[#F5F2ED] dark:bg-gray-800 transition-colors duration-500">
      <motion.div 
        initial={{ rotate: -15, x: '50%' }}
        animate={{ rotate: -12, x: '25%' }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
        className="absolute top-0 right-0 w-[120%] h-full bg-[#E8E5DF] dark:bg-gray-900/40 -skew-x-12 z-0 hidden lg:block" 
      />
      
      <div className={`max-w-7xl mx-auto px-4 md:px-8 grid lg:grid-cols-2 gap-12 items-center relative z-10 ${t.dir === 'rtl' ? '' : 'lg:grid-flow-dense'}`} dir={t.dir}>
        <motion.div
          initial={{ opacity: 0, x: t.dir === 'rtl' ? 50 : -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={t.dir === 'rtl' ? '' : 'lg:col-start-2'}
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm rounded-full text-[#1E4D92] dark:text-[#4B9CD3] font-semibold text-sm mb-6 border border-[#1E4D92]/10 dark:border-white/10"
          >
            <CheckCircle2 size={16} />
            <span>{t.hero.badge}</span>
          </motion.div>
          <h2 className="text-5xl md:text-7xl font-light text-[#1A1A1A] dark:text-white leading-[1.1] mb-6 font-serif">
            <motion.span
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.05, delayChildren: 0.4 }
                }
              }}
              initial="hidden"
              animate="visible"
            >
              {t.hero.title1.split('').map((char: string, index: number) => (
                <motion.span
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0 }
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.span>
            <br />
            <motion.span 
              className="font-bold text-[#1E4D92] dark:text-[#4B9CD3]"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.05, delayChildren: 1.0 }
                }
              }}
              initial="hidden"
              animate="visible"
            >
              {t.hero.title2.split('').map((char: string, index: number) => (
                <motion.span
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0 }
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.span>
          </h2>
          <p className="text-lg md:text-xl text-[#4A4A4A] dark:text-gray-300 leading-relaxed mb-10 max-w-lg">
            {t.hero.desc}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="#contact" 
              onClick={(e) => scrollToSection(e, '#contact')}
              className="bg-[#1E4D92] dark:bg-[#4B9CD3] text-white dark:text-gray-900 px-10 py-5 rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-[#1E4D92]/30 dark:hover:shadow-[#4B9CD3]/30 transition-all flex items-center justify-center gap-2 group"
            >
              {t.hero.cta1}
              {t.dir === 'rtl' ? <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" /> : <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform rotate-180" />}
            </a>
            <a 
              href="#services" 
              onClick={(e) => scrollToSection(e, '#services')}
              className="bg-white dark:bg-gray-700 text-[#1A1A1A] dark:text-white border-2 border-[#1A1A1A]/10 dark:border-white/10 px-10 py-5 rounded-full font-bold text-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-all flex items-center justify-center gap-2"
            >
              {t.hero.cta2}
            </a>
          </div>

          <div className="mt-12 flex items-center gap-6">
            <div className={`flex ${t.dir === 'rtl' ? '-space-x-4 space-x-reverse' : '-space-x-4'}`}>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-12 h-12 rounded-full border-4 border-white dark:border-gray-800 bg-gray-200 dark:bg-gray-700 overflow-hidden shadow-sm">
                  <img src={`https://i.pravatar.cc/150?u=${i + 10}`} alt={t.dir === 'rtl' ? 'מטופל מרוצה' : 'Satisfied patient'} />
                </div>
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1 text-[#4B9CD3]">
                {[1, 2, 3, 4, 5].map((i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <p className="text-sm font-semibold text-[#1A1A1A] dark:text-white">{t.hero.satisfied}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 1, ease: "easeOut" }}
           className={`relative ${t.dir === 'rtl' ? '' : 'lg:col-start-1'}`}
        >
          <div className="relative rounded-[2rem] overflow-hidden shadow-2xl z-10 aspect-[4/5] md:aspect-square">
            <img 
              src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=1000" 
              alt={t.name} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className={`absolute bottom-8 text-white ${t.dir === 'rtl' ? 'right-8' : 'left-8'}`}>
              <p className="text-4xl font-bold font-serif mb-1">{t.name}</p>
              <p className="text-sm uppercase tracking-widest opacity-80 uppercase leading-none">{t.title}</p>
            </div>
          </div>
          <div className="absolute -top-12 -left-12 w-48 h-48 bg-[#4B9CD3] opacity-20 rounded-full blur-[100px] z-0 animate-pulse" />
          <div className="absolute -bottom-12 -right-12 w-80 h-80 bg-[#1E4D92] opacity-20 rounded-full blur-[100px] z-0 animate-pulse" />
        </motion.div>
      </div>
    </section>
  );
};
