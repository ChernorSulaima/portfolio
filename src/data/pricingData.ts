import type { PricingAddOn, PricingOption, TimelineOption } from '../types';

/** Contact phone for WhatsApp deep links (digits only, country code included). */
export const WHATSAPP_PHONE = '23274512941';

/** Canonical production URL on Vercel. */
export const SITE_URL = 'https://portfolio-two-amber-40.vercel.app';

export const PRICING_CURRENCY = 'USD';

/** Hard cap for individual add-on list prices. */
export const ADDON_PRICE_CAP = 150;

export const BUNDLE_DISCOUNT_PERCENT = 30;

export const PRICING_DISCLAIMER =
  'Estimates are provisional starting points for discussion. Final quotes depend on scope, design assets, integrations, and timeline. Individual add-ons are capped at $150; the Full Feature Bundle includes all add-ons at 30% off.';

/**
 * Placeholder pricing — review and adjust before treating as official rates.
 */
export const projectTypes: PricingOption[] = [
  {
    id: 'landing',
    label: 'Landing Page',
    description: 'Single-page marketing site with responsive layout and contact CTA.',
    basePrice: 800,
  },
  {
    id: 'web-app',
    label: 'Full Web App',
    description: 'Multi-page or dashboard-style product with custom UI and API wiring.',
    basePrice: 3500,
  },
  {
    id: 'mobile',
    label: 'Mobile App',
    description: 'Cross-platform mobile experience (React Native / Expo style scope).',
    basePrice: 4500,
  },
  {
    id: 'ecommerce',
    label: 'E-commerce',
    description: 'Catalog, cart, and checkout-focused storefront with admin basics.',
    basePrice: 5000,
  },
];

/** Individual add-ons — each price must stay ≤ ADDON_PRICE_CAP ($150). */
export const individualAddOns: PricingAddOn[] = [
  {
    id: 'auth',
    label: 'User Authentication',
    description: 'Sign-up, login, and protected routes.',
    price: 150,
  },
  {
    id: 'payments',
    label: 'Payment Gateway',
    description: 'Checkout integration with a payment provider.',
    price: 150,
  },
  {
    id: 'admin',
    label: 'Admin Dashboard',
    description: 'Internal tools to manage content or users.',
    price: 150,
  },
  {
    id: 'seo',
    label: 'SEO Optimization',
    description: 'Metadata, structured data, and performance polish for discovery.',
    price: 150,
  },
];

const individualAddOnSum = individualAddOns.reduce((sum, addon) => sum + addon.price, 0);

/** Full package: every individual add-on at 30% off the combined list price. */
export const fullFeatureBundle: PricingAddOn = {
  id: 'full-bundle',
  label: 'Full Feature Bundle',
  description: `Auth, payments, admin dashboard, and SEO together — ${BUNDLE_DISCOUNT_PERCENT}% off vs à la carte.`,
  price: Math.round(individualAddOnSum * (1 - BUNDLE_DISCOUNT_PERCENT / 100)),
  isBundle: true,
};

/** All selectable add-ons (bundle first, then individuals). */
export const pricingAddOns: PricingAddOn[] = [fullFeatureBundle, ...individualAddOns];

export const timelineOptions: TimelineOption[] = [
  {
    id: 'standard',
    label: 'Standard',
    description: 'Typical delivery cadence with room for iteration.',
    multiplier: 1,
  },
  {
    id: 'rush',
    label: 'Rush',
    description: 'Accelerated timeline with priority scheduling.',
    multiplier: 1.35,
  },
];

export const formatPrice = (amount: number, currency = PRICING_CURRENCY): string =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);

export const calculateQuoteTotal = (
  basePrice: number,
  addOnPrices: number[],
  multiplier: number
): { subtotal: number; total: number } => {
  const subtotal = basePrice + addOnPrices.reduce((sum, price) => sum + price, 0);
  const total = Math.round(subtotal * multiplier);
  return { subtotal, total };
};

/** Bundle replaces individuals; picking an individual clears the bundle. */
export const nextAddOnSelection = (current: string[], toggledId: string): string[] => {
  const toggled = pricingAddOns.find((a) => a.id === toggledId);
  if (!toggled) return current;

  if (toggled.isBundle) {
    return current.includes(toggledId) ? [] : [toggledId];
  }

  const withoutBundle = current.filter((id) => {
    const addon = pricingAddOns.find((a) => a.id === id);
    return !addon?.isBundle;
  });

  return withoutBundle.includes(toggledId)
    ? withoutBundle.filter((id) => id !== toggledId)
    : [...withoutBundle, toggledId];
};

export const buildQuoteMessage = (params: {
  projectTypeLabel: string;
  addOnLabels: string[];
  timelineLabel: string;
  formattedTotal: string;
}): string => {
  const addOns =
    params.addOnLabels.length > 0 ? params.addOnLabels.join(', ') : 'None';

  return [
    'Hi Chernor — I used the pricing calculator and would like a detailed quote.',
    '',
    `Project type: ${params.projectTypeLabel}`,
    `Add-ons: ${addOns}`,
    `Timeline: ${params.timelineLabel}`,
    `Estimated total: ${params.formattedTotal} (non-binding)`,
    '',
    'Additional notes:',
  ].join('\n');
};
