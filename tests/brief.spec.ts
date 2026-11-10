import { test, expect } from '@playwright/test';
import { buildBriefMessage, whatsappUrl } from '../src/lib/brief';
import { WHATSAPP_PHONE, contactInfo } from '../src/data/personalData';

test.describe('Project brief helpers', () => {
  test('writes each choice on its own line', () => {
    const message = buildBriefMessage({
      projectType: 'Mobile app',
      features: ['Payments', 'Works offline'],
      timeline: '1 to 3 months',
      stage: 'Just an idea',
    });
    expect(message.split('\n')).toEqual([
      'Hi Chernor, I’d like to talk about a project.',
      '',
      'Project: Mobile app',
      'Needs: Payments, Works offline',
      'Timeline: 1 to 3 months',
      'Where it is now: Just an idea',
      '',
      'A little more about it: ',
    ]);
  });

  test('says so when no features were picked', () => {
    const message = buildBriefMessage({ projectType: 'Website', features: [], timeline: 'Flexible', stage: 'Just an idea' });
    expect(message).toContain('Needs: To be discussed');
  });

  test('never mentions a price', () => {
    const message = buildBriefMessage({ projectType: 'Web app', features: ['Payments'], timeline: 'Flexible', stage: 'Existing product' });
    expect(message).not.toMatch(/[$£€]|\bUSD\b|price|budget/i);
  });

  test('WhatsApp link goes to the current number with the text encoded', () => {
    expect(WHATSAPP_PHONE).toBe('23234564931');
    expect(contactInfo.phoneHref).toBe('tel:+23234564931');
    const url = whatsappUrl(WHATSAPP_PHONE, 'Project: Web app\nNeeds: A & B');
    expect(url).toBe('https://wa.me/23234564931?text=Project%3A%20Web%20app%0ANeeds%3A%20A%20%26%20B');
  });
});
