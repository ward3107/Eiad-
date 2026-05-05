import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Share2, X, Link2, Facebook, Twitter, Mail } from 'lucide-react';
import { MessageCircle } from 'lucide-react';

interface ShareWidgetProps {
  dir?: 'rtl' | 'ltr';
  t?: {
    share?: string;
    copied?: string;
  };
}

export const ShareWidget = ({ dir = 'rtl' }: ShareWidgetProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareUrl = typeof window !== 'undefined' ? window.location.href : 'https://eyad-physiotherapy.vercel.app';
  const shareText = dir === 'rtl'
    ? 'פיזיותרפיה מקצועית ושיקום פציעות ספורט אצל איאד אבו עקל באבו סנאן'
    : 'Professional physiotherapy and sports rehabilitation at Eyad Abu Aqel in Abu Snan';

  const shareOptions = [
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      href: `https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`,
      color: 'bg-green-500 hover:bg-green-600',
      textColor: 'text-white'
    },
    {
      name: 'Facebook',
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      color: 'bg-[#1877F2] hover:bg-[#166FE5]',
      textColor: 'text-white'
    },
    {
      name: 'Twitter',
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      color: 'bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200',
      textColor: 'text-white dark:text-black'
    },
    {
      name: 'Copy Link',
      icon: Link2,
      action: () => copyToClipboard(),
      color: 'bg-[#1E4D92] dark:bg-[#4B9CD3] hover:bg-[#1A1A1A] dark:hover:bg-white',
      textColor: 'text-white dark:text-gray-900'
    }
  ];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = shareUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShareClick = (href: string) => {
    window.open(href, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed left-3 sm:left-6 top-1/2 -translate-y-1/2 z-[60] flex flex-col items-center gap-2 sm:gap-3">
      {/* Main Share Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.6 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 sm:w-14 sm:h-14 bg-[#1E4D92] dark:bg-[#4B9CD3] hover:bg-[#1A1A1A] dark:hover:bg-white rounded-full shadow-2xl flex items-center justify-center text-white dark:text-gray-900 transition-all relative"
        aria-label="Share"
        aria-expanded={isOpen}
      >
        <Share2 size={18} strokeWidth={2.5} className="sm:w-6 sm:h-6" />

        {/* Pulse animation */}
        <motion.span
          className="absolute inset-0 rounded-full bg-[#4B9CD3] dark:bg-[#1E4D92]"
          animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        />
      </motion.button>

      {/* Expandable Share Options */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: -20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: -20 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-3"
          >
            {shareOptions.map((option, index) => {
              const Icon = option.icon;

              // Copy Link button (action)
              if (option.name === 'Copy Link') {
                return copied ? (
                  <motion.div
                    key="copy-check"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-9 h-9 sm:w-12 sm:h-12 bg-green-500 text-white rounded-full shadow-lg flex items-center justify-center text-[10px] sm:text-xs font-bold"
                  >
                    ✓
                  </motion.div>
                ) : (
                  <motion.button
                    key="copy-link"
                    initial={{ opacity: 0, x: -20, scale: 0 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -20, scale: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.2 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => copyToClipboard()}
                    className={`w-9 h-9 sm:w-12 sm:h-12 ${option.color} ${option.textColor} rounded-full shadow-lg flex items-center justify-center transition-all`}
                    aria-label={option.name}
                  >
                    <Icon size={16} strokeWidth={2.5} className="sm:w-5 sm:h-5" />
                  </motion.button>
                );
              }

              // Social share buttons (links)
              return (
                <motion.button
                  key={option.name}
                  initial={{ opacity: 0, x: -20, scale: 0 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -20, scale: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.2 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => option.href && handleShareClick(option.href)}
                  className={`w-9 h-9 sm:w-12 sm:h-12 ${option.color} ${option.textColor} rounded-full shadow-lg flex items-center justify-center transition-all`}
                  aria-label={option.name}
                >
                  <Icon size={16} strokeWidth={2.5} className="sm:w-5 sm:h-5" />
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
