import React from 'react';
import { Activity, Facebook, Instagram } from 'lucide-react';

export const Footer = ({ t, setLegalModal }: { t: any, setLegalModal: any }) => {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const elem = document.getElementById(targetId);
    if (elem) {
      window.scrollTo({
        top: elem.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="bg-[#0A0A0A] dark:bg-black text-white/40 py-16 border-t border-white/5 transition-colors duration-500" dir={t.dir}>
      <div className={`max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-10 ${t.dir === 'rtl' ? '' : 'md:flex-row-reverse'}`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#1E4D92] dark:bg-[#4B9CD3] rounded-full flex items-center justify-center text-white dark:text-gray-900 transition-colors">
            <Activity size={20} />
          </div>
          <div>
            <p className="text-white font-bold tracking-tight text-lg">{t.name} - {t.nav.services}</p>
            <p className="text-[10px] uppercase font-bold tracking-[0.2em] opacity-50">© {new Date().getFullYear()} {t.footer.copy}</p>
          </div>
        </div>

        <div id="privacy" className={`flex gap-10 text-sm font-bold uppercase tracking-widest ${t.dir === 'rtl' ? '' : 'flex-row-reverse'}`}>
          <button onClick={() => setLegalModal({ isOpen: true, type: 'privacy' })} className="hover:text-[#4B9CD3] transition-colors">{t.footer.privacy}</button>
          <button onClick={() => setLegalModal({ isOpen: true, type: 'terms' })} className="hover:text-[#4B9CD3] transition-colors">{t.footer.terms}</button>
          <a 
            href="#contact" 
            onClick={(e) => scrollToSection(e, '#contact')}
            className="hover:text-[#4B9CD3] transition-colors"
          >
            {t.nav.booking}
          </a>
        </div>

        <div className="flex gap-4">
           {[Facebook, Instagram].map((Icon, i) => (
              <a key={i} href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#1E4D92] hover:border-[#1E4D92] hover:text-white transition-all">
                <Icon size={20} />
              </a>
           ))}
        </div>
      </div>
    </footer>
  );
};
