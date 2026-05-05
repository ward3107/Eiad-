import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Activity, 
  Globe, 
  ShieldCheck, 
  MoveHorizontal, 
  Clock, 
  ArrowRight, 
  X 
} from 'lucide-react';

export const AccessibilityWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('accessibility_hidden') === 'true';
    }
    return false;
  });
  const [settings, setSettings] = useState({
    fontSize: 100,
    lineHeight: 1.5,
    letterSpacing: 0,
    highContrast: false,
    readableFont: false,
    grayscale: false,
    highlightLinks: false,
    stopAnimations: false,
    bigCursor: false,
    invertColors: false
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const updateFontSize = (delta: number) => {
    setSettings(prev => ({ ...prev, fontSize: Math.min(Math.max(prev.fontSize + delta, 80), 150) }));
  };

  const updateLineHeight = (delta: number) => {
    setSettings(prev => ({ ...prev, lineHeight: Math.min(Math.max(prev.lineHeight + delta, 1), 2.5) }));
  };

  const updateLetterSpacing = (delta: number) => {
    setSettings(prev => ({ ...prev, letterSpacing: Math.min(Math.max(prev.letterSpacing + delta, -1), 5) }));
  };

  useEffect(() => {
    const root = document.documentElement;
    root.style.fontSize = `${settings.fontSize}%`;
    root.style.lineHeight = `${settings.lineHeight}`;
    root.style.letterSpacing = `${settings.letterSpacing}px`;
    
    if (settings.highContrast) root.classList.add('high-contrast');
    else root.classList.remove('high-contrast');
    
    if (settings.grayscale) root.style.filter = 'grayscale(100%)';
    else if (settings.invertColors) root.style.filter = 'invert(100%)';
    else root.style.filter = 'none';

    if (settings.readableFont) root.style.fontFamily = 'Arial, sans-serif';
    else root.style.fontFamily = '';

    if (settings.highlightLinks) root.classList.add('highlight-links');
    else root.classList.remove('highlight-links');

    if (settings.stopAnimations) root.classList.add('stop-animations');
    else root.classList.remove('stop-animations');

    if (settings.bigCursor) root.classList.add('big-cursor');
    else root.classList.remove('big-cursor');
  }, [settings]);

  const reset = () => {
    setSettings({ 
      fontSize: 100, 
      lineHeight: 1.5,
      letterSpacing: 0,
      highContrast: false, 
      readableFont: false, 
      grayscale: false,
      highlightLinks: false,
      stopAnimations: false,
      bigCursor: false,
      invertColors: false
    });
  };

  const hideWidget = () => {
    setIsHidden(true);
    sessionStorage.setItem('accessibility_hidden', 'true');
  };

  if (isHidden) return null;

  const features = [
    { id: 'highContrast', label: 'ניגודיות גבוהה', icon: Activity },
    { id: 'grayscale', label: 'גווני אפור', icon: Globe },
    { id: 'invertColors', label: 'הפוך צבעים', icon: ShieldCheck },
    { id: 'readableFont', label: 'גופן קריא', icon: MoveHorizontal },
    { id: 'highlightLinks', label: 'הדגשת קישורים', icon: Globe },
    { id: 'stopAnimations', label: 'עצור אנימציות', icon: Clock },
    { id: 'bigCursor', label: 'סמן גדול', icon: ArrowRight },
  ];

  return (
    <div className="fixed bottom-20 sm:bottom-24 right-4 sm:right-8 z-[70] group">
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={hideWidget}
            className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-6 h-6 sm:w-6 sm:h-6 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-[71]"
            aria-label="Hide accessibility widget"
          >
            <X size={12} className="sm:w-3 sm:h-3" />
          </motion.button>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 sm:w-14 sm:h-14 bg-[#1A1A1A] dark:bg-white text-white dark:text-gray-900 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform relative focus:outline-none focus:ring-2 focus:ring-[#1E4D92]/50"
        aria-label="Accessibility Menu"
        aria-expanded={isOpen}
      >
        <ShieldCheck size={24} className="sm:w-7 sm:h-7" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="absolute bottom-14 sm:bottom-16 right-0 w-[calc(100vw-2rem)] sm:w-80 bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-100 dark:border-white/10 p-4 sm:p-6 overflow-y-auto max-h-[70vh] transition-colors"
            dir="rtl"
            role="dialog"
            aria-label="Accessibility Options"
          >
            <div className="flex justify-between items-center mb-6">
              <h4 className="font-bold text-[#1A1A1A] dark:text-white">נגישות באתר (תיקון 13)</h4>
              <button onClick={() => setIsOpen(false)} aria-label="Close accessibility menu" className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"><X size={20} /></button>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-2xl bg-gray-50 dark:bg-gray-700 transition-colors">
                <span className="text-sm font-bold text-gray-900 dark:text-white">גודל טקסט</span>
                <div className="flex gap-2">
                  <button onClick={() => updateFontSize(-10)} className="w-8 h-8 rounded-lg bg-white dark:bg-gray-600 border border-gray-200 dark:border-white/10 flex items-center justify-center font-bold text-gray-900 dark:text-white focus:ring-2 focus:ring-[#1E4D92]/50" aria-label="Decrease font size">-</button>
                  <span className="text-xs font-mono text-gray-900 dark:text-white" aria-live="polite">{settings.fontSize}%</span>
                  <button onClick={() => updateFontSize(10)} className="w-8 h-8 rounded-lg bg-white dark:bg-gray-600 border border-gray-200 dark:border-white/10 flex items-center justify-center font-bold text-gray-900 dark:text-white focus:ring-2 focus:ring-[#1E4D92]/50" aria-label="Increase font size">+</button>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-2xl bg-gray-50 dark:bg-gray-700 transition-colors">
                <span className="text-sm font-bold text-gray-900 dark:text-white">מרווח בין שורות</span>
                <div className="flex gap-2">
                  <button onClick={() => updateLineHeight(-0.1)} className="w-8 h-8 rounded-lg bg-white dark:bg-gray-600 border border-gray-200 dark:border-white/10 flex items-center justify-center font-bold text-gray-900 dark:text-white focus:ring-2 focus:ring-[#1E4D92]/50" aria-label="Decrease line height">-</button>
                  <span className="text-xs font-mono text-gray-900 dark:text-white" aria-live="polite">{settings.lineHeight.toFixed(1)}</span>
                  <button onClick={() => updateLineHeight(0.1)} className="w-8 h-8 rounded-lg bg-white dark:bg-gray-600 border border-gray-200 dark:border-white/10 flex items-center justify-center font-bold text-gray-900 dark:text-white focus:ring-2 focus:ring-[#1E4D92]/50" aria-label="Increase line height">+</button>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-2xl bg-gray-50 dark:bg-gray-700 transition-colors">
                <span className="text-sm font-bold text-gray-900 dark:text-white">מרווח בין אותיות</span>
                <div className="flex gap-2">
                  <button onClick={() => updateLetterSpacing(-0.5)} className="w-8 h-8 rounded-lg bg-white dark:bg-gray-600 border border-gray-200 dark:border-white/10 flex items-center justify-center font-bold text-gray-900 dark:text-white focus:ring-2 focus:ring-[#1E4D92]/50" aria-label="Decrease letter spacing">-</button>
                  <span className="text-xs font-mono text-gray-900 dark:text-white" aria-live="polite">{settings.letterSpacing}px</span>
                  <button onClick={() => updateLetterSpacing(0.5)} className="w-8 h-8 rounded-lg bg-white dark:bg-gray-600 border border-gray-200 dark:border-white/10 flex items-center justify-center font-bold text-gray-900 dark:text-white focus:ring-2 focus:ring-[#1E4D92]/50" aria-label="Increase letter spacing">+</button>
                </div>
              </div>

              {features.map((f) => {
                const Icon = f.icon;
                const isActive = settings[f.id as keyof typeof settings];
                return (
                  <button 
                    key={f.id}
                    onClick={() => toggleSetting(f.id as any)}
                    aria-pressed={isActive}
                    className={`w-full flex items-center justify-between p-3 rounded-2xl transition-all focus:outline-none focus:ring-2 focus:ring-[#1E4D92]/50 ${isActive ? 'bg-[#1E4D92] dark:bg-[#4B9CD3] text-white dark:text-gray-900 shadow-md' : 'bg-gray-50 dark:bg-gray-700 text-[#1A1A1A] dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600'}`}
                  >
                    <span className="text-sm font-bold">{f.label}</span>
                    <Icon size={18} />
                  </button>
                );
              })}

              <button 
                onClick={reset}
                className="w-full py-3 text-sm font-bold text-[#1E4D92] dark:text-[#4B9CD3] hover:underline"
              >
                אפס הגדרות נגישות
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
