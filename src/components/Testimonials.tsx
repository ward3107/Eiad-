import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Facebook, Twitter, ChevronLeft, ChevronRight, Pause, Play, Share2 } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { Skeleton } from './Shared';

export const Testimonials = ({ t }: { t: any }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const [showShare, setShowShare] = useState(false);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  const nextTestimonial = useCallback(() => {
    setDirection(1);
    setShowShare(false);
    setCurrentIndex((prev) => (prev + 1) % t.testimonials.items.length);
  }, [t.testimonials.items.length]);

  const prevTestimonial = useCallback(() => {
    setDirection(-1);
    setShowShare(false);
    setCurrentIndex((prev) => (prev - 1 + t.testimonials.items.length) % t.testimonials.items.length);
  }, [t.testimonials.items.length]);

  useEffect(() => {
    if (isAutoPlaying && !isLoading) {
      autoPlayRef.current = setInterval(nextTestimonial, 5000);
    }
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isAutoPlaying, isLoading, nextTestimonial]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 200 : -200,
      opacity: 0,
      scale: 0.9
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 200 : -200,
      opacity: 0,
      scale: 0.9
    })
  };

  const currentReview = t.testimonials.items[currentIndex];

  return (
    <section id="testimonials" className="py-24 bg-white dark:bg-gray-900 overflow-hidden transition-colors duration-500" dir={t.dir}>
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <ScrollReveal>
          <div className={`flex flex-col md:flex-row justify-between items-end mb-16 gap-6 ${t.dir === 'rtl' ? '' : 'md:flex-row-reverse'}`}>
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl"
            >
              <h3 className="text-[#1E4D92] dark:text-[#4B9CD3] uppercase tracking-widest font-bold text-sm mb-4">{t.testimonials.tag}</h3>
              <h2 className="text-4xl md:text-5xl font-light text-[#1A1A1A] dark:text-white font-serif">{t.testimonials.title} <span className="font-bold underline decoration-[#4B9CD3]/30">{t.testimonials.accent}</span></h2>
            </motion.div>
            <div className={`flex gap-3 ${t.dir === 'rtl' ? '' : 'flex-row-reverse'}`}>
               <div className="flex items-center gap-1 text-[#4B9CD3] bg-[#F5F2ED] dark:bg-gray-800 px-6 py-3 rounded-full font-bold shadow-sm transition-colors border border-transparent dark:border-white/5">
                 <Star size={20} fill="currentColor" />
                 <span className="text-xl text-[#1A1A1A] dark:text-white">{t.testimonials.rating}</span>
               </div>
               <p className="text-sm font-bold text-[#1A1A1A]/40 dark:text-white/40 self-center uppercase tracking-wider">{t.testimonials.basedOn}</p>
            </div>
          </div>
        </ScrollReveal>

        <div 
          className="relative max-w-4xl mx-auto h-[500px]"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {isLoading ? (
            <div className="p-10 rounded-[4rem] bg-[#F9F9F9] dark:bg-gray-800 border border-gray-100 dark:border-gray-700 flex flex-col justify-between h-full">
              <div>
                 <div className="flex gap-1 mb-8">
                   {Array(5).fill(0).map((_, j) => <Skeleton key={j} className="w-4 h-4 rounded-full" />)}
                 </div>
                 <Skeleton className="w-full h-32 mb-8" />
              </div>
              <div className="flex items-center gap-4">
                <Skeleton className="w-14 h-14 rounded-full" />
                <div className="space-y-2">
                   <Skeleton className="w-24 h-4" />
                   <Skeleton className="w-16 h-3" />
                </div>
              </div>
            </div>
          ) : (
            <div className="relative h-full">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.4 },
                    scale: { duration: 0.4 }
                  }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={1}
                  onDragEnd={(_, info) => {
                    const swipe = info.offset.x;
                    const velocity = info.velocity.x;
                    
                    if (swipe < -100 || velocity < -500) {
                      nextTestimonial();
                    } else if (swipe > 100 || velocity > 500) {
                      prevTestimonial();
                    }
                  }}
                  className="absolute inset-0 p-10 md:p-16 rounded-[4rem] bg-[#F9F9F9] dark:bg-gray-800/50 border border-gray-100 dark:border-white/5 flex flex-col justify-between shadow-xl hover:bg-white dark:hover:bg-gray-800 hover:border-[#1E4D92]/10 dark:hover:border-[#4B9CD3]/20 transition-all duration-500 group touch-pan-y cursor-grab active:cursor-grabbing"
                >
                  <div>
                    <div className="flex justify-between items-start mb-10">
                      <div className={`flex gap-1 text-[#4B9CD3] ${t.dir === 'rtl' ? '' : 'flex-row-reverse justify-end'}`}>
                        {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={22} fill="currentColor" />)}
                      </div>
                      <div className="relative">
                        <button 
                          onClick={() => setShowShare(!showShare)}
                          aria-label="Share testimonial"
                          aria-expanded={showShare}
                          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all shadow-md ${
                            showShare ? 'bg-[#1E4D92] dark:bg-[#4B9CD3] text-white dark:text-gray-900' : 'bg-white dark:bg-gray-700 text-[#1E4D92] dark:text-[#4B9CD3] hover:bg-gray-50 dark:hover:bg-gray-600'
                          }`}
                        >
                          <Share2 size={20} />
                        </button>
                        
                        <AnimatePresence>
                          {showShare && (
                            <motion.div
                              initial={{ opacity: 0, y: 10, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 10, scale: 0.95 }}
                              className="absolute top-full mt-3 right-0 bg-white dark:bg-gray-700 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-600 p-2 min-w-[160px] z-20 flex flex-col gap-1"
                            >
                              <a 
                                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(`"${currentReview.text}" - ${currentReview.name}`)}`} 
                                target="_blank" rel="noreferrer" 
                                onClick={() => setShowShare(false)}
                                className="flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors text-[#1877F2]"
                              >
                                <Facebook size={18} fill="currentColor" />
                                <span className="text-sm font-bold">Facebook</span>
                              </a>
                              <a 
                                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${currentReview.text}" - ${currentReview.name}`)}`} 
                                target="_blank" rel="noreferrer" 
                                onClick={() => setShowShare(false)}
                                className="flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors text-[#1DA1F2]"
                              >
                                <Twitter size={18} fill="currentColor" />
                                <span className="text-sm font-bold">Twitter</span>
                              </a>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                    <p className="text-2xl md:text-4xl text-[#1A1A1A] dark:text-white leading-relaxed italic mb-12 font-serif font-light">
                      "{currentReview.text}"
                    </p>
                  </div>
                  <div className={`flex items-center gap-6 ${t.dir === 'rtl' ? '' : 'flex-row-reverse'}`}>
                    <div className="w-16 h-16 bg-[#1E4D92] dark:bg-[#4B9CD3] rounded-full flex items-center justify-center text-white dark:text-gray-900 font-bold text-3xl font-serif shadow-lg">
                      {currentReview.name[0]}
                    </div>
                    <div className={t.dir === 'rtl' ? 'text-right' : 'text-left'}>
                      <p className="font-bold text-[#101010] dark:text-white text-xl">{currentReview.name}</p>
                      <p className="text-xs text-[#6B7280] dark:text-gray-400 font-bold uppercase tracking-[0.2em]">{currentReview.date}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation UI */}
              <div className={`absolute -bottom-12 sm:bottom-1/2 sm:-translate-y-1/2 w-full flex justify-between px-0 sm:-px-16 pointer-events-none ${t.dir === 'rtl' ? 'flex-row' : 'flex-row-reverse'}`}>
                <button 
                  onClick={prevTestimonial}
                  className="w-14 h-14 bg-white dark:bg-gray-800 shadow-2xl rounded-full flex items-center justify-center text-[#1A1A1A] dark:text-white hover:bg-[#1E4D92] dark:hover:bg-[#4B9CD3] hover:text-white dark:hover:text-gray-900 transition-all pointer-events-auto border border-gray-100 dark:border-white/10 group"
                  aria-label="Previous"
                >
                  {t.dir === 'rtl' ? <ChevronRight size={28} className="group-hover:scale-110 transition-transform" /> : <ChevronLeft size={28} className="group-hover:scale-110 transition-transform" />}
                </button>
                <button 
                  onClick={nextTestimonial}
                  className="w-14 h-14 bg-white dark:bg-gray-800 shadow-2xl rounded-full flex items-center justify-center text-[#1A1A1A] dark:text-white hover:bg-[#1E4D92] dark:hover:bg-[#4B9CD3] hover:text-white dark:hover:text-gray-900 transition-all pointer-events-auto border border-gray-100 dark:border-white/10 group"
                  aria-label="Next"
                >
                  {t.dir === 'rtl' ? <ChevronLeft size={28} className="group-hover:scale-110 transition-transform" /> : <ChevronRight size={28} className="group-hover:scale-110 transition-transform" />}
                </button>
              </div>

              {/* Indicators & Logic Controls */}
              <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-6">
                <div className="flex gap-2" role="tablist" aria-label="Testimonial indicators">
                  {t.testimonials.items.map((_: any, i: number) => (
                    <button
                      key={i}
                      role="tab"
                      aria-selected={i === currentIndex}
                      aria-label={`Go to testimonial ${i + 1}`}
                      onClick={() => {
                        setDirection(i > currentIndex ? 1 : -1);
                        setCurrentIndex(i);
                      }}
                      className={`h-2 rounded-full transition-all duration-500 ${i === currentIndex ? 'w-10 bg-[#1E4D92] dark:bg-[#4B9CD3]' : 'w-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300'}`}
                    />
                  ))}
                </div>
                <button 
                  onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                  aria-label={isAutoPlaying ? "Pause auto-play" : "Start auto-play"}
                  className="w-10 h-10 rounded-full bg-gray-50 dark:bg-gray-700 text-[#1E4D92] dark:text-[#4B9CD3] flex items-center justify-center hover:bg-white dark:hover:bg-gray-600 border border-gray-100 dark:border-gray-600 shadow-sm transition-colors"
                >
                  {isAutoPlaying ? <Pause size={16} /> : <Play size={16} />}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

