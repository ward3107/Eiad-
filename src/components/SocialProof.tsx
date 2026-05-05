import React from 'react';
import { motion } from 'motion/react';
import { Star, Instagram, Facebook, ExternalLink } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

interface SocialProofProps {
  t: any;
}

export const SocialProof = ({ t }: SocialProofProps) => {
  const googleRating = 4.9;
  const totalReviews = 150;

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500" dir={t.dir}>
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <ScrollReveal>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-serif text-[#1A1A1A] dark:text-white mb-4">
              {t.socialProof.title} <span className="text-[#1E4D92] dark:text-[#4B9CD3]">{t.socialProof.accent}</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">{t.socialProof.subtitle}</p>
          </motion.div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Google Rating Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
            className="bg-white dark:bg-gray-800 rounded-[2.5rem] p-10 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-16 h-16 bg-[#4285F4] rounded-2xl flex items-center justify-center text-white">
                <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              </div>
              <span className="text-2xl font-bold text-[#1A1A1A] dark:text-white">Google</span>
            </div>

            <div className="text-center mb-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} size={28} fill="#FFD700" stroke="#FFD700" className="drop-shadow-sm" />
                ))}
              </div>
              <p className="text-5xl font-bold text-[#1A1A1A] dark:text-white">{googleRating}</p>
              <p className="text-gray-500 dark:text-gray-400 mt-1">out of 5</p>
            </div>

            <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
              {t.socialProof.basedOn} {totalReviews}+ {t.socialProof.reviews}
            </p>

            <a
              href="https://search.google.com/local/writereview?placeid=YOUR_PLACE_ID"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-[#4285F4] hover:bg-[#3367D6] text-white font-bold py-4 rounded-full text-center transition-all flex items-center justify-center gap-2"
            >
              <Star size={20} fill="white" />
              {t.socialProof.rateOnGoogle}
            </a>
          </motion.div>

          {/* Social Follow Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            whileHover={{ y: -8 }}
            className="bg-white dark:bg-gray-800 rounded-[2.5rem] p-10 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
          >
            <h3 className="text-2xl font-bold text-[#1A1A1A] dark:text-white text-center mb-8">
              {t.socialProof.followUs}
            </h3>

            <div className="space-y-4">
              {/* Instagram */}
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href={t.contact.instagram || 'https://www.instagram.com/eyad.abuaqel/'}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 rounded-2xl text-white hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
                  <Instagram size={24} />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-lg">Instagram</p>
                  <p className="text-sm opacity-90">@eyad.abuaqel</p>
                </div>
                <ExternalLink size={20} />
              </motion.a>

              {/* Facebook */}
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-[#1877F2] hover:bg-[#166FE5] rounded-2xl text-white hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
                  <Facebook size={24} />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-lg">Facebook</p>
                  <p className="text-sm opacity-90">{t.socialProof.facebookPage}</p>
                </div>
                <ExternalLink size={20} />
              </motion.a>
            </div>

            <p className="text-center text-gray-500 dark:text-gray-400 mt-6 text-sm">
              {t.socialProof.followPrompt}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
