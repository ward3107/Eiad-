import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

export const LegalModal = ({ isOpen, onClose, type, lang }: { isOpen: boolean, onClose: () => void, type: 'privacy' | 'terms', lang: 'he' | 'en' | 'ru' | 'ar' | 'el' }) => {
  const translations = {
    he: {
      privacy: { title: 'מדיניות פרטיות', content: 'מדיניות הפרטיות שלנו עודכנה בהתאם לתיקון 13 לחוק הגנת הפרטיות. אנו מחויבים לשמירה על סודיות המטופלים ומידע רפואי רגיש...' },
      terms: { title: 'תנאי שימוש', content: 'השימוש באתר זה כפוף לתנאי השימוש שלהלן. המידע באתר אינו מהווה תחליף לייעוץ רפואי מקצועי...' }
    },
    en: {
      privacy: { title: 'Privacy Policy', content: 'Our privacy policy has been updated in accordance with Amendment 13 of the Israeli Privacy Law. We are committed to protecting patient confidentiality...' },
      terms: { title: 'Terms of Use', content: 'Use of this site is subject to the following terms. Information on this site is not a substitute for professional medical advice...' }
    },
    ar: {
      privacy: { title: 'سياسة الخصوصية', content: 'تم تحديث سياسة الخصوصية الخاصة بنا وفقاً للتعديل 13 لقانون حماية الخصوصية الإسرائيلي. نحن ملتزمون بحماية خصوصية المرضى...' },
      terms: { title: 'شروط الاستخدام', content: 'يخضع استخدام هذا الموقع للشروط التالية. المعلومات الواردة في هذا الموقع ليست بديلاً عن الاستشارة الطبية المهنية...' }
    },
    ru: {
      privacy: { title: 'Политика конфиденциальности', content: 'Наша политика конфиденциальности была обновлена ​​в соответствии с Поправкой 13 к Закону Израиля о защиτε конфиденциальности...' },
      terms: { title: 'Условия использования', content: 'Использование этого сайта регулируется следующими условиями. Информация на этом сайте не заменяет профессиональную медицинскую консультацию...' }
    },
    el: {
      privacy: { title: 'Πολιτική Απορρήτου', content: 'Η πολιτική απορρήτου μας έχει ενημερωθεί σύμφωνα με την Τροπολογία 13 του Ισραηλινού Νόμου περί Προστασίας της Ιδιωτικής Ζωής. Δεσμευόμαστε για την προστασία του απορρήτου των ασθενών...' },
      terms: { title: 'Όροι Χρήσης', content: 'Η χρήση αυτού του ιστότοπου υπόκειται στους ακόλουθους όρους. Οι πληροφορίες σε αυτόν τον ιστότοπο δεν υποκαθιστούν την επαγγελματική ιατρική συμβουλή...' }
    }
  };

  const selectedContent = translations[lang as keyof typeof translations][type];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            className="relative w-full max-w-2xl bg-white dark:bg-gray-800 rounded-[2.5rem] p-8 md:p-12 shadow-2xl overflow-hidden max-h-[80vh] flex flex-col border border-transparent dark:border-white/10"
            dir={lang === 'he' || lang === 'ar' ? 'rtl' : 'ltr'}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <div className="flex justify-between items-center mb-8 shrink-0">
              <h2 id="modal-title" className="text-3xl font-serif font-bold text-[#1A1A1A] dark:text-white">{selectedContent?.title}</h2>
              <button 
                onClick={onClose} 
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors text-gray-500 dark:text-gray-400"
                aria-label="Close modal"
              >
                <X size={24} />
              </button>
            </div>
            <div className="overflow-y-auto pr-4 custom-scrollbar flex-1">
               <div className="space-y-6 text-[#4A4A4A] dark:text-gray-300 leading-relaxed text-lg">
                 <p className="font-bold text-[#1A1A1A] dark:text-white">עדכון אחרון: מאי 2024</p>
                 <p>{selectedContent?.content}</p>
                 <h3 className="text-xl font-bold text-[#1A1A1A] dark:text-white mt-8">1. איסוף מידע</h3>
                 <p>אנו אוספים מידע אישי כגון שם, מספר טלפון ומידע רפואי בסיסי לצורך קביעת תורים והענקת טיפול מיטבי. המידע נשמר במערכות מאובטחות בהתאם לתקני אבטחת מידע מחמירים.</p>
                 <h3 className="text-xl font-bold text-[#1A1A1A] dark:text-white mt-8">2. שימוש במידע</h3>
                 <p>המידע ישמש אך ורק למטרות רפואיות ותקשורת מול המטופל. לא נעביר מידע לצדדים שלישיים ללא הסכמה מפורשת, אלא אם נדרש על פי חוק.</p>
                 <h3 className="text-xl font-bold text-[#1A1A1A] dark:text-white mt-8">3. תיקון 13 לחוק הגנת הפרטיות</h3>
                 <p>אנו מצהירים על עמידה מלאה בהוראות הדין הישראלי, כולל זכות המטופל לעיון במידע ותיקונו במקרה הצורך.</p>
               </div>
            </div>
            <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700 shrink-0">
               <button onClick={onClose} className="w-full bg-[#1A1A1A] dark:bg-white text-white dark:text-gray-900 py-4 rounded-full font-bold text-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">סגור</button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
