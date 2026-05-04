import { useEffect } from 'react';

interface SEOProps {
  t: any;
  lang: 'he' | 'en' | 'ru' | 'ar' | 'el';
}

export const SEO = ({ t, lang }: SEOProps) => {
  useEffect(() => {
    // Update Document Title
    const baseTitle = `${t.name} | ${t.title}`;
    const localizedTitle = lang === 'he' 
      ? `${baseTitle} - אבו סנאן` 
      : `${baseTitle} - Abu Sinan`;
    document.title = localizedTitle;

    // Update Meta Description
    const description = t.hero.desc;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }

    // Schema.org Structured Data (LocalBusiness)
    const schema = {
      "@context": "https://schema.org",
      "@type": "PhysiotherapyClinic",
      "name": t.name,
      "alternateName": "Eyad Abu Aqel Physiotherapy",
      "description": t.hero.desc,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": lang === 'he' ? "מרכז הכפר" : "Village Center",
        "addressLocality": lang === 'he' ? "אבו סנאן" : "Abu Sinan",
        "addressCountry": "IL"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 32.9602,
        "longitude": 35.1664
      },
      "url": window.location.href,
      "telephone": "+972-50-000-0000", // Placeholder, user should update
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Sunday"],
          "opens": "08:00",
          "closes": "20:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": "Friday",
          "opens": "08:00",
          "closes": "14:00"
        }
      ],
      "image": "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=1200",
      "priceRange": "$$",
      "medicalSpecialty": "Physiotherapy"
    };

    const script = document.getElementById('local-business-schema');
    if (script) {
      script.innerHTML = JSON.stringify(schema);
    }
  }, [t, lang]);

  return null;
};
