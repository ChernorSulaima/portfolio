import { test, expect } from '@playwright/test';

test.describe('Portfolio smoke suite', () => {
  test('loads home and primary navigation anchors', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#home')).toBeVisible();

    for (const id of ['projects', 'about', 'contact']) {
      await expect(page.locator(`nav[aria-label="Primary"] a[href="#${id}"]`)).toBeVisible();
    }

    for (const id of ['experience', 'projects', 'services', 'pricing']) {
      await expect(page.locator(`footer a[href="#${id}"]`)).toBeVisible();
    }
  });

  test('phone layout uses the menu and the shorter page', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    await page.getByTestId('mobile-menu-toggle').click();
    const menu = page.locator('nav[aria-label="Primary"]');
    await expect(menu.locator('a[href="#projects"]')).toBeVisible();
    await expect(menu.locator('a[href="#contact"]')).toBeVisible();

    await menu.locator('a[href="#projects"]').click();
    await expect(menu).toBeHidden();

    // The phone page shows two projects until "View all projects" is tapped.
    await expect(page.locator('#projects article')).toHaveCount(2);
    await page.getByRole('button', { name: 'View all projects' }).click();
    await expect(page.locator('#projects article')).toHaveCount(4);

    await expect(page.locator('#pricing')).toHaveCount(0);
  });

  test('pricing calculator updates the total', async ({ page }) => {
    await page.goto('/#pricing');
    // Default: Full Web App with User Authentication.
    await expect(page.getByTestId('summary-total')).toHaveText('$3,650');

    await page.getByTestId('project-type-landing').click();
    await expect(page.getByTestId('summary-total')).toHaveText('$950');

    await page.getByTestId('addon-seo').click();
    // 800 + 150 + 150 = 1100
    await expect(page.getByTestId('summary-total')).toHaveText('$1,100');

    await page.getByTestId('timeline-rush').click();
    // 1100 * 1.35 = 1485
    await expect(page.getByTestId('summary-total')).toHaveText('$1,485');
  });

  test('full feature bundle applies 30% off and includes every add-on', async ({ page }) => {
    await page.goto('/#pricing');
    await page.getByTestId('project-type-landing').click();
    await page.getByTestId('addon-full-bundle').click();
    // Bundle: 600 * 0.7 = 420 → 800 + 420 = 1220
    await expect(page.getByTestId('summary-total')).toHaveText('$1,220');
    await expect(page.getByTestId('addon-auth')).toHaveAttribute('aria-pressed', 'true');
    await expect(page.getByTestId('addon-auth')).toBeDisabled();
    await expect(page.getByTestId('addon-auth')).toContainText('Included');
  });

  test('quote CTA prefills editable contact message', async ({ page }) => {
    await page.goto('/#pricing');
    await page.getByTestId('project-type-landing').click();
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
    // Answer wa.me locally so the test doesn't depend on the real site.
    await context.route('https://wa.me/**', (route) =>
      route.fulfill({ status: 200, contentType: 'text/html', body: '<p>WhatsApp</p>' })
    );
    await page.goto('/#contact');
    await page.locator('#contact-name').fill('Ada Lovelace');
    await page.locator('#contact-email').fill('ada@example.com');
    await page.getByTestId('contact-message').fill('Hello from tests');

    const popupPromise = context.waitForEvent('page');
    await page.getByTestId('contact-submit').click();
    const popup = await popupPromise;
    await popup.waitForURL(/wa\.me/);

    const url = popup.url();
    expect(url).toContain('https://wa.me/23274512941?text=');
    expect(decodeURIComponent(url)).toContain('Ada Lovelace');
    expect(decodeURIComponent(url)).toContain('ada@example.com');
    expect(decodeURIComponent(url)).toContain('Hello from tests');
    await popup.close();
  });

  test('theme defaults to dark and the toggle persists', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('html')).toHaveClass(/dark/);

    await page.getByTestId('theme-toggle').click();
    await expect(page.locator('html')).not.toHaveClass(/dark/);

    await page.reload();
    await expect(page.locator('html')).not.toHaveClass(/dark/);

    const stored = await page.evaluate(() => localStorage.getItem('portfolio-theme'));
    expect(stored).toBe('light');
  });

  test('resume download link resolves', async ({ page, request }) => {
    await page.goto('/');
    await expect(page.locator('#home a[href="/resume.pdf"]')).toBeVisible();
    const response = await request.get('/resume.pdf');
    expect(response.ok()).toBeTruthy();
  });

  test('case studies open from the home page and load directly', async ({ page }) => {
    await page.goto('/');
    await page.locator('#projects a[href="/work/airpay"]', { hasText: 'Read case study' }).click();
    await expect(page).toHaveURL(/\/work\/airpay$/);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Airpay');

    // Next-project card moves through the studies.
    await page.getByRole('link', { name: /Next project · 03/ }).click();
    await expect(page).toHaveURL(/\/work\/nakam-gaming$/);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Nakam Gaming Platform');

    // Deep links work (SPA fallback), and "Work" returns to the projects section.
    await page.goto('/work/sahid');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Sahid');
    await page.locator('nav[aria-label="Primary"] a', { hasText: 'Work' }).click();
    await expect(page).toHaveURL(/\/#projects$/);
    await expect(page.locator('#projects')).toBeInViewport();
  });
});
