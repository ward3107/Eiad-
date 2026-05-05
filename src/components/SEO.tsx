import { useEffect } from 'react';

interface SEOProps {
  t: any;
  lang: 'he' | 'en' | 'ru' | 'ar' | 'el';
}

const SITE_URL = 'https://eyad-physiotherapy.com'; // Replace with actual domain
const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=1200';

export const SEO = ({ t, lang }: SEOProps) => {
  useEffect(() => {
    // Update Document Title
    const baseTitle = `${t.name} | ${t.title}`;
    const localizedTitle = lang === 'he'
      ? `${baseTitle} - אבו סנאן`
      : `${baseTitle} - Abu Sinan`;
    document.title = localizedTitle;

    // Update or create meta description
    const description = t.hero.desc;
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);

    // OpenGraph Meta Tags
    const ogTags = {
      'og:type': 'website',
      'og:site_name': t.name,
      'og:title': localizedTitle,
      'og:description': description,
      'og:url': `${SITE_URL}${lang === 'en' ? '' : `/${lang}`}`,
      'og:image': DEFAULT_IMAGE,
      'og:image:width': '1200',
      'og:image:height': '630',
      'og:locale': lang === 'he' ? 'he_IL' : lang === 'ar' ? 'ar_AR' : lang === 'ru' ? 'ru_RU' : lang === 'el' ? 'el_GR' : 'en_US',
    };

    Object.entries(ogTags).forEach(([property, content]) => {
      let meta = document.querySelector(`meta[property="${property}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    });

    // Twitter Card Meta Tags
    const twitterTags = {
      'twitter:card': 'summary_large_image',
      'twitter:site': '@eyadphysio', // Replace with actual handle
      'twitter:title': localizedTitle,
      'twitter:description': description,
      'twitter:image': DEFAULT_IMAGE,
    };

    Object.entries(twitterTags).forEach(([name, content]) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', name);
        document.head.appendChild(meta);
      }
      if (content) meta.setAttribute('content', content);
    });

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', `${SITE_URL}${lang === 'en' ? '' : `/${lang}`}`);

    // Alternate language links
    const languages = ['he', 'en', 'ru', 'ar', 'el'];
    languages.forEach(l => {
      const href = l === 'en' ? SITE_URL : `${SITE_URL}/${l}`;
      let alternate = document.querySelector(`link[rel="alternate"][hreflang="${l}"]`);
      if (!alternate) {
        alternate = document.createElement('link');
        alternate.setAttribute('rel', 'alternate');
        alternate.setAttribute('hreflang', l);
        document.head.appendChild(alternate);
      }
      alternate.setAttribute('href', href);
    });

    // Add x-default for language detection
    let xDefault = document.querySelector('link[rel="alternate"][hreflang="x-default"]');
    if (!xDefault) {
      xDefault = document.createElement('link');
      xDefault.setAttribute('rel', 'alternate');
      xDefault.setAttribute('hreflang', 'x-default');
      document.head.appendChild(xDefault);
    }
    xDefault.setAttribute('href', SITE_URL);

    // Schema.org Structured Data (LocalBusiness + FAQPage)
    const faqItems = t.faq?.items || [];
    const schema = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "PhysiotherapyClinic",
          "@id": `${SITE_URL}/#localbusiness`,
          "name": t.name,
          "alternateName": "Eyad Abu Aqel Physiotherapy",
          "description": t.hero.desc,
          "url": SITE_URL,
          "telephone": "+972-50-283-4280",
          "email": "physio.eiad@gmail.com",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": lang === 'he' ? "מרכז הכפר" : "Village Center",
            "addressLocality": lang === 'he' ? "אבו סנאן" : "Abu Sinan",
            "addressRegion": "Northern District",
            "addressCountry": "IL"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 32.9602,
            "longitude": 35.1664
          },
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
          "image": DEFAULT_IMAGE,
          "priceRange": "$$",
          "medicalSpecialty": "Physiotherapy",
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "150",
            "bestRating": "5",
            "worstRating": "1"
          }
        },
        {
          "@type": "Person",
          "@id": `${SITE_URL}/#person`,
          "name": "Eyad Abu Aqel",
          "jobTitle": "Physiotherapist",
          "url": SITE_URL,
          "worksFor": {
            "@type": "LocalBusiness",
            "name": t.name,
            "@id": `${SITE_URL}/#localbusiness`
          }
        },
        {
          "@type": "WebSite",
          "@id": `${SITE_URL}/#website`,
          "url": SITE_URL,
          "name": t.name,
          "description": t.hero.desc,
          "inLanguage": lang,
          "publisher": {
            "@id": `${SITE_URL}/#person`
          }
        },
        {
          "@type": "FAQPage",
          "@id": `${SITE_URL}/#faq`,
          "url": `${SITE_URL}${lang === 'en' ? '' : `/${lang}`}#faq`,
          "name": `${t.faq?.title || 'FAQ'} - ${t.name}`,
          "mainEntity": faqItems.map((item: any) => ({
            "@type": "Question",
            "name": item.q,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": item.a
            }
          }))
        }
      ]
    };

    // Inject JSON-LD Schema
    let script = document.getElementById('structured-data-schema');
    if (!script) {
      script = document.createElement('script');
      script.id = 'structured-data-schema';
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(schema);

    // Set lang attribute on html
    document.documentElement.lang = lang;
    document.documentElement.dir = t.dir;
  }, [t, lang]);

  return null;
};
