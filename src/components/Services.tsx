import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  Clock, 
  ChevronRight, 
  X, 
  Stethoscope, 
  Activity, 
  MoveHorizontal, 
  ShieldCheck 
} from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { Skeleton } from './Shared';

const ServiceModal = ({ isOpen, onClose, service, icon, image, lang, t }: { isOpen: boolean, onClose: () => void, service: any, icon: React.ReactNode, image: string, lang: string, t: any }) => {
  if (!service) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md" 
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            className="relative w-full max-w-4xl bg-white dark:bg-gray-800 rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
            dir={t.dir}
            role="dialog"
            aria-modal="true"
            aria-labelledby="service-modal-title"
          >
            <div className="w-full md:w-2/5 relative h-64 md:h-auto overflow-hidden shrink-0">
              <img src={image} alt={service.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/80 via-transparent to-transparent" />
              <div className={`absolute bottom-8 ${t.dir === 'rtl' ? 'right-8' : 'left-8'} flex items-center gap-4`}>
                <div className="w-16 h-16 bg-white/95 dark:bg-gray-700/95 backdrop-blur rounded-2xl flex items-center justify-center text-[#1E4D92] dark:text-[#4B9CD3] shadow-2xl">
                  {icon}
                </div>
                <div className="text-white">
                   <p className="text-sm font-bold uppercase tracking-widest opacity-70 leading-none mb-2">{t.services.tag}</p>
                   <h3 id="service-modal-title" className="text-2xl font-bold font-serif">{service.title}</h3>
                </div>
              </div>
            </div>

            <div className="w-full md:w-3/5 p-8 md:p-12 overflow-y-auto flex flex-col">
              <div className="flex justify-between items-start mb-8 shrink-0">
                <div className="flex-1">
                   <h4 className="text-[#1E4D92] dark:text-[#4B9CD3] font-bold uppercase tracking-[0.2em] text-xs mb-4">{service.title}</h4>
                   <p className="text-3xl font-serif font-bold text-[#1A1A1A] dark:text-white leading-tight">{service.title}</p>
                </div>
                <button 
                  onClick={onClose} 
                  className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors text-gray-900 dark:text-white shrink-0"
                  aria-label="Close details"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 space-y-10">
                <div className="text-lg text-[#4A4A4A] dark:text-gray-300 leading-relaxed">
                  {service.fullText}
                </div>

                <div className="grid sm:grid-cols-2 gap-8">
                  <div>
                    <h5 className="font-bold text-[#1A1A1A] dark:text-white mb-4 flex items-center gap-2">
                       <CheckCircle2 size={18} className="text-[#4B9CD3]" />
                       {t.services.benefitTitle}
                    </h5>
                    <ul className="space-y-3">
                      {service.benefits?.map((benefit: string, i: number) => (
                        <li key={i} className="flex items-center gap-3 text-[#6B7280] dark:text-gray-400 font-medium text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#1E4D92] dark:bg-[#4B9CD3]" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-bold text-[#1A1A1A] dark:text-white mb-4 flex items-center gap-2">
                       <Clock size={18} className="text-[#4B9CD3]" />
                       {t.services.expectTitle}
                    </h5>
                    <p className="text-sm text-[#6B7280] dark:text-gray-400 font-medium leading-relaxed">
                       {service.expect}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row gap-4 shrink-0">
                <a 
                  href="#contact" 
                  onClick={onClose}
                  className="flex-1 bg-[#1E4D92] dark:bg-[#4B9CD3] text-white dark:text-gray-900 py-5 rounded-full font-bold text-center hover:shadow-xl hover:bg-[#143264] transition-all"
                >
                  {t.nav.booking}
                </a>
                <button 
                  onClick={onClose}
                  className="flex-1 bg-[#F9F9F9] dark:bg-gray-700 text-[#1A1A1A] dark:text-white py-5 rounded-full font-bold border border-gray-100 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                >
                  {t.dir === 'rtl' ? 'סגור' : 'Close'}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export const Services = ({ t, lang }: { t: any, lang: string }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedService, setSelectedService] = useState<{ index: number, data: any } | null>(null);
  
  const cardVariants = {
    initial: { opacity: 0, y: 30, scale: 0.95 },
    view: (i: number) => ({ 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        delay: i * 0.1,
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] 
      } 
    }),
    hover: { y: -12, scale: 1.02 }
  };

  const iconVariants = [
    { hover: { scale: 1.15, rotate: 8, transition: { type: 'spring', stiffness: 300 } } },
    { hover: { scale: [1, 1.2, 1], transition: { repeat: Infinity, duration: 1.2 } } },
    { hover: { x: [-5, 5, -5, 5, 0], transition: { duration: 0.5 } } },
    { hover: { scale: 1.2, rotate: -15, transition: { type: 'spring', stiffness: 400 } } }
  ];

  const icons = [
    <Stethoscope size={32} />, 
    <Activity size={32} />, 
    <MoveHorizontal size={32} />, 
    <ShieldCheck size={32} />
  ];
  const images = [
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=500",
    "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=500",
    "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=500",
    "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=500"
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="services" className="py-24 bg-white dark:bg-gray-900 overflow-hidden transition-colors duration-500" dir={t.dir}>
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <ScrollReveal>
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h3 className="text-[#1E4D92] dark:text-[#4B9CD3] uppercase tracking-widest font-bold text-sm mb-4">{t.services.tag}</h3>
            <h2 className="text-4xl md:text-5xl font-light text-[#1A1A1A] dark:text-white font-serif">{t.services.title} <span className="font-bold underline decoration-[#4B9CD3]/30">{t.services.accent}</span></h2>
          </motion.div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {isLoading ? (
            Array(4).fill(0).map((_, i) => (
              <div key={i} className="bg-[#F9F9F9] dark:bg-gray-800 rounded-[2.5rem] overflow-hidden border border-transparent p-10 h-[450px]">
                 <Skeleton className="w-full h-40 mb-8" />
                 <Skeleton className="w-3/4 h-8 mb-4" />
                 <Skeleton className="w-full h-16 mb-8" />
                 <Skeleton className="w-1/2 h-4" />
              </div>
            ))
          ) : (
            t.services.items.map((service: any, index: number) => (
              <motion.button
                key={index}
                custom={index}
                initial="initial"
                whileInView="view"
                viewport={{ once: true }}
                whileHover="hover"
                variants={cardVariants}
                onClick={() => setSelectedService({ index, data: service })}
                aria-label={`${t.services.more} ${service.title}`}
                className="bg-[#F9F9F9] dark:bg-gray-800 rounded-[2.5rem] overflow-hidden group border border-transparent hover:border-[#1E4D92]/10 dark:hover:border-white/10 hover:shadow-2xl hover:shadow-[#1E4D92]/10 transition-all duration-500 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#1E4D92]/20 text-right"
              >
                <div className="h-56 overflow-hidden relative">
                  <img src={images[index]} alt={service.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className={`absolute top-4 ${t.dir === 'rtl' ? 'left-4' : 'right-4'} w-14 h-14 bg-white/95 dark:bg-gray-700/95 backdrop-blur rounded-2xl flex items-center justify-center text-[#1E4D92] dark:text-[#4B9CD3] shadow-xl transition-all duration-500`}>
                    <motion.div variants={iconVariants[index]} whileHover="hover">
                      {icons[index]}
                    </motion.div>
                  </div>
                </div>
                <div className="p-10">
                  <h4 className={`text-2xl font-bold text-[#1A1A1A] dark:text-white mb-4 group-hover:text-[#1E4D92] dark:group-hover:text-[#4B9CD3] transition-colors ${t.dir === 'rtl' ? 'text-right' : 'text-left'}`}>{service.title}</h4>
                  <p className={`text-[#6B7280] dark:text-gray-400 leading-relaxed mb-8 font-medium line-clamp-3 ${t.dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                    {service.description}
                  </p>
                  <div className={`flex items-center gap-2 text-[#1E4D92] dark:text-[#4B9CD3] font-bold transition-transform ${t.dir === 'rtl' ? 'flex-row' : 'flex-row-reverse justify-end'}`}>
                    <span className="group-hover:underline underline-offset-4">{t.services.more}</span>
                    {t.dir === 'rtl' ? <ChevronRight size={18} className="rotate-180 group-hover:-translate-x-1 transition-transform" /> : <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />}
                  </div>
                </div>
              </motion.button>
            ))
          )}
        </div>
      </div>
      
      <ServiceModal 
        isOpen={selectedService !== null}
        onClose={() => setSelectedService(null)}
        service={selectedService?.data}
        image={selectedService ? images[selectedService.index] : ''}
        icon={selectedService ? icons[selectedService.index] : null}
        lang={lang}
        t={t}
      />
    </section>
  );
};
