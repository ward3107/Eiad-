import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Clock, Facebook, Instagram, MessageCircle, Activity, CheckCircle2, AlertCircle } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { useRateLimit } from '../hooks/useRateLimit';

export const Contact = ({ t }: { t: any }) => {
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
  const [errors, setErrors] = useState({ name: '', phone: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Rate limiting for form submissions
  const {
    canSubmit,
    remainingAttempts,
    isBlocked,
    resetTime,
    recordAttempt,
    reset: resetRateLimit
  } = useRateLimit({
    maxAttempts: 3,
    windowMs: 60000,        // 1 minute
    cooldownMs: 300000,     // 5 minutes
    storageKey: 'contact-form-rate-limit'
  });

  const validate = () => {
    let isValid = true;
    const newErrors = { name: '', phone: '', message: '' };

    if (!formData.name.trim()) {
      newErrors.name = t.dir === 'rtl' ? 'נא להזין שם מלא' : 'Please enter your full name';
      isValid = false;
    }

    const phoneRegex = /^[0-9-+]{9,15}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = t.dir === 'rtl' ? 'נא להזין מספר טלפון' : 'Please enter your phone number';
      isValid = false;
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = t.dir === 'rtl' ? 'מספר טלפון לא תקין' : 'Invalid phone number';
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = t.dir === 'rtl' ? 'נא להזין הודעה' : 'Please enter a message';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check rate limit
    if (!canSubmit) {
      return;
    }

    if (validate()) {
      recordAttempt(); // Record this submission attempt

      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
        setFormData({ name: '', phone: '', message: '' });
        setTimeout(() => setIsSuccess(false), 5000);
      }, 1500);
    }
  };

  return (
    <section id="contact" className="py-24 bg-white dark:bg-gray-900 transition-colors duration-500" dir={t.dir}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid lg:grid-cols-2 gap-16">
        <ScrollReveal>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-[#1E4D92] dark:text-[#4B9CD3] uppercase tracking-widest font-bold text-sm mb-4">{t.contact.tag}</h3>
            <h2 className="text-4xl md:text-5xl font-light text-[#1A1A1A] dark:text-white font-serif mb-12">{t.contact.title} <span className="font-bold italic">{t.contact.accent}</span></h2>
            
            <div className="space-y-6">
              {[
                { icon: <MapPin size={28} />, tag: t.contact.addressTag, val: t.contact.address },
                { icon: <Phone size={28} />, tag: t.contact.phoneTag, val: t.contact.phone || "050-2834280", dir: "ltr", isPhone: true },
                { icon: <Clock size={28} />, tag: t.contact.hoursTag, val: t.contact.hours }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ x: t.dir === 'rtl' ? -8 : 8 }}
                  className={`flex items-center gap-6 p-6 rounded-[2rem] bg-[#F9F9F9] dark:bg-gray-800 border border-gray-100 dark:border-white/5 hover:bg-[#F5F2ED] dark:hover:bg-gray-700 transition-all group ${t.dir === 'rtl' ? '' : 'flex-row-reverse'}`}
                >
                  <div className="w-16 h-16 bg-white dark:bg-gray-700 rounded-2xl flex items-center justify-center text-[#1E4D92] dark:text-[#4B9CD3] shadow-sm group-hover:scale-110 group-hover:bg-[#1E4D92] dark:group-hover:bg-[#4B9CD3] group-hover:text-white dark:group-hover:text-gray-900 transition-all">
                    {item.icon}
                  </div>
                  <div className={t.dir === 'rtl' ? 'text-right' : 'text-left'}>
                    <p className="text-xs text-[#6B7280] dark:text-gray-400 font-bold uppercase tracking-widest mb-1 opacity-70">{item.tag}</p>
                    {item.isPhone ? (
                      <a href={`tel:${item.val.replace(/-/g, '')}`} className="text-xl font-bold text-[#1A1A1A] dark:text-white hover:text-[#1E4D92] dark:hover:text-[#4B9CD3] transition-colors" dir={item.dir || t.dir}>
                        {item.val}
                      </a>
                    ) : (
                      <p className="text-xl font-bold text-[#1A1A1A] dark:text-white" dir={item.dir || t.dir}>{item.val}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className={`mt-12 flex gap-4 ${t.dir === 'rtl' ? '' : 'justify-end'}`}>
               {[
                 { icon: Facebook, href: 'https://www.facebook.com' },
                 { icon: Instagram, href: t.contact.instagram || 'https://www.instagram.com/eyad.abuaqel' },
                 { icon: MessageCircle, href: t.contact.whatsapp || 'https://wa.me/972502834280', isWhatsApp: true }
               ].map((item, i) => (
                  <motion.a
                    key={i}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    href={item.href}
                    target={item.isWhatsApp ? '_blank' : undefined}
                    rel={item.isWhatsApp ? 'noopener noreferrer' : undefined}
                    className={`w-14 h-14 rounded-full ${item.isWhatsApp ? 'bg-green-500 hover:bg-green-600' : 'bg-[#1A1A1A] dark:bg-white hover:bg-[#1E4D92] dark:hover:bg-[#4B9CD3]'} flex items-center justify-center text-white dark:text-gray-900 transition-all shadow-lg`}
                  >
                    <item.icon size={24} />
                  </motion.a>
               ))}
            </div>
          </motion.div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#1A1A1A] dark:bg-gray-800 rounded-[3.5rem] p-8 md:p-14 text-white relative overflow-hidden shadow-2xl transition-colors"
          >
            <div className="relative z-10" dir={t.dir}>
              <h4 className="text-3xl font-serif font-light mb-6 text-white/90">{t.contact.formTitle}</h4>

              {/* Rate Limit Warning */}
              {isBlocked && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-orange-500/20 border border-orange-500/50 rounded-2xl flex items-start gap-3"
                >
                  <AlertCircle className="shrink-0 text-orange-400 mt-0.5" size={20} />
                  <div className="flex-1">
                    <p className="font-bold text-orange-300 mb-1">
                      {t.dir === 'rtl' ? 'יותר מדי ניסיונות' : 'Too Many Attempts'}
                    </p>
                    <p className="text-sm text-white/70">
                      {t.dir === 'rtl'
                        ? `נא להמתין לפני שליחת הודעה נוספת. ניתן לנסות שוב בעוד ${Math.ceil(((resetTime || 0) - Date.now()) / 60000)} דקות.`
                        : `Please wait before sending another message. You can try again in ${Math.ceil(((resetTime || 0) - Date.now()) / 60000)} minutes.`
                      }
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Remaining Attempts Warning */}
              {!isBlocked && remainingAttempts < 3 && remainingAttempts > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mb-6 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-xl flex items-center gap-2"
                >
                  <AlertCircle className="shrink-0 text-yellow-400" size={16} />
                  <p className="text-sm text-yellow-200">
                    {t.dir === 'rtl'
                      ? `נותרו ${remainingAttempts} ניסיונות לשליחה`
                      : `${remainingAttempts} submission${remainingAttempts > 1 ? 's' : ''} remaining`
                    }
                  </p>
                </motion.div>
              )}

              <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                <div className="relative">
                  <label htmlFor="name" className="block text-xs uppercase tracking-widest opacity-60 mb-3 font-bold italic">{t.contact.labelName}</label>
                  <input 
                    id="name"
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full bg-white/5 border ${errors.name ? 'border-red-500' : 'border-white/10'} rounded-2xl px-6 py-4 focus:outline-none focus:border-[#4B9CD3] focus:bg-white/10 transition-all text-white placeholder-white/20`} 
                    placeholder={t.contact.placeholderName}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    required
                  />
                  {errors.name && (
                    <p id="name-error" className="absolute -bottom-5 right-2 text-[10px] text-red-500 font-bold uppercase" aria-live="polite">
                      {errors.name}
                    </p>
                  )}
                </div>
                <div className="relative">
                  <label htmlFor="phone" className="block text-xs uppercase tracking-widest opacity-60 mb-3 font-bold italic">{t.contact.labelPhone}</label>
                  <input 
                    id="phone"
                    type="tel" 
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={`w-full bg-white/5 border ${errors.phone ? 'border-red-500' : 'border-white/10'} rounded-2xl px-6 py-4 focus:outline-none focus:border-[#4B9CD3] focus:bg-white/10 transition-all text-white placeholder-white/20`} 
                    placeholder={t.contact.placeholderPhone}
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? "phone-error" : undefined}
                    required
                  />
                  {errors.phone && (
                    <p id="phone-error" className="absolute -bottom-5 right-2 text-[10px] text-red-500 font-bold uppercase" aria-live="polite">
                      {errors.phone}
                    </p>
                  )}
                </div>
                <div className="relative">
                  <label htmlFor="message" className="block text-xs uppercase tracking-widest opacity-60 mb-3 font-bold italic">{t.contact.labelMessage}</label>
                  <textarea 
                    id="message"
                    rows={4} 
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`w-full bg-white/5 border ${errors.message ? 'border-red-500' : 'border-white/10'} rounded-2xl px-6 py-4 focus:outline-none focus:border-[#4B9CD3] focus:bg-white/10 transition-all text-white placeholder-white/20 resize-none`} 
                    placeholder={t.contact.placeholderMessage}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "message-error" : undefined}
                    required
                  />
                  {errors.message && (
                    <p id="message-error" className="absolute -bottom-5 right-2 text-[10px] text-red-500 font-bold uppercase" aria-live="polite">
                      {errors.message}
                    </p>
                  )}
                </div>
                
                <div className="pt-4">
                  <motion.button
                    whileHover={canSubmit && !isSubmitting ? { scale: 1.02 } : {}}
                    whileTap={canSubmit && !isSubmitting ? { scale: 0.98 } : {}}
                    disabled={isSubmitting || isBlocked || !canSubmit}
                    aria-label={isSuccess
                      ? (t.dir === 'rtl' ? 'נשלח בהצלחה' : 'Sent successfully')
                      : isBlocked
                        ? (t.dir === 'rtl' ? 'חסום זמנית' : 'Temporarily blocked')
                        : t.contact.submit
                    }
                    className={`w-full font-bold py-6 rounded-full transition-all shadow-xl text-lg tracking-wide uppercase flex items-center justify-center gap-3 overflow-hidden ${
                      isSuccess
                        ? 'bg-green-500 hover:bg-green-600 text-white'
                        : isBlocked
                          ? 'bg-gray-500 cursor-not-allowed text-white/50'
                          : 'bg-[#4B9CD3] hover:bg-white text-[#1A1A1A] cursor-pointer'
                    }`}
                  >
                    {isSubmitting ? (
                      <Activity className="animate-spin" size={24} />
                    ) : isSuccess ? (
                      <CheckCircle2 size={24} />
                    ) : isBlocked ? (
                      <AlertCircle size={24} />
                    ) : (
                      t.contact.submit
                    )}
                  </motion.button>
                </div>
              </form>
            </div>
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#1E4D92] dark:bg-[#4B9CD3] opacity-20 blur-[120px] -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#4B9CD3] dark:bg-[#1E4D92] opacity-10 blur-[100px] translate-y-1/2 -translate-x-1/2" />
          </motion.div>
        </ScrollReveal>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full h-[500px] rounded-[3.5rem] overflow-hidden shadow-2xl border-4 border-[#F9F9F9] dark:border-gray-800 relative group"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3359.369!2d35.1664!3d32.9602!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzLCsDU3JzQwLjciTiAzNcKwMDknNTkuMCJF!5e0!3m2!1sen!2sil!4v1700000000000!5m2!1sen!2sil"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Eyad Abu Aqel Physiotherapy Clinic Location"
            className="grayscale invert dark:invert-0 hover:grayscale-0 transition-all duration-1000 ease-in-out"
          ></iframe>

          <div className={`absolute top-8 ${t.dir === 'rtl' ? 'right-8' : 'left-8'} pointer-events-none`}>
            <div className={`bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl p-6 rounded-[2rem] shadow-2xl border border-white/50 dark:border-white/10 max-w-[280px] ${t.dir === 'rtl' ? 'text-right' : 'text-left'}`}>
               <div className="flex items-center gap-3 mb-3">
                 <div className="w-10 h-10 rounded-xl bg-[#1E4D92] dark:bg-[#4B9CD3] flex items-center justify-center text-white dark:text-gray-900">
                   <MapPin size={20} />
                 </div>
                 <span className="text-[10px] uppercase tracking-[0.2em] font-black text-[#1E4D92] dark:text-[#4B9CD3]">{t.contact.addressTag}</span>
               </div>
               <p className="text-lg font-bold text-[#1A1A1A] dark:text-white leading-tight">{t.contact.address}</p>
               <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                  <p className="text-[10px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-widest">{t.name}</p>
               </div>
            </div>
          </div>

          <div className={`absolute bottom-8 ${t.dir === 'rtl' ? 'left-8' : 'right-8'}`}>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://www.google.com/maps/dir/?api=1&destination=32.9602,35.1664"
              target="_blank"
              rel="noopener noreferrer"
              className="pointer-events-auto flex items-center gap-3 bg-[#1E4D92] dark:bg-[#4B9CD3] text-white dark:text-gray-900 px-8 py-4 rounded-full font-bold shadow-2xl hover:bg-[#1A1A1A] dark:hover:bg-white transition-all"
            >
              <MapPin size={20} />
              <span>{t.dir === 'rtl' ? 'ניווט למקום' : 'Get Directions'}</span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
