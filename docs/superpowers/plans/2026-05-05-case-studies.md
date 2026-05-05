# Before/After Case Studies Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build an interactive before/after image comparison slider showcasing 4 physiotherapy treatment case studies.

**Architecture:** Two components - reusable `BeforeAfterSlider` (handles drag interaction and image clipping) and `CaseStudies` (displays the slider cards). Uses layered divs with `overflow: hidden` and percentage-based width for the clipping effect.

**Tech Stack:** React 19, TypeScript, Framer Motion (motion/react), Tailwind CSS v4

---

## File Structure

| File | Purpose |
|------|---------|
| `src/components/BeforeAfterSlider.tsx` | Reusable slider with drag handle, touch/mouse support, RTL compatibility |
| `src/components/CaseStudies.tsx` | Section component displaying 4 case study cards |
| `src/constants/translations.ts` | Add `caseStudies` translations for all 5 languages |
| `src/App.tsx` | Import and place `<CaseStudies />` between Gallery and Testimonials |

---

## Chunk 1: BeforeAfterSlider Component

### Task 1: Create BeforeAfterSlider Component

**Files:**
- Create: `src/components/BeforeAfterSlider.tsx`

- [ ] **Step 1: Write the BeforeAfterSlider component**

Create the reusable slider component with drag interaction:

