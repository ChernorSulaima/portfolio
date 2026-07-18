import { test, expect } from '@playwright/test';

test.describe('Portfolio smoke suite', () => {
  test('loads home and primary navigation anchors', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#home')).toBeVisible();

    for (const id of ['experience', 'projects', 'about', 'services', 'pricing', 'contact']) {
      await expect(page.locator(`nav[aria-label="Primary"] a[href="#${id}"]`)).toBeVisible();
    }

    await expect(page.locator('footer a[href="#skills"]')).toBeVisible();
    await expect(page.locator('footer a[href="#testimonials"]')).toBeVisible();
    await expect(page.locator('footer a[href="#github"]')).toBeVisible();
  });

  test('mobile menu opens and includes Pricing', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    await page.getByTestId('mobile-menu-toggle').click();
    await expect(page.locator('nav[aria-label="Mobile"] a[href="#pricing"]')).toBeVisible();
  });

  test('pricing calculator updates total and resets', async ({ page }) => {
    await page.goto('/#pricing');
    await expect(page.getByTestId('summary-total')).toHaveText('$800');

    await page.getByTestId('project-type-web-app').click();
    await expect(page.getByTestId('summary-total')).toHaveText('$3,500');

    await page.getByTestId('addon-auth').click();
    await page.getByTestId('addon-seo').click();
    // 3500 + 150 + 150 = 3800
    await expect(page.getByTestId('summary-total')).toHaveText('$3,800');

    await page.getByTestId('timeline-rush').click();
    // 3800 * 1.35 = 5130
    await expect(page.getByTestId('summary-total')).toHaveText('$5,130');

    await page.getByTestId('reset-quote').click();
    await expect(page.getByTestId('summary-total')).toHaveText('$800');
  });

  test('full feature bundle applies 30% off and replaces individuals', async ({ page }) => {
    await page.goto('/#pricing');
    await page.getByTestId('project-type-landing').click();
    await page.getByTestId('addon-auth').click();
    await page.getByTestId('addon-full-bundle').click();
    // Bundle alone: 600 * 0.7 = 420 → 800 + 420 = 1220
    await expect(page.getByTestId('summary-total')).toHaveText('$1,220');
    await expect(page.getByTestId('addon-auth')).toHaveAttribute('aria-pressed', 'false');
  });

  test('quote CTA prefills editable contact message', async ({ page }) => {
    await page.goto('/#pricing');
    await page.getByTestId('project-type-landing').click();
    await page.getByTestId('addon-auth').click();
    await page.getByTestId('request-quote').click();

    const message = page.getByTestId('contact-message');
    await expect(message).toBeFocused();
    await expect(message).toContainText('Landing Page');
    await expect(message).toContainText('User Authentication');
    await expect(message).toContainText('$950');

    await message.fill('Custom edited message');
    await expect(message).toHaveValue('Custom edited message');
  });

  test('contact submit opens encoded WhatsApp URL', async ({ page, context }) => {
    await page.goto('/#contact');
    await page.locator('#contact-name').fill('Ada Lovelace');
    await page.locator('#contact-email').fill('ada@example.com');
    await page.getByTestId('contact-message').fill('Hello from tests');

    const popupPromise = context.waitForEvent('page');
    await page.getByTestId('contact-submit').click();
    const popup = await popupPromise;
    await popup.waitForLoadState('domcontentloaded');

    const url = popup.url();
    expect(url).toContain('https://wa.me/23274512941?text=');
    expect(decodeURIComponent(url)).toContain('Ada Lovelace');
    expect(decodeURIComponent(url)).toContain('ada@example.com');
    expect(decodeURIComponent(url)).toContain('Hello from tests');
    await popup.close();
  });

  test('theme toggle persists preference', async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('theme-toggle').click();
    await expect(page.locator('html')).toHaveClass(/dark/);

    await page.reload();
    await expect(page.locator('html')).toHaveClass(/dark/);

    const stored = await page.evaluate(() => localStorage.getItem('portfolio-theme'));
    expect(stored).toBe('dark');
  });

  test('resume download link resolves', async ({ page, request }) => {
    await page.goto('/');
    const resumeLink = page.locator('a[href="/resume.pdf"]');
    await expect(resumeLink).toBeVisible();
    const response = await request.get('/resume.pdf');
    expect(response.ok()).toBeTruthy();
  });
});
