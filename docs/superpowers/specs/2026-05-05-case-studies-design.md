# Before/After Case Studies Design

**Date:** 2025-05-05
**Status:** Approved

## Overview
Add an interactive before/after image comparison slider to showcase physiotherapy treatment results.

## Feature Description
A new `CaseStudies` section featuring 3-4 case studies with an interactive drag slider. Users drag a handle to reveal the "after" image over the "before" image, showing treatment transformation.

## Initial Case Studies (4)
1. **ACL Recovery** - Knee rehabilitation after ligament injury
2. **Back Pain Rehabilitation** - Spine treatment results
3. **Sports Injury** - Ankle/shoulder recovery
4. **Post-Surgery Rehab** - General orthopedic surgery recovery

## Component Structure

### Files to Create
- `src/components/CaseStudies.tsx` - Main section component
- `src/components/BeforeAfterSlider.tsx` - Reusable slider component

### BeforeAfterSlider Component
**Props:**
- `beforeImage`: string - URL of before treatment image
- `afterImage`: string - URL of after treatment image
- `beforeLabel`: string - Label for "before" (localized)
- `afterLabel`: string - Label for "after" (localized)
- `dir`: 'rtl' | 'ltr' - Text direction

**Behavior:**
- Drag handle positioned at 50% initially
- Touch & mouse support for mobile/desktop
- Smooth visual transition
- RTL compatible (handle orientation mirrors)

### CaseStudies Component
**Props:**
- `t`: translations object
- `lang`: current language

**Layout:**
- Section header with tag and title
- Grid of slider cards (responsive: 1 col mobile, 2 cols tablet, 2-4 cols desktop)
- Navigation tabs/dots for mobile swipe

## Translations to Add
Add to each language in `src/constants/translations.ts`:
```typescript
caseStudies: {
  tag: "TREATMENT RESULTS",
  title: "See the",
  accent: "Transformation",
  before: "Before",
  after: "After"
}
```

## Placement in App
Insert in `App.tsx` between `<Gallery />` and `<Testimonials />`:
```tsx
<Gallery t={currentTranslations} />
<CaseStudies t={currentTranslations} lang={lang} />
<Testimonials t={currentTranslations} />
```

## Visual Design
- Match existing card style: rounded-2xl corners, shadows
- Handle: circular button with drag icon, positioned at center
- Before/After labels: small badges on image corners
- Grayscale-to-color effect on hover (optional enhancement)

## Placeholder Images
Use Unsplash placeholders:
- ACL: knee/sports rehabilitation images
- Back Pain: spine/physiotherapy session images
- Sports Injury: athletic/ankle/shoulder images
- Post-Surgery: hospital/rehab images

## Technical Implementation Notes
- Use container with `position: relative` and `overflow: hidden`
- After image: full width
- Before image: `position: absolute`, width controlled by drag position
- Handle: `position: absolute`, follows drag position
- Event listeners: `mousedown`, `mousemove`, `mouseup` + touch equivalents

## Future Enhancements (Out of Scope)
- Patient testimonials linked to each case
- Treatment duration and details
- Uploadable admin panel for new cases
