import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export const Gallery = ({ t }: { t: any }) => {
  const [filter, setFilter] = useState<'all' | 'clinic' | 'staff'>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  
  const images = [
    { 
      url: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800", 
      category: 'clinic', 
      title: t.dir === 'rtl' ? 'פינת קבלה נעימה ומזמינה' : 'Friendly Reception Area'
    },
    { 
      url: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800", 
      category: 'clinic', 
      title: t.dir === 'rtl' ? 'חדר טיפולים מרווח ומאובזר' : 'Spacious Treatment Room'
    },
    { 
      url: "https://images.unsplash.com/photo-1576091160550-217359f4ecf8?auto=format&fit=crop&q=80&w=800", 
      category: 'clinic', 
      title: t.dir === 'rtl' ? 'ציוד פיזיותרפיה מודרני ומתקדם' : 'Modern Physiotherapy Equipment'
    },
    { 
      url: "https://images.unsplash.com/photo-159023346142e-cf6151ec851a?auto=format&fit=crop&q=80&w=800", 
      category: 'clinic', 
      title: t.dir === 'rtl' ? 'סוויטת טיפול ידני מקצועית' : 'Professional Manual Therapy Suite'
    },
    { 
      url: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=800", 
      category: 'staff', 
      title: t.dir === 'rtl' ? 'ייעוץ מומחה ובניית תכנית שיקום' : 'Expert Rehabilitation Consultation'
    },
    { 
      url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800", 
      category: 'clinic', 
      title: t.dir === 'rtl' ? 'אזור שיקום ופעילות גופנית' : 'Rehab and Exercise Area'
    }
  ];

  const filteredImages = filter === 'all' ? images : images.filter(img => img.category === filter);

  const nextImage = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % filteredImages.length);
  }, [filteredImages.length]);

  const prevImage = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
  }, [filteredImages.length]);

  // Reset index when filter changes
  const handleFilterChange = (newFilter: 'all' | 'clinic' | 'staff') => {
    setFilter(newFilter);
    setCurrentIndex(0);
    setDirection(0);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    })
  };

  return (
    <section id="gallery" className="py-24 bg-[#FDFCFB] dark:bg-gray-900 overflow-hidden transition-colors duration-500" dir={t.dir}>
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <ScrollReveal>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
            className="text-center mb-16"
          >
            <h3 className="text-[#1E4D92] dark:text-[#4B9CD3] uppercase tracking-[0.3em] font-black text-xs mb-4">{t.gallery.tag}</h3>
            <h2 className="text-4xl md:text-6xl font-light text-[#1A1A1A] dark:text-white font-serif mb-8">
              {t.gallery.title} <span className="font-bold text-[#1E4D92] dark:text-[#4B9CD3] italic underline decoration-[#4B9CD3]/30">{t.gallery.accent}</span>
            </h2>
            
            <div className={`flex flex-wrap justify-center gap-4 ${t.dir === 'rtl' ? 'flex-row-reverse' : ''}`} role="group" aria-label="Gallery filters">
              <button 
                onClick={() => handleFilterChange('all')}
                aria-pressed={filter === 'all'}
                className={`px-8 py-3 rounded-full font-bold transition-all focus:outline-none focus:ring-2 focus:ring-[#1E4D92]/20 ${filter === 'all' ? 'bg-[#1A1A1A] dark:bg-white text-white dark:text-gray-900 shadow-xl' : 'bg-white dark:bg-gray-800 text-[#1A1A1A] dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 shadow-sm border border-transparent dark:border-white/5'}`}
              >
                {t.gallery.all}
              </button>
              <button 
                onClick={() => handleFilterChange('clinic')}
                aria-pressed={filter === 'clinic'}
                className={`px-8 py-3 rounded-full font-bold transition-all focus:outline-none focus:ring-2 focus:ring-[#1E4D92]/20 ${filter === 'clinic' ? 'bg-[#1A1A1A] dark:bg-white text-white dark:text-gray-900 shadow-xl' : 'bg-white dark:bg-gray-800 text-[#1A1A1A] dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 shadow-sm border border-transparent dark:border-white/5'}`}
              >
                {t.gallery.clinic}
              </button>
              <button 
                onClick={() => handleFilterChange('staff')}
                aria-pressed={filter === 'staff'}
                className={`px-8 py-3 rounded-full font-bold transition-all focus:outline-none focus:ring-2 focus:ring-[#1E4D92]/20 ${filter === 'staff' ? 'bg-[#1A1A1A] dark:bg-white text-white dark:text-gray-900 shadow-xl' : 'bg-white dark:bg-gray-800 text-[#1A1A1A] dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 shadow-sm border border-transparent dark:border-white/5'}`}
              >
                {t.gallery.staff}
              </button>
            </div>
          </motion.div>
        </ScrollReveal>

        <div className="relative max-w-4xl mx-auto h-[400px] md:h-[600px] group">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={filteredImages[currentIndex].url}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(_, info) => {
                const swipe = info.offset.x;
                const velocity = info.velocity.x;
                if (swipe < -100 || velocity < -500) {
                  nextImage();
                } else if (swipe > 100 || velocity > 500) {
                  prevImage();
                }
              }}
              className="absolute inset-0 rounded-[3rem] overflow-hidden shadow-2xl cursor-grab active:cursor-grabbing touch-pan-y"
            >
              <img 
                src={filteredImages[currentIndex].url} 
                alt={filteredImages[currentIndex].title}
                className="w-full h-full object-cover pointer-events-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/80 via-transparent to-transparent flex flex-col justify-end p-10 md:p-16">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <span className="text-[#4B9CD3] text-xs font-bold uppercase tracking-widest mb-3 block">
                    {filteredImages[currentIndex].category === 'clinic' ? t.gallery.clinic : t.gallery.staff}
                  </span>
                  <h4 className="text-white text-3xl md:text-5xl font-serif">{filteredImages[currentIndex].title}</h4>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-6 z-10 pointer-events-none">
            <button 
              onClick={prevImage}
              className="w-12 h-12 md:w-16 md:h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 hover:bg-white hover:text-[#1A1A1A] transition-all pointer-events-auto group shadow-2xl"
              aria-label="Previous image"
            >
              <ChevronLeft size={32} className="group-hover:-translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={nextImage}
              className="w-12 h-12 md:w-16 md:h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 hover:bg-white hover:text-[#1A1A1A] transition-all pointer-events-auto group shadow-2xl"
              aria-label="Next image"
            >
              <ChevronRight size={32} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Counter/Indicators */}
          <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-4">
            <div className="flex gap-2">
              {filteredImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setDirection(idx > currentIndex ? 1 : -1);
                    setCurrentIndex(idx);
                  }}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    idx === currentIndex ? 'w-8 bg-[#1E4D92]' : 'w-2 bg-gray-200 hover:bg-gray-300'
                  }`}
                  aria-label={`Go to image ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
