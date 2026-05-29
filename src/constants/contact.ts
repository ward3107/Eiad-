/**
 * Single source of truth for the clinic's contact details.
 * Update a number/handle here and it propagates everywhere instead of
 * being duplicated across components.
 */
export const CONTACT = {
  /** Local display format, e.g. for showing on the page */
  phoneDisplay: '050-2834280',
  /** Digits only, for tel: links */
  phoneTel: '0502834280',
  /** International format, digits only, for wa.me links */
  whatsappNumber: '972502834280',
  /** Pre-built WhatsApp chat URL */
  whatsappUrl: 'https://wa.me/972502834280',
  instagram: 'https://www.instagram.com/eyad.abuaqel',
  facebook: 'https://www.facebook.com',
  /** Clinic coordinates (Abu Sinan) */
  coords: { lat: 32.9602, lng: 35.1664 },
  /** Google Maps directions deep link */
  mapsDirections: 'https://www.google.com/maps/dir/?api=1&destination=32.9602,35.1664',
} as const;
