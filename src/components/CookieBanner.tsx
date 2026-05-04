import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export const CookieBanner = ({ onShowPrivacy, lang }: { onShowPrivacy: () => void, lang: string }) => {
  const [isVisible, setIsVisible] = useState(false);

  const cookieLangs: any = {
    he: {
      text: 'אנו משתמשים בעוגיות כדי לשפר את חווית הגלישה שלך. האתר פועל בהתאם לחוק הגנת הפרטיות הישראלי (תיקון 13). המשך הגלישה מהווה הסכמה לתנאי השימוש ומדיניות הפרטיות.',
      accept: 'הבנתי, תודה',
      privacy: 'מדיניות פרטיות',
      aria: 'באנר הסכמת עוגיות',
      dir: 'rtl'
    },
    en: {
      text: 'We use cookies to improve your browsing experience. This site operates in accordance with the Israeli Privacy Law (Amendment 13). Continued browsing constitutes consent to our terms and privacy policy.',
      accept: 'Got it, thanks',
      privacy: 'Privacy Policy',
      aria: 'Cookie consent banner',
      dir: 'ltr'
    },
    ar: {
      text: 'نحن نستخدم ملفات تعريف الارتباط لتحسين تجربة التصفح الخاصة بك. يعمل هذا الموقع وفقاً لقانون حماية الخصوصية الإسرائيلي (التعديل 13). استمرار التصفح يعني الموافقة على شروطنا وسياسة الخصوصية الخاصة بنا.',
      accept: 'فهمت، شكراً',
      privacy: 'سياسة الخصوصية',
      aria: 'بانر الموافقة على ملفات تعريف الارتباط',
      dir: 'rtl'
    },
    ru: {
      text: 'Мы используем файлы cookie для улучшения вашего опыта. Этот сайт работает в соответствии с Законом Израиля о защите конфиденциальности (Поправка 13). Продолжение просмотра означает согласие с нашими условиями и политикой конфиденциальности.',
      accept: 'Понятно, спасибо',
      privacy: 'Политика конфиденциальности',
      aria: 'Баннер согласия на использование файлов cookie',
      dir: 'ltr'
    },
    el: {
      text: 'Χρησιμοποιούμε cookies για να βελτιώσουμε την εμπειρία περιήγησής σας. Αυτός ο ιστότοπος λειτουργεί σύμφωνα με τον Ισραηλινό Νόμο περί Προστασίας της Ιδιωτικής Ζωής (Τροπολογία 13). Η συνέχιση της περιήγησης αποτελεί συγκατάθεση στους όρους και την πολιτική απορρήτου μας.',
      accept: 'Το κατάλαβα, ευχαριστώ',
      privacy: 'Πολιτική Απορρήτου',
      aria: 'Banner συγκατάθεσης για cookies',
      dir: 'ltr'
    }
  };

  const t = cookieLangs[lang] || cookieLangs.he;

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('cookie-consent', 'true');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          className="fixed bottom-0 left-0 right-0 z-[100] p-4"
          role="region"
          aria-label={t.aria}
        >
          <div className="max-w-4xl mx-auto bg-[#1A1A1A] dark:bg-black text-white rounded-[2rem] p-6 shadow-2xl flex flex-col md:flex-row items-center gap-6 border border-white/10 transition-colors duration-500" dir={t.dir}>
            <div className="flex-1">
              <p className="text-sm leading-relaxed opacity-80">
                {t.text}
              </p>
            </div>
            <div className="flex gap-4 shrink-0">
               <button onClick={accept} className="bg-[#4B9CD3] text-[#1A1A1A] px-8 py-3 rounded-full font-bold hover:bg-white transition-all shadow-md">{t.accept}</button>
               <button onClick={onShowPrivacy} className="text-white/60 hover:text-white underline text-sm py-3 transition-colors">{t.privacy}</button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
