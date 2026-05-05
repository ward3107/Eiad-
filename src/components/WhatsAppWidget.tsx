import React from 'react';
import { motion } from 'motion/react';
import { MessageCircle } from 'lucide-react';

interface WhatsAppWidgetProps {
  phoneNumber: string;
  message?: string;
  dir?: 'rtl' | 'ltr';
  t: {
    chatBubble: string;
    close: string;
  };
}

export const WhatsAppWidget = ({
  phoneNumber,
  message = 'Hello, I would like to book an appointment',
  dir = 'ltr'
}: WhatsAppWidgetProps) => {
  const whatsappUrl = `https://wa.me/972${phoneNumber.replace(/^0/, '')}?text=${encodeURIComponent(message)}`;

  const handleOpenWhatsApp = () => {
    window.open(whatsappUrl, '_blank');
  };

  return (
    <motion.button
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.5 }}
      whileHover={{ scale: 1.1, opacity: 1 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleOpenWhatsApp}
      className="fixed bottom-4 sm:bottom-6 left-3 sm:left-6 z-[70] w-12 h-12 sm:w-16 sm:h-16 bg-green-500 hover:bg-green-600 rounded-full shadow-2xl flex items-center justify-center text-white transition-all group relative opacity-50 hover:opacity-100"
      aria-label="WhatsApp chat"
    >
      <MessageCircle size={24} strokeWidth={2.5} className="sm:w-8 sm:h-8" />

      {/* Pulse animation */}
      <motion.span
        className="absolute inset-0 rounded-full bg-green-400"
        animate={{ scale: [1, 1.5, 1], opacity: [0.7, 0, 0.7] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.button>
  );
};