```typescript
import React, { useState, useRef, MouseEvent, TouchEvent } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel: string;
  afterLabel: string;
  dir?: 'rtl' | 'ltr';
}

export const BeforeAfterSlider = ({
  beforeImage,
  afterImage,
  beforeLabel,
  afterLabel,
  dir = 'ltr'
}: BeforeAfterSliderProps) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (isDragging) handleMove(e.clientX);
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    handleMove(e.touches[0].clientX);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[400px] rounded-[2rem] overflow-hidden cursor-col-resize select-none"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchMove={handleTouchMove}
      dir={dir}
    >
      {/* After Image (background) */}
      <img
        src={afterImage}
        alt={afterLabel}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Before Image (clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${sliderPosition}%` }}
      >
        <img
          src={beforeImage}
          alt={beforeLabel}
          className="absolute inset-0 h-full object-cover w-auto max-w-none"
          style={{ minWidth: '100%' }}
        />
      </div>

      {/* Handle */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white shadow-xl cursor-col-resize"
        style={{ left: `${sliderPosition}%` }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
      >
        <motion.div
          className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 bg-white rounded-full shadow-2xl flex items-center justify-center text-[#1E4D92]`}
          animate={{ scale: isDragging ? 1.1 : 1 }}
          transition={{ duration: 0.2 }}
        >
          {dir === 'rtl' ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </motion.div>
      </div>

      {/* Labels */}
      <div className={`absolute bottom-4 left-4 ${dir === 'rtl' ? 'right-4 left-auto' : ''}`}>
        <span className="bg-black/50 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full">
          {beforeLabel}
        </span>
      </div>
      <div className={`absolute bottom-4 right-4 ${dir === 'rtl' ? 'left-4 right-auto' : ''}`}>
        <span className="bg-[#1E4D92]/80 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full">
          {afterLabel}
        </span>
      </div>
    </div>
  );
};
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/components/BeforeAfterSlider.tsx
git commit -m "feat: add BeforeAfterSlider component with drag interaction"
```

---

## Chunk 2: Add Translations

### Task 2: Add CaseStudies Translations (All 5 Languages)

**Files:**
- Modify: `src/constants/translations.ts`

- [ ] **Step 1: Add Hebrew caseStudies translation**

Find Hebrew `testimonials` section (search for: `basedOn: 'מבוסס על 150+ ביקורות'`) and insert after it:

```typescript
    caseStudies: {
      tag: 'תוצאות טיפול',
      title: 'רואים את',
      accent: 'השינוי',
      before: 'לפני',
      after: 'אחרי',
      items: [
        {
          id: 'acl',
          beforeImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=800',
          afterImage: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=800',
          title: 'שיקום ACL'
        },
        {
          id: 'back',
          beforeImage: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800',
          afterImage: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&q=80&w=800',
          title: 'כאבי גב'
        },
        {
          id: 'sports',
          beforeImage: 'https://images.unsplash.com/photo-1559593298-851625877cd3?auto=format&fit=crop&q=80&w=800',
          afterImage: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&q=80&w=800',
          title: 'פציעות ספורט'
        },
        {
          id: 'surgery',
          beforeImage: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800',
          afterImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800',
          title: 'לאחר ניתוח'
        }
      ]
    },
```

- [ ] **Step 2: Add English caseStudies translation**

Find English `testimonials` section (search for: `basedOn: 'Based on 150+ reviews'`) and insert after it:

```typescript
    caseStudies: {
      tag: 'TREATMENT RESULTS',
      title: 'See the',
      accent: 'Transformation',
      before: 'Before',
      after: 'After',
      items: [
        {
          id: 'acl',
          beforeImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=800',
          afterImage: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=800',
          title: 'ACL Recovery'
        },
        {
          id: 'back',
          beforeImage: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800',
          afterImage: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&q=80&w=800',
          title: 'Back Pain Rehab'
        },
        {
          id: 'sports',
          beforeImage: 'https://images.unsplash.com/photo-1559593298-851625877cd3?auto=format&fit=crop&q=80&w=800',
          afterImage: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&q=80&w=800',
          title: 'Sports Injury'
        },
        {
          id: 'surgery',
          beforeImage: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800',
          afterImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800',
          title: 'Post-Surgery Rehab'
        }
      ]
    },
```

- [ ] **Step 3: Add Russian caseStudies translation**

Find Russian `testimonials` section (search for: `basedOn: 'На основе 150+ отзывов'`) and insert after it:

```typescript
    caseStudies: {
      tag: 'РЕЗУЛЬТАТЫ ЛЕЧЕНИЯ',
      title: 'Увидеть',
      accent: 'Преображение',
      before: 'До',
      after: 'После',
      items: [
        { id: 'acl', beforeImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=800', afterImage: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=800', title: 'Восстановление ACL' },
        { id: 'back', beforeImage: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800', afterImage: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&q=80&w=800', title: 'Боль в спине' },
        { id: 'sports', beforeImage: 'https://images.unsplash.com/photo-1559593298-851625877cd3?auto=format&fit=crop&q=80&w=800', afterImage: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&q=80&w=800', title: 'Спортивные травмы' },
        { id: 'surgery', beforeImage: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800', afterImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800', title: 'После операции' }
      ]
    },
```

- [ ] **Step 4: Add Arabic caseStudies translation**

Find Arabic `testimonials` section (search for: `basedOn: 'بناءً على أكثر من 150 تقييماً'`) and insert after it:

```typescript
    caseStudies: {
      tag: 'نتائج العلاج',
      title: 'شاهد',
      accent: 'التحول',
      before: 'قبل',
      after: 'بعد',
      items: [
        { id: 'acl', beforeImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=800', afterImage: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=800', title: 'تأهيل الرباط الصليبي' },
        { id: 'back', beforeImage: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800', afterImage: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&q=80&w=800', title: 'آلام الظهر' },
        { id: 'sports', beforeImage: 'https://images.unsplash.com/photo-1559593298-851625877cd3?auto=format&fit=crop&q=80&w=800', afterImage: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&q=80&w=800', title: 'إصابات رياضية' },
        { id: 'surgery', beforeImage: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800', afterImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800', title: 'التأهيل بعد الجراحة' }
      ]
    },
```

- [ ] **Step 5: Add Greek caseStudies translation**

Find Greek `testimonials` section (search for: `basedOn: 'Βασισμένο σε 150+ κριτικές'`) and insert after it:

```typescript
    caseStudies: {
      tag: 'ΑΠΟΤΕΛΕΣΜΑΤΑ ΘΕΡΑΠΕΙΑΣ',
      title: 'Δείτε την',
      accent: 'Μεταμόρφωση',
      before: 'Πριν',
      after: 'Μετά',
      items: [
        { id: 'acl', beforeImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=800', afterImage: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=800', title: 'Αποκατάσταση ACL' },
        { id: 'back', beforeImage: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800', afterImage: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&q=80&w=800', title: 'Πόνος στην πλάτη' },
        { id: 'sports', beforeImage: 'https://images.unsplash.com/photo-1559593298-851625877cd3?auto=format&fit=crop&q=80&w=800', afterImage: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&q=80&w=800', title: 'Αθλητικοί τραυματισμοί' },
        { id: 'surgery', beforeImage: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800', afterImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800', title: 'Μετεγχειρητική αποκατάσταση' }
      ]
    },
```

- [ ] **Step 6: Add nav entry for each language**

Search for each language's `nav` object and add the caseStudies entry:

**Hebrew nav** (find `nav: { services: 'שירותים'...`):
```typescript
caseStudies: 'מקרי בדיקה',
```

**English nav** (find `nav: { services: 'Services'...`):
```typescript
caseStudies: 'Case Studies',
```

**Russian nav** (find `nav: { services: 'Услуги'...`):
```typescript
caseStudies: 'Истории болезней',
```

**Arabic nav** (find `nav: { services: 'خدماتنا'...`):
```typescript
caseStudies: 'دراسات الحالة',
```

**Greek nav** (find `nav: { services: 'Υπηρεσίες'...`):
```typescript
caseStudies: 'Μελέτες Περιπτώσεων',
```

- [ ] **Step 7: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 8: Commit**

```bash
git add src/constants/translations.ts
git commit -m "feat: add caseStudies translations for all 5 languages"
```

---

## Pre-Flight Check

- [ ] **Verify ScrollReveal component exists**

Run: `ls src/components/ScrollReveal.tsx`
Expected: File exists

---

## Chunk 3: CaseStudies Section Component

### Task 3: Create CaseStudies Section Component

**Files:**
- Create: `src/components/CaseStudies.tsx`

- [ ] **Step 1: Write the CaseStudies component**

```typescript
import React from 'react';
import { motion } from 'motion/react';
import { BeforeAfterSlider } from './BeforeAfterSlider';
import { ScrollReveal } from './ScrollReveal';

export const CaseStudies = ({ t, lang }: { t: any, lang: string }) => {
  return (
    <section id="case-studies" className="py-24 bg-white dark:bg-gray-900 transition-colors duration-500" dir={t.dir}>
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <ScrollReveal>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h3 className="text-[#1E4D92] dark:text-[#4B9CD3] uppercase tracking-widest font-bold text-sm mb-4">
              {t.caseStudies.tag}
            </h3>
            <h2 className="text-4xl md:text-5xl font-light text-[#1A1A1A] dark:text-white font-serif">
              {t.caseStudies.title}{' '}
              <span className="font-bold underline decoration-[#4B9CD3]/30">
                {t.caseStudies.accent}
              </span>
            </h2>
          </motion.div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {t.caseStudies.items.map((study: any, index: number) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="bg-[#F9F9F9] dark:bg-gray-800 rounded-[2.5rem] p-6 hover:shadow-xl hover:shadow-[#1E4D92]/10 transition-all duration-500"
            >
              <BeforeAfterSlider
                beforeImage={study.beforeImage}
                afterImage={study.afterImage}
                beforeLabel={t.caseStudies.before}
                afterLabel={t.caseStudies.after}
                dir={t.dir as 'rtl' | 'ltr'}
              />
              <div className={`mt-4 text-center ${t.dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                <h4 className="text-xl font-bold text-[#1A1A1A] dark:text-white">
                  {study.title}
                </h4>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/components/CaseStudies.tsx
git commit -m "feat: add CaseStudies section component"
```

---

## Chunk 4: App Integration

### Task 4: Integrate CaseStudies into App

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: Import CaseStudies component**

Add import at top with other component imports:

```typescript
import { CaseStudies } from './components/CaseStudies';
```

- [ ] **Step 2: Add CaseStudies to component tree**

Find `<Gallery t={currentTranslations} />` and `<Testimonials t={currentTranslations} />`. Insert between them:

```typescript
<Gallery t={currentTranslations} />
<CaseStudies t={currentTranslations} lang={lang} />
<Testimonials t={currentTranslations} />
```

- [ ] **Step 3: Verify dev server shows new section**

Run: Check browser at http://localhost:3001
Expected: Case Studies section appears between Gallery and Testimonials

- [ ] **Step 4: Test drag interaction**

1. Click and drag slider handle
2. Verify before/after images reveal correctly
3. Test on mobile (touch drag)

- [ ] **Step 5: Test language switching**

1. Switch between Hebrew, English, Russian, Arabic, Greek
2. Verify labels and titles translate correctly
3. Verify RTL works for Hebrew/Arabic

- [ ] **Step 6: Commit**

```bash
git add src/App.tsx
git commit -m "feat: integrate CaseStudies section between Gallery and Testimonials"
```

---

## Chunk 5: Final Verification

### Task 5: Final Testing & Polish

**Files:**
- All modified files

- [ ] **Step 1: Run type check**

Run: `npx tsc --noEmit`
Expected: No TypeScript errors

- [ ] **Step 2: Test dark mode**

1. Toggle dark mode
2. Verify section colors transition correctly
3. Verify labels are visible in both modes

- [ ] **Step 3: Test responsive design**

1. View at mobile (375px)
2. View at tablet (768px)
3. View at desktop (1920px)
Expected: Grid adjusts correctly (1 col mobile, 2 cols tablet+)

- [ ] **Step 4: Verify accessibility**

1. Tab through sliders
2. Verify images have alt text
3. Verify touch interaction works on mobile

- [ ] **Step 5: Final commit with tag**

```bash
git add .
git commit -m "feat: complete Before/After Case Studies feature

- Interactive drag-to-compare slider
- 4 case studies (ACL, Back Pain, Sports Injury, Post-Surgery)
- Full RTL support for Hebrew/Arabic
- Touch and mouse interaction
- Responsive grid layout"
```

---

## Testing Checklist

- [ ] Drag handle moves smoothly
- [ ] Touch interaction works on mobile
- [ ] RTL languages flip handle direction correctly
- [ ] All 5 languages display correct labels
- [ ] Dark mode colors look correct
- [ ] Images load and display properly
- [ ] Section appears in correct position (after Gallery, before Testimonials)
- [ ] Responsive grid works at all breakpoints
- [ ] No TypeScript errors
- [ ] No console errors in browser

---

## Image Sources (Replace Later)

Current images are Unsplash placeholders. Replace with actual patient before/after photos:

| Case Type | Before Image Suggestion | After Image Suggestion |
|-----------|------------------------|------------------------|
| ACL | Knee injury/bracing | Active knee movement |
| Back Pain | Person in pain/discomfort | Stretching/exercising |
| Sports Injury | Injury/swelling | Return to sport activity |
| Post-Surgery | Hospital/recovery | Active rehabilitation |
