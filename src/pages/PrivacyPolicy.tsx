/**
 * Privacy Policy — Compliant with PPL Section 11 + Amendment 13 + PPA 2022 guidelines
 * Last Updated: 2026-05-05
 *
 * All 13 required sections per Israeli Privacy Protection Law (PPL) 5741-1981
 * as amended by Amendment 13 (effective August 14, 2025)
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, ChevronDown, ChevronUp, Mail, Phone, MapPin, ArrowLeft } from 'lucide-react';

interface PrivacyPolicyProps {
  lang?: string;
}

// Privacy Policy translations with all 13 required sections
const translations: Record<string, any> = {
  he: {
    dir: 'rtl' as const,
    lastUpdated: '5 במאי 2026',
    readingTime: '~ 4 דקות קריאה',
    title: 'מדיניות פרטיות',
    subtitle: 'הצהרת פרטיות בהתאם לחוק הגנת הפרטיות הישראלי',
    introduction: 'מדיניות פרטיות זו נכתבה בהתאם לחוק הגנת הפרטיות (הוראת שעה) תשמ"א-1981 ותיקון 13 (שנכנס לתוקף ב-14 באוגוסט 2025).',
    sections: {
      '1': {
        title: 'זהות בעל המסד נתונים',
        content: `שם העסק: איאד אבו עקל - פיזיותרפיסט
בעלים: איאד אבו עקל
כתובת: אבו סנאן, מרכז הכפר, ישראל
אימייל: eyad.abuaqel@example.com
אתר אינטרנט: https://eyad-physiotherapy.vercel.app`
      },
      '2': {
        title: 'מידע שאנו אוספים',
        subsections: {
          '2a': {
            title: 'מידע שאתם מספקים ישירות',
            content: `שם מלא, מספר טלפון, כתובת אימייל (דרך טופס יצירת קשר או קביעת תור)
הודעות ושאלות ששולחו לנו
פרטים רפואיים בסיסיים לצורך קביעת תור`
          },
          '2b': {
            title: 'מידע שנאסף באופן אוטומטי',
            content: `כתובת IP (מסווגת כמידע אישי על פי תיקון 13)
סוג דפדפן וגרסה
סוג מכשיר (נייד/שולחן עבודה)
דפים שביקרת בהם וזמן שהייה
אתר ממנו הגעת (Referrer)`
          },
          '2c': {
            title: 'מידע מכלי צד שלישי',
            content: `Google Analytics 4: נתוני סשן, צפיות בדפים, מידע על מכשיר
Facebook Pixel: התנהגות גלישה למטרות מיקוד מודעות`
          }
        }
      },
      '3': {
        title: 'מטרה ובסיס חוקי',
        content: `מענה לפניות מטופס יצירת קשר [אינטרס חוקי לגיטימי]
שיפור האתר וניתוח נתונים [הסכמה]
שיווק ופרסום [הסכמה]
אבטחת האתר ומניעת הונאה [אינטרס חוקי לגיטימי]`
      },
      '4': {
        title: 'מי מקבל את המידע שלך',
        content: `Google LLC (ארה"ב) — שירותי Analytics ופרסום
Meta Platforms Inc. (ארה"ב) — Facebook Pixel
Vercel Inc. (ארה"ב) — תשתית שרתים
ספק האירוח (ישראל) — שירותי אירוח

**אנו לא מוכרים את המידע האישי שלך לצד שלישי.**`
      },
      '5': {
        title: 'העברת נתונים מחוץ לישראל',
        content: `חלק מספקיות השירות שלנו ממוקמות בארצות הברית (ארה"ב), שאינה מוגדרת אוטומטית כמדינה "מתאימה". העברת נתונים לארה"ב מבוססת על הסכמי הסעיפה הקלאוסיים (Standard Contractual Clauses - SCC) שאושרו על ידי הרשות להגנת הפרטיות.`
      },
      '6': {
        title: 'תקופת שמירת נתונים',
        content: `נתוני טופס יצירת קשר: 24 חודשים או עד בקשת מחיקה
נתוני Analytics: על פי מדיניות Google (14 חודשים כברירת מחדל)
נתוני שיווק: עד לביטול המינוי או בקשת מחיקה
יומני שרת (כתובות IP): 90 יום`
      },
      '7': {
        title: 'השלכות אי מסירת מידע',
        content: `מסירת השם והאימייל בטופס יצירת קשר היא בהתנדבות. אולם, אם לא תספק אותם, לא נוכל להגיב לפנייתך.

ניתן לסרב לעוגיות ניתוח ושיווק. האתר ימשיך לתפקד באופן מלא — רק תכונות המעקב יושבתו.`
      },
      '8': {
        title: 'הזכויות שלך על פי הדין הישראלי',
        content: `**זכות הגישה** - תוכל לבקש עותק של המידע האישי שלך
**זכות התיקון** - תוכל לבקש שנתקן מידע לא מדויק
**זכות המחיקה** - תוכל לבקח מחיקה כאשר המידע אינו נחוץ עוד
**זכות ההתנגדות** - תוכל להתנגד לעיבוד למטרות שיווק ישיר
**זכות ביטול הסכמה** - בכל עת, מבלי להשפיע על עיבוד קודם

**כיצד לממש את הזכויות:**
שלח/י אימייל ל- eyad.abuaqel@example.com עם הנושא "בקשה לזכויות פרטיות"

זמן תגובה: תוך 30 יום מקבלת הבקשה`
      },
      '9': {
        title: 'זכות להגיש תלונה לרשות להגנת הפרטיות',
        content: `אם לדעתך הופרו זכויות הפרטיות שלך, יש באפשרותך להגיש תלונה לרשות להגנת הפרטיות (PPA):

**כתובת:** רחוב כנפי נשרים 66, ירושלים, ישראל
**אתר:** gov.il/departments/privacy_protection_authority`
      },
      '10': {
        title: 'עוגיות',
        content: `אנו משתמשים בשלוש קטגוריות של עוגיות:

1. **עוגיות נחוצות** - נדרשות לתפקוד האתר. תמיד פעילות.
2. **עוגיות ניתוח** - Google Analytics, לשיפור האתר.
3. **עוגיות שיווק** - Facebook Pixel, Google Ads.

ניתן לשנות את העדפות העוגיות בכל עת דרך באנר העוגיות בתחתית העמוד.`
      },
      '11': {
        title: 'קבלת החלטות אוטומטיות ובינה מלאכותית',
        content: `אנו לא מבצעים קבלת החלטות אוטומטיות שמשפיעות עליך באופן משמעותי על סמך המידע האישי שלך.`
      },
      '12': {
        title: 'אבטחת מידע',
        content: `הצפנת HTTPS/SSL בהעברת נתונים
בקרת גישה (גישה מוגבלת לצוות בלבד)
נוהל הפרת מידע: נודיע למשתמשים המושפעים ול-PPA תוך 72 שעות מגילוי הפרה משמעותית`
      },
      '13': {
        title: 'עדכונים למדיניות',
        content: `אנו עשויים לעדכן מדיניות זה מעת לעת. תאריך העדכון האחרון מוצג למעלה. שינויים מהותיים יועברו באמצעות הודעה בולטת או אימייל.`
      }
    },
    backToHome: 'חזרה לדף הבית',
    tableOfContents: 'תוכן עניינים'
  },
  en: {
    dir: 'ltr' as const,
    lastUpdated: 'May 5, 2026',
    readingTime: '~ 4 minute read',
    title: 'Privacy Policy',
    subtitle: 'Privacy Statement pursuant to the Israeli Privacy Protection Law',
    introduction: 'This privacy policy is written in accordance with the Protection of Privacy Law (Temporary Order) 5741-1981 and Amendment 13 (effective August 14, 2025).',
    sections: {
      '1': {
        title: 'Data Controller Identity',
        content: `Business Name: Eyad Abu Aqel - Physiotherapist
Owner: Eyad Abu Aqel
Address: Abu Sinan, Village Center, Israel
Email: eyad.abuaqel@example.com
Website: https://eyad-physiotherapy.vercel.app`
      },
      '2': {
        title: 'What Data We Collect',
        subsections: {
          '2a': {
            title: 'Data you provide directly',
            content: `Full name, phone number, email address (via contact form or appointment booking)
Messages and inquiries you send us
Basic medical information for appointment scheduling`
          },
          '2b': {
            title: 'Data collected automatically',
            content: `IP address (now classified as personal data under Amendment 13)
Browser type and version
Device type (mobile/desktop)
Pages visited and time spent
Referring website URL`
          },
          '2c': {
            title: 'Data from third-party tools',
            content: `Google Analytics 4: session data, page views, device info
Facebook Pixel: browsing behavior for ad targeting`
          }
        }
      },
      '3': {
        title: 'Purpose and Legal Basis',
        content: `Responding to contact form submissions [legitimate interest]
Analytics and website improvement [consent]
Marketing and advertising [consent]
Ensuring website security and preventing fraud [legitimate interest]`
      },
      '4': {
        title: 'Who Receives Your Data',
        content: `Google LLC (USA) — Analytics and Ads services
Meta Platforms Inc. (USA) — Facebook Pixel
Vercel Inc. (USA) — Server infrastructure
Hosting provider (Israel) — Hosting services

**We do not sell your personal data to any third party.**`
      },
      '5': {
        title: 'International Data Transfers',
        content: `Some of our service providers are located in the United States, which is not automatically an "adequate" country. Data transfer to the US is based on Standard Contractual Clauses (SCC) approved by the Privacy Protection Authority.`
      },
      '6': {
        title: 'Data Retention Periods',
        content: `Contact form data: 24 months or until request to delete
Analytics data: as per Google's policy (14 months default)
Marketing data: until you unsubscribe or request deletion
Server logs (IP addresses): 90 days`
      },
      '7': {
        title: 'Consequences of Not Providing Data',
        content: `Providing your name and email in the contact form is voluntary. However, if you do not provide them, we cannot respond to your inquiry.

You can decline analytics and marketing cookies. The website will still function fully — only tracking features will be disabled.`
      },
      '8': {
        title: 'Your Rights Under Israeli Law',
        content: `**Right of access** — you can request a copy of your data
**Right of correction** — you can request we correct inaccurate data
**Right of deletion** — you can request deletion when no longer needed
**Right to object** — you can object to processing for direct marketing
**Right to withdraw consent** — at any time, without affecting prior processing

**How to exercise your rights:**
Email us at eyad.abuaqel@example.com with subject "Privacy Rights Request"

Response time: within 30 days of receiving your request`
      },
      '9': {
        title: 'Right to Complain to the PPA',
        content: `If you believe your privacy rights have been violated, you have the right to file a complaint with the Privacy Protection Authority (PPA):

**Address:** 66 Kanfei Nesharim St., Jerusalem, Israel
**Website:** gov.il/en/departments/the_privacy_protection_authority`
      },
      '10': {
        title: 'Cookies',
        content: `We use three categories of cookies:

1. **Necessary cookies** — Required for the site to function. Always on.
2. **Analytics cookies** — Google Analytics, for site improvement.
3. **Marketing cookies** — Facebook Pixel, Google Ads.

You can change your cookie preferences at any time via the cookie banner at the bottom of the page.`
      },
      '11': {
        title: 'Automated Decision-Making and AI',
        content: `We do not make automated decisions that significantly affect you based on your personal data.`
      },
      '12': {
        title: 'Data Security',
        content: `HTTPS/SSL encryption in transit
Access controls (limited staff access)
Data breach procedure: we will notify affected users and the PPA within 72 hours of discovery of a significant breach`
      },
      '13': {
        title: 'Policy Updates',
        content: `We may update this policy from time to time. Last updated date shown at top. Material changes will be communicated via email or prominent notice.`
      }
    },
    backToHome: 'Back to Home',
    tableOfContents: 'Table of Contents'
  },
  ar: {
    dir: 'rtl' as const,
    lastUpdated: '5 مايو 2026',
    readingTime: '~ 4 دقائق قراءة',
    title: 'سياسة الخصوصية',
    subtitle: 'بيان الخصوصية وفقًا لقانون حماية الخصوصية الإسرائيلي',
    introduction: 'تمت كتابة سياسة الخصوصية هذه وفقًا لقانون حماية الخصوصية (أمر مؤقت) 5741-1981 والتعديل 13 (ساري المفعول في 14 أغسطس 2025).',
    sections: {
      '1': {
        title: 'هوية مسؤول البيانات',
        content: `اسم النشاط التجاري: إياد أبو عقل - أخصائي علاج طبيعي
المالك: إياد أبو عقل
العنوان: أبو سنان، مركز القرية، إسرائيل
البريد الإلكتروني: eyad.abuaqel@example.com
الموقع الإلكتروني: https://eyad-physiotherapy.vercel.app`
      },
      '2': {
        title: 'البيانات التي نجمعها',
        subsections: {
          '2a': {
            title: 'البيانات التي تقدمها مباشرة',
            content: `الاسم الكامل ورقم الهاتف وعنوان البريد الإلكتروني (عبر نموذج الاتصال أو حجز المواعيد)
الرسائل والاستفسارات التي ترسلها لنا
معلومات طبية أساسية لتحديد المواعيد`
          },
          '2b': {
            title: 'البيانات المجمعة تلقائيًا',
            content: `عنوان IP (مصنف كمعلومات شخصية بموجب التعديل 13)
نوع المتصفح وإصداره
نوع الجهاز (جوال/سطح مكتب)
الصفحات التي تمت زيارتها والوقت المستغرق
عنوان URL للموقع المُحيل`
          },
          '2c': {
            title: 'البيانات من أدوات الطرف الثالث',
            content: `Google Analytics 4: بيانات الجلسة ومرات مشاهدة الصفحة ومعلومات الجهاز
Facebook Pixel: سلوك التصفح لاستهداف الإعلانات`
          }
        }
      },
      '3': {
        title: 'الغرض والأساس القانوني',
        content: `الرد على نموذج الاتصال [مصلحة مشروعة]
التحليلات وتحسين الموقع [موافقة]
التسويق والإعلان [موافقة]
ضمان أمان الموقع ومنع الاحتيال [مصلحة مشروعة]`
      },
      '4': {
        title: 'من يتلقى بياناتك',
        content: `Google LLC (الولايات المتحدة) — خدمات التحليلات والإعلانات
Meta Platforms Inc. (الولايات المتحدة) — Facebook Pixel
Vercel Inc. (الولايات المتحدة) — بنية الخوادم
مزود الاستضافة (إسرائيل) — خدمات الاستضافة

**نحن لا نبيع بياناتك الشخصية لأي طرف ثالث.**`
      },
      '5': {
        title: 'نقل البيانات الدولي',
        content: `بعض مزودي الخدمة لدينا موجودون في الولايات المتحدة، والتي لم يتم تعريفها تلقائيًا كـ "دولة كافية". يُبنى نقل البيانات إلى الولايات المتحدة على البنود التعاقدية القياسية (SCC) المعتمدة من قبل سلطة حماية الخصوصية.`
      },
      '6': {
        title: 'فترات الاحتفاظ بالبيانات',
        content: `بيانات نموذج الاتصال: 24 شهرًا أو حتى طلب الحذف
بيانات التحليلات: وفقًا لسياسة Google (14 شهرًا افتراضيًا)
بيانات التسويق: حتى إلغاء الاشتراك أو طلب الحذف
سجلات الخادم (عناوين IP): 90 يومًا`
      },
      '7': {
        title: 'عواقب عدم تقديم البيانات',
        content: `تقديم اسمك وعنوان البريد الإلكتروني في نموذج الاتصال طوعي. ومع ذلك، إذا لم تقدمها، لا يمكننا الرد على استفسارك.

يمكنك رفض ملفات تعريف الارتباط للتحليلات والتسويق. سيستمر الموقع في العمل بشكل كامل — سيتم تعطيل ميزات التتبع فقط.`
      },
      '8': {
        title: 'حقوقك بموجب القانون الإسرائيلي',
        content: `**حق الوصول** — يمكنك طلب نسخة من بياناتك
**حق التصحيح** — يمكنك طلب تصحيح البيانات غير الدقيقة
**حق الحذف** — يمكنك طلب الحذف عندما لم تعد هناك حاجة
**حق الاعتراض** — يمكنك الاعتراض على المعالجة للتسويق المباشر
**حق سحب الموافقة** — في أي وقت، دون التأثير على المعالجة السابقة

**كيفية ممارسة حقوقك:**
أرسل إيميل إلى eyad.abuaqel@example.com مع الموضوع "طلب حقوق الخصوصية"

وقت الرد: خلال 30 يومًا من تلقي الطلب`
      },
      '9': {
        title: 'حق تقديم شكوى إلى PPA',
        content: `إذا كنت تعتقد أن حقوق الخصوصية الخاصة بك قد انتهكت، يحق لك تقديم شكوى إلى سلطة حماية الخصوصية (PPA):

**العنوان:** شارع Kanfei Nesharim 66، القدس، إسرائيل
**الموقع الإلكتروني:** gov.il/ar/departments/privacy_protection_authority`
      },
      '10': {
        title: 'ملفات تعريف الارتباط',
        content: `نحن نستخدم ثلاث فئات من ملفات تعريف الارتباط:

1. **ملفات تعريف الارتباط الضرورية** — مطلوبة لتشغيل الموقع. دائمًا مفعلة.
2. **ملفات تعريف الارتباط للتحليلات** — Google Analytics، لتحسين الموقع.
3. **ملفات تعريف الارتباط للتسويق** — Facebook Pixel، Google Ads.

يمكنك تغيير تفضيلات ملفات تعريف الارتباط في أي وقت عبر لافتة ملفات تعريف الارتباط في أسفل الصفحة.`
      },
      '11': {
        title: 'اتخاذ القرار الآلي والذكاء الاصطناعي',
        content: `نحن لا نتخذ قرارات آلية تؤثر عليك بشكل كبير بناءً على بياناتك الشخصية.`
      },
      '12': {
        title: 'أمان البيانات',
        content: `تشفير HTTPS/SSL أثناء النقل
ضوابط الوصول (وصول محدود للموظفين)
إجراء خرق البيانات: سنخبر المستخدمين المتضرينين و PPA في غضون 72 ساعة من اكتشاف خرق كبير`
      },
      '13': {
        title: 'تحديثات السياسة',
        content: `قد نقوم بتحديث هذه السياسة من وقت لآخر. تاريخ آخر تحديث معروض في الأعلى. سيتم توصيل التغييرات المادية عبر البريد الإلكتروني أو إشعار بارز.`
      }
    },
    backToHome: 'العودة إلى الصفحة الرئيسية',
    tableOfContents: 'جدول المحتويات'
  },
  ru: {
    dir: 'ltr' as const,
    lastUpdated: '5 мая 2026 г.',
    readingTime: '~ 4 минуты чтения',
    title: 'Политика конфиденциальности',
    subtitle: 'Заявление о конфиденциальности согласно Закону Израиля о защите конфиденциальности',
    introduction: 'Данная политика конфиденциальности написана в соответствии с Законом о защите конфиденциальности (Временное положение) 5741-1981 и Поправкой 13 (вступившей в силу 14 августа 2025 года).',
    sections: {
      '1': {
        title: 'Личность контролера данных',
        content: `Название бизнеса: Эйяд Абу Акель - Физиотерапевт
Владелец: Эйяд Абу Акель
Адрес: Абу Синан, Центр деревни, Израиль
Электронная почта: eyad.abuaqel@example.com
Веб-сайт: https://eyad-physiotherapy.vercel.app`
      },
      '2': {
        title: 'Какие данные мы собираем',
        subsections: {
          '2a': {
            title: 'Данные, которые вы предоставляете напрямую',
            content: `Полное имя, номер телефона, адрес электронной почты (через контактную форму или запись на прием)
Сообщения и запросы, которые вы отправляете нам
Базовая медицинская информация для записи на прием`
          },
          '2b': {
            title: 'Данные, собираемые автоматически',
            content: `IP-адрес (теперь классифицируется как персональные данные согласно Поправке 13)
Тип и версия браузера
Тип устройства (мобильный/настольный)
Посещенные страницы и время пребывания
URL-адрес перехода`
          },
          '2c': {
            title: 'Данные от сторонних инструментов',
            content: `Google Analytics 4: данные сеанса, просмотры страниц, информация об устройстве
Facebook Pixel: поведение при просмотре для таргетинга рекламы`
          }
        }
      },
      '3': {
        title: 'Цель и правовая основа',
        content: `Ответ на контактную форму [законный интерес]
Аналитика и улучшение сайта [согласие]
Маркетинг и реклама [согласие]
Обеспечение безопасности сайта и предотвращение мошенничества [законный интерес]`
      },
      '4': {
        title: 'Кто получает ваши данные',
        content: `Google LLC (США) — услуги аналитики и рекламы
Meta Platforms Inc. (США) — Facebook Pixel
Vercel Inc. (США) — серверная инфраструктура
Поставщик хостинга (Израиль) — хостинг-услуги

**Мы не продаем ваши персональные данные третьим лицам.**`
      },
      '5': {
        title: 'Международная передача данных',
        content: `Некоторые из наших поставщиков услуг находятся в Соединенных Штатах, которые не являются автоматически "адекватной" страной. Передача данных в США основана на Стандартных контрактных положениях (SCC), одобренных Управлением по защите конфиденциальности.`
      },
      '6': {
        title: 'Сроки хранения данных',
        content: `Данные контактной формы: 24 месяца или до запроса на удаление
Данные аналитики: согласно политике Google (14 месяцев по умолчанию)
Маркетинговые данные: до отказа от подписки или запроса на удаление
Журналы сервера (IP-адреса): 90 дней`
      },
      '7': {
        title: 'Последствия непредоставления данных',
        content: `Предоставление вашего имени и адреса электронной почты в контактной форме является добровольным. Однако, если вы их не предоставите, мы не сможем ответить на ваш запрос.

Вы можете отказаться от файлов cookie аналитики и маркетинга. Веб-сайт продолжит работать полностью — будут отключены только функции отслеживания.`
      },
      '8': {
        title: 'Ваши права согласно израильскому закону',
        content: `**Право на доступ** — вы можете запросить копию своих данных
**Право на исправление** — вы можете запросить исправление неточных данных
**Право на удаление** — вы можете запросить удаление, когда данные больше не нужны
**Право на возражение** — вы можете возразить против обработки для прямого маркетинга
**Право на отзыв согласия** — в любое время, не влияя на предыдущую обработку

**Как воспользоваться правами:**
Напишите нам на eyad.abuaqel@example.com с темой "Запрос на права конфиденциальности"

Время ответа: в течение 30 дней с момента получения запроса`
      },
      '9': {
        title: 'Право на подачу жалобы в PPA',
        content: `Если вы считаете, что ваши права на конфиденциальность были нарушены, вы имеете право подать жалобу в Управление по защите конфиденциальности (PPA):

**Адрес:** ул. Канфей Нешарим, 66, Иерусалим, Израиль
**Веб-сайт:** gov.il/en/departments/privacy_protection_authority`
      },
      '10': {
        title: 'Файлы cookie',
        content: `Мы используем три категории файлов cookie:

1. **Необходимые файлы cookie** — требуются для работы сайта. Всегда включены.
2. **Файлы cookie аналитики** — Google Analytics, для улучшения сайта.
3. **Маркетинговые файлы cookie** — Facebook Pixel, Google Ads.

Вы можете изменить свои предпочтения файлов cookie в любое время через баннер файлов cookie внизу страницы.`
      },
      '11': {
        title: 'Автоматическое принятие решений и ИИ',
        content: `Мы не принимаем автоматических решений, которые существенно влияют на вас на основе ваших персональных данных.`
      },
      '12': {
        title: 'Безопасность данных',
        content: `Шифрование HTTPS/SSL при передаче
Контроль доступа (ограниченный доступ персонала)
Процедура утечки данных: мы уведомим затронутых пользователей и PPA в течение 72 часов с момента обнаружения значительной утечки`
      },
      '13': {
        title: 'Обновления политики',
        content: `Мы можем время от времени обновлять эту политику. Дата последнего обновления указана вверху. Существенные изменения будут сообщаться по электронной почте или через заметное уведомление.`
      }
    },
    backToHome: 'Вернуться на главную',
    tableOfContents: 'Содержание'
  },
  el: {
    dir: 'ltr' as const,
    lastUpdated: '5 Μαΐου 2026',
    readingTime: '~ 4 λεπτά αναγνώσεων',
    title: 'Πολιτική Απορρήτου',
    subtitle: 'Δήλωση απορρήτου σύμφωνα με τον Ισραηλινό Νόμο Προστασίας της Ιδιωτικής Ζωής',
    introduction: 'Η παρούσα πολιτική απορρήτου συντάχεται σύμφωνα με τον Νόμο Προστασίας της Ιδιωτικής Ζωής (Προσωρινή Διάταξη) 5741-1981 και την Τροπολογία 13 (ισχύει από 14 Αυγούστου 2025).',
    sections: {
      '1': {
        title: 'Ταυτότητα Υπεύθυνου Επεξεργασίας',
        content: `Επωνυμία επιχείρησης: Eyad Abu Aqel - Φυσικοθεραπευτής
Ιδιοκτήτης: Eyad Abu Aqel
Διεύθυνση: Abu Sinan, Κέντρο Χωριού, Ισραήλ
Email: eyad.abuaqel@example.com
Ιστότοπος: https://eyad-physiotherapy.vercel.app`
      },
      '2': {
        title: 'Ποια δεδομένα συλλέγουμε',
        subsections: {
          '2a': {
            title: 'Δεδομένα που παρέχετε άμεσα',
            content: `Πλήρες όνομα, τηλέφωνο, email (μέσω φόρμας επικοινωνίας ή κράτησης ραντεβού)
Μηνύματα και ερωτήματα που μας στέλνετε
Βασικά ιατρικά στοιχεία για κράτηση ραντεβού`
          },
          '2b': {
            title: 'Δεδομένα που συλλέγονται αυτόματα',
            content: `Διεύθυνση IP (ταξινομείεται ως προσωπικά δεδομένα βάσει της Τροπολογίας 13)
Τύπος και έκδοση περιηγητή
Τύπος συσκευής (κινητό/υπολογιστή)
Σελίδες που επισκεφθήκατε και χρόνος παραμονής
URL αναφοράς`
          },
          '2c': {
            title: 'Δεδομένα από εργαλεία τρίτων',
            content: `Google Analytics 4: δεδομένα περιόδου σύνδεσης, προβολές σελίδων, πληροφορίες συσκευής
Facebook Pixel: συμπεριφορά περιήγησης για στοχευμένη διαφήμιση`
          }
        }
      },
      '3': {
        title: 'Σκοπός και Νομική Βάση',
        content: `Απάντηση σε φόρμα επικοινωνίας [νόμιμο συμφέρον]
Αναλυτικά και βελτίωση ιστότοπου [συναίνεση]
Μάρκετινγκ και διαφήμιση [συναίνεση]
Διασφάλιση ασφάλειας ιστότοπου και αποφυγή απάτης [νόμιμο συμφέρον]`
      },
      '4': {
        title: 'Ποιος λαμβάνει τα δεδομένα σας',
        content: `Google LLC (ΗΠΑ) — υπηρεσίες Analytics και Διαφημίσεων
Meta Platforms Inc. (ΗΠΑ) — Facebook Pixel
Vercel Inc. (ΗΠΑ) — υποδομή διακομιστών
Πάροχος φιλοξενίας (Ισραήλ) — υπηρεσίες φιλοξενίας

**Δεν πουλάμε τα προσωπικά σας δεδομένα σε τρίτους.**`
      },
      '5': {
        title: 'Διεθνής Μεταφορά Δεδομένων',
        content: `Ορισμένοι πάροχοι υπηρεσιών μας βρίσκονται στις Ηνωμένες Πολιτείες, οι οποίες δεν θεωρούνται αυτόματα "κατάλληλη" χώρα. Η μεταφορά δεδομένων στις ΗΠΑ βασίζεται στα Τυπικά Συμβαλια Ένταξης (SCC) που εγκρίθηκαν από την Αρχή Προστασίας Προσωπικών Δεδομένων.`
      },
      '6': {
        title: 'Περίοδοι Διατήρησης Δεδομένων',
        content: `Δεδομένα φόρμας επικοινωνίας: 24 μήνες ή μέχρι αίτημα διαγραφής
Δεδομένα Analytics: σύμφωνα με την πολιτική της Google (14 μήνες προεπιλογή)
Δεδομένα μάρκετινγκ: μέχρι να διαγραφείτε ή ζητήσετε διαγραφή
Αρχεία διακομιστών (διευθύνσεις IP): 90 ημέρες`
      },
      '7': {
        title: 'Συνέπειες Μη Παροχής Δεδομένων',
        content: `Η παροχή του ονόματός σας και του email στη φόρμα επικοινωνίας είναι προαιρετική. Ωστόσο, αν δεν τα παράσχετε, δεν μπορούμε να απαντήσουμε στο αίτημά σας.

Μπορείτε να αρνηθείτε τα cookies αναλυτικών και μάρκετινγκ. Ο ιστότοπος θα συνεχίσει να λειτουργεί πλήρως — απλώς θα απενεργοποιηθούν οι λειτουργίες παρακολούθησης.`
      },
      '8': {
        title: 'Τα Δικαιώματά Σας Σύμφωνα με το Ισραηλινό Δίκαιο',
        content: `**Δικαίωμα πρόσβασης** — μπορείτε να ζητήσετε αντίγραφο των δεδομένων σας
**Δικαίωμα διόρθωσης** — μπορείτε να ζητήσετε διόρθωση ανακριβών δεδομένων
**Δικαίωμα διαγραφής** — μπορείτε να ζητήσετε διαγραφή όταν δεν χρειάζονται πλέον
**Δικαίωμα αντίρρησης** — μπορείτε να αρνηθείτε την επεξεργασία για άμεσο μάρκετινγκ
**Δικαίωμα ανάκλησης συγκατάθεσης** — ανά πάσα στιγμή, χωρίς να επηρεάζει την προηγούμενη επεξεργασία

**Πώς να ασκήσετε τα δικαιώματά σας:**
Στείλτε email στο eyad.abuaqel@example.com με θέμα "Αίτημα Δικαιωμάτων Απορρήτου"

Χρόνος απάντησης: εντός 30 ημερών από τη λήψη του αιτήματος`
      },
      '9': {
        title: 'Δικαίωμα Προσφυγής στην PPA',
        content: `Αν πιστεύετε ότι παραβιάστηκαν τα δικαιώματα απορρήτου σας, έχετε το δικαίωμα να υποβάλετε παράποση στην Αρχή Προστασίας Προσωπικών Δεδομένων (PPA):

**Διεύθυνση:** Οδός Kanfei Nesharim 66, Ιερουσαλήμ, Ισραήλ
**Ιστότοπος:** gov.il/en/departments/the_privacy_protection_authority`
      },
      '10': {
        title: 'Cookies',
        content: `Χρησιμοποιούμε τρεις κατηγορίες cookies:

1. **Απαραίτητα cookies** — Απαιτούνται για τη λειτουργία του ιστότοπου. Πάντα ενεργά.
2. **Cookies αναλυτικών** — Google Analytics, για βελτίωση του ιστότοπου.
3. **Cookies μάρκετινγκ** — Facebook Pixel, Google Ads.

Μπορείτε να αλλάξετε τις προτιμήσεις cookies ανά πάσα στιγμή μέσω του banner cookies στο κάτω μέρος της σελίδας.`
      },
      '11': {
        title: 'Αυτοματοποιημένη Λήψη Αποφάσεων και ΤΝ',
        content: `Δεν λαμβάνουμε αυτοματοποιημένες αποφάσεις που σας επηρεάζουν σημαντικά βάσει των προσωπικών σας δεδομένων.`
      },
      '12': {
        title: 'Ασφάλεια Δεδομένων',
        content: `Κρυπτογράφηση HTTPS/SSL κατά τη μεταφορά
Έλεγχοι πρόσβασης (περιορισμένη πρόσβαση προσωπικού)
Διαδικασία παραβίασης δεδομένων: θα ειδοποιήσουμε τους επηρεαζόμενους χρήστες και την PPA εντός 72 ωρών από την ανακάλυψη σημαντικής παραβίασης`
      },
      '13': {
        title: 'Ενημερώσεις Πολιτικής',
        content: `Μπορεί να ενημερώνουμε την παρούσα πολιτική κατά καιρούς. Η ημερομηνία της τελευταίας ενημέρωσης εμφανίζεται στην κορυφή. Οι ουσιαστικές αλλαγές θα ανακοινώνονται μέσω email ή έντονης ειδοποίησης.`
      }
    },
    backToHome: 'Επιστροφή στην Αρχική',
    tableOfContents: 'Πίνακας Περιεχομένων'
  }
};

export const PrivacyPolicy = ({ lang = 'he' }: PrivacyPolicyProps) => {
  const t = translations[lang] || translations.he;
  const [activeSection, setActiveSection] = React.useState<string | null>(null);
  const [activeTOC, setActiveTOC] = React.useState(false);

  // Scroll to section when TOC link clicked
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(`section-${sectionId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(sectionId);
      setTimeout(() => setActiveSection(null), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] dark:bg-gray-900 transition-colors duration-500" dir={t.dir}>
      {/* Header */}
      <header className="bg-[#1A1A1A] dark:bg-black text-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-[#4B9CD3] hover:text-[#5DADE2] mb-6 transition-all font-semibold"
          >
            <ArrowLeft size={18} />
            {t.backToHome}
          </Link>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">{t.title}</h1>
          <p className="text-xl text-white/70 mb-6">{t.subtitle}</p>
          <div className="flex flex-wrap gap-6 text-sm text-white/50">
            <span className="flex items-center gap-2">
              <Shield size={16} />
              {t.lastUpdated}
            </span>
            <span>{t.readingTime}</span>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12 flex flex-col md:flex-row gap-8">
        {/* Table of Contents - Desktop Sidebar */}
        <aside className="hidden md:block w-64 shrink-0 sticky top-24 h-fit self-start">
          <nav className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700" aria-label={t.tableOfContents}>
            <h3 className="font-bold text-[#1A1A1A] dark:text-white mb-4 text-sm uppercase tracking-wider">
              {t.tableOfContents}
            </h3>
            <ul className="space-y-2 text-sm">
              {Object.entries(t.sections).map(([key, section]: [string, any]) => (
                <li key={key}>
                  <button
                    onClick={() => scrollToSection(key)}
                    className={`text-left w-full px-3 py-2 rounded-lg transition-colors ${
                      activeSection === key
                        ? 'bg-[#4B9CD3]/10 text-[#4B9CD3] dark:text-[#4B9CD3] font-medium'
                        : 'text-gray-600 dark:text-gray-400 hover:text-[#1A1A1A] dark:hover:text-white'
                    }`}
                  >
                    {section.title}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main id="main-content" className="flex-1 min-w-0">
          {/* Introduction */}
          <section className="mb-12">
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed border-l-4 border-[#4B9CD3] pl-6">
              {t.introduction}
            </p>
          </section>

          {/* Sections */}
          {Object.entries(t.sections).map(([key, section]: [string, any]) => (
            <section
              id={`section-${key}`}
              key={key}
              className="mb-12 scroll-mt-24"
            >
              <h2 className="text-2xl font-bold text-[#1A1A1A] dark:text-white mb-4 flex items-center gap-3">
                <span className="w-10 h-10 bg-[#4B9CD3]/10 text-[#4B9CD3] dark:text-[#4B9CD3] rounded-full flex items-center justify-center text-sm font-bold">
                  {key}
                </span>
                {section.title}
              </h2>

              {section.subsections ? (
                <div className="space-y-6 ml-13">
                  {Object.entries(section.subsections).map(([subKey, subsection]: [string, any]) => (
                    <div key={subKey}>
                      <h3 className="text-lg font-semibold text-[#1A1A1A] dark:text-white mb-2">
                        {subsection.title}
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                        {subsection.content}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line ml-13">
                  {section.content}
                </p>
              )}
            </section>
          ))}

          {/* Footer Contact */}
          <section className="mt-16 p-8 bg-[#1A1A1A]/5 dark:bg-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-[#1A1A1A] dark:text-white mb-4">
              {translations[lang]?.sections['8']?.title || 'Contact Us'}
            </h3>
            <div className="space-y-3 text-gray-700 dark:text-gray-300">
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-[#4B9CD3]" />
                <a href="mailto:eyad.abuaqel@example.com" className="hover:text-[#4B9CD3] transition-colors">
                  eyad.abuaqel@example.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={18} className="text-[#4B9CD3]" />
                <span>Abu Sinan, Village Center, Israel</span>
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* Mobile TOC */}
      <details className="md:hidden fixed bottom-20 left-4 right-4 z-50 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
        <summary className="px-4 py-3 font-semibold text-[#1A1A1A] dark:text-white cursor-pointer flex items-center justify-between">
          {t.tableOfContents}
          <ChevronDown size={20} />
        </summary>
        <nav className="p-4 border-t border-gray-200 dark:border-gray-700 max-h-64 overflow-y-auto">
          <ul className="space-y-2 text-sm">
            {Object.entries(t.sections).map(([key, section]: [string, any]) => (
              <li key={key}>
                <button
                  onClick={() => scrollToSection(key)}
                  className="text-left w-full px-3 py-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  {section.title}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </details>
    </div>
  );
};

export default PrivacyPolicy;
