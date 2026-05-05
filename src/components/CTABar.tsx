import React from 'react';
import { motion } from 'motion/react';
import { MessageCircle, ArrowLeft, ArrowRight } from 'lucide-react';

export const CTABar = ({ t }: { t: any }) => {
  return (
    <section className="bg-[#1E4D92] py-20 relative overflow-hidden" dir={t.dir}>
      <motion.div 
        animate={{ 
          x: [0, 100, 0],
          y: [0, 50, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute -top-24 -left-24 w-96 h-96 bg-white/5 rounded-full blur-[100px] pointer-events-none"
      />
      
      <div className={`max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-12 text-center relative z-10 ${t.dir === 'rtl' ? 'md:text-right' : 'md:text-left md:flex-row-reverse'}`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl text-white font-serif mb-4 font-light leading-tight">{t.ctaBar.title}</h2>
          <p className="text-white/70 text-xl font-medium max-w-xl">{t.ctaBar.desc}</p>
        </motion.div>
        <motion.a
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.95 }}
          href={t.contact.whatsapp || 'https://wa.me/972502834280'}
          target="_blank"
          rel="noopener noreferrer"
          className="group bg-white text-[#1E4D92] px-12 py-6 rounded-full font-bold text-xl flex items-center gap-4 hover:shadow-[0_20px_50px_rgba(255,255,255,0.2)] transition-all"
        >
          <MessageCircle className="text-[#25D366]" fill="#25D366" size={28} />
          <span className="text-[#101010]">{t.ctaBar.whatsapp}</span>
           {t.dir === 'rtl' ? <ArrowLeft className="group-hover:-translate-x-2 transition-transform" /> : <ArrowRight className="group-hover:translate-x-2 transition-transform" />}
        </motion.a>
      </div>
    </section>
  );
};
