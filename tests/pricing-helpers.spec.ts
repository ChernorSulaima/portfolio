import { test, expect } from '@playwright/test';
import {
  ADDON_PRICE_CAP,
  BUNDLE_DISCOUNT_PERCENT,
  calculateQuoteTotal,
  formatPrice,
  buildQuoteMessage,
  fullFeatureBundle,
  individualAddOns,
  nextAddOnSelection,
} from '../src/data/pricingData';

test.describe('Pricing calculation helpers', () => {
  test('individual add-ons stay at or below the price cap', () => {
    for (const addon of individualAddOns) {
      expect(addon.price).toBeLessThanOrEqual(ADDON_PRICE_CAP);
    }
  });

  test('bundle is 30% off the sum of individual add-ons', () => {
    const listSum = individualAddOns.reduce((sum, a) => sum + a.price, 0);
    expect(fullFeatureBundle.price).toBe(
      Math.round(listSum * (1 - BUNDLE_DISCOUNT_PERCENT / 100))
    );
    expect(fullFeatureBundle.price).toBe(420);
  });

  test('sums base and add-ons then applies multiplier', () => {
    const { subtotal, total } = calculateQuoteTotal(3500, [150, 150], 1.35);
    expect(subtotal).toBe(3800);
    expect(total).toBe(5130);
  });

  test('formats USD without cents', () => {
    expect(formatPrice(950)).toBe('$950');
  });

  test('bundle selection clears individuals and vice versa', () => {
    expect(nextAddOnSelection(['auth'], 'full-bundle')).toEqual(['full-bundle']);
    expect(nextAddOnSelection(['full-bundle'], 'seo')).toEqual(['seo']);
    expect(nextAddOnSelection(['auth'], 'seo')).toEqual(['auth', 'seo']);
  });

  test('builds structured quote message', () => {
    const message = buildQuoteMessage({
      projectTypeLabel: 'Landing Page',
      addOnLabels: ['User Authentication'],
      timelineLabel: 'Standard',
      formattedTotal: '$950',
    });
    expect(message).toContain('Landing Page');
    expect(message).toContain('User Authentication');
    expect(message).toContain('$950 (non-binding)');
  });
});
