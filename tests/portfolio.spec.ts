import { test, expect } from '@playwright/test';

test.describe('Portfolio smoke suite', () => {
  test('loads minimalist home page, bio, and sections in order', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#home')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Chernor Sulaiman Jalloh' })).toBeVisible();
    await expect(page.locator('#about')).toContainText('Forward Deployed Engineering');
    await expect(page.locator('#about')).toContainText('System Design Architect');

    for (const id of ['about', 'projects', 'field-notes', 'experience', 'contact', 'github']) {
      await expect(page.locator(`#${id}`)).toBeVisible();
    }

    // Verify Connect (#contact) comes before GitHub Contributions (#github)
    const contactTop = await page.locator('#contact').evaluate((el) => el.getBoundingClientRect().top);
    const githubTop = await page.locator('#github').evaluate((el) => el.getBoundingClientRect().top);
    expect(contactTop).toBeLessThan(githubTop);
  });

  test('inline architecture toggles expand and collapse on projects', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#projects article')).toHaveCount(4);

    const airpayToggle = page.getByTestId('arch-toggle-airpay');
    await expect(airpayToggle).toHaveAttribute('aria-expanded', 'true');
    await airpayToggle.click();
    await expect(airpayToggle).toHaveAttribute('aria-expanded', 'false');

    const glozeToggle = page.getByTestId('arch-toggle-gloze-skincare');
    await expect(glozeToggle).toHaveAttribute('aria-expanded', 'false');
    await glozeToggle.click();
    await expect(glozeToggle).toHaveAttribute('aria-expanded', 'true');
  });

  test('GitHub heatmap renders the latest 576 contributions snapshot', async ({ page }) => {
    await page.goto('/#github');
    const heatmap = page.locator('#github [role="img"]');
    await expect(heatmap).toHaveAttribute('aria-label', /576 GitHub contributions/);
  });

  test('Hire Me modal opens and pricing calculator updates the total', async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('hire-me-top').click();
    await expect(page.getByTestId('hire-drawer')).toBeVisible();

    // Default: Full Web App with User Authentication ($3,500 + $150 = $3,650)
    await expect(page.getByTestId('summary-total')).toHaveText('$3,650');

    await page.getByTestId('project-type-landing').click();
    await expect(page.getByTestId('summary-total')).toHaveText('$950');

    await page.getByTestId('addon-seo').click();
    await expect(page.getByTestId('summary-total')).toHaveText('$1,100');

    await page.getByTestId('timeline-rush').click();
    await expect(page.getByTestId('summary-total')).toHaveText('$1,485');
  });

  test('full feature bundle applies 30% off and includes every add-on', async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('hire-me-hero').click();
    await page.getByTestId('project-type-landing').click();
    await page.getByTestId('addon-full-bundle').click();

    await expect(page.getByTestId('summary-total')).toHaveText('$1,220');
    await expect(page.getByTestId('addon-auth')).toHaveAttribute('aria-pressed', 'true');
    await expect(page.getByTestId('addon-auth')).toBeDisabled();
    await expect(page.getByTestId('addon-auth')).toContainText('Included');

    const waHref = await page.getByTestId('send-whatsapp-quote').getAttribute('href');
    expect(waHref).toContain('https://wa.me/23274512941?text=');
    expect(decodeURIComponent(waHref ?? '')).toContain('Landing Page');
    expect(decodeURIComponent(waHref ?? '')).toContain('$1,220');
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
    await page.locator('#projects a[href="/work/airpay"]', { hasText: 'Case Study' }).click();
    await expect(page).toHaveURL(/\/work\/airpay$/);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Airpay');

    await page.getByRole('link', { name: /Next project · 03/ }).click();
    await expect(page).toHaveURL(/\/work\/nakam-gaming$/);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Nakam Gaming Platform');

    await page.goto('/work/sahid');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Sahid');
  });
});
