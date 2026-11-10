import { test, expect } from '@playwright/test';

test.describe('Portfolio smoke suite', () => {
  test('loads home and primary navigation anchors', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#home')).toBeVisible();

    for (const id of ['projects', 'about', 'contact']) {
      await expect(page.locator(`nav[aria-label="Primary"] a[href="#${id}"]`)).toBeVisible();
    }

    for (const id of ['experience', 'projects', 'services', 'github', 'brief']) {
      await expect(page.locator(`footer a[href="#${id}"]`)).toBeVisible();
    }
  });

  test('phone layout has the menu and every section', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    await page.getByTestId('mobile-menu-toggle').click();
    const menu = page.locator('nav[aria-label="Primary"]');
    for (const id of ['projects', 'experience', 'about', 'brief', 'contact']) {
      await expect(menu.locator(`a[href="#${id}"]`)).toBeVisible();
    }

    await menu.locator('a[href="#projects"]').click();
    await expect(menu).toBeHidden();

    // Nothing is hidden behind "view all" buttons on phones.
    await expect(page.locator('#projects article')).toHaveCount(4);
    await expect(page.locator('#experience [data-xp-item]')).toHaveCount(4);
    await expect(page.getByRole('button', { name: /view all|key achievements/i })).toHaveCount(0);

    for (const id of ['about', 'services', 'testimonials', 'github', 'brief', 'contact']) {
      await expect(page.locator(`#${id}`)).toHaveCount(1);
    }
    await expect(page.locator('#contact form')).toHaveCount(1);
  });

  test('experience roles open as the timeline reaches them', async ({ page }) => {
    await page.goto('/');
    const roles = page.locator('#experience [data-xp-item] .collapsible');
    await expect(roles.last()).not.toHaveClass(/is-open/);

    // Bring the last role to the middle of the screen; repeat in case fonts or images shift the layout.
    await expect
      .poll(async () => {
        await page.evaluate(() => {
          document.documentElement.style.scrollBehavior = 'auto';
          const items = document.querySelectorAll('#experience [data-xp-item]');
          const last = items[items.length - 1].getBoundingClientRect();
          window.scrollTo(0, window.scrollY + last.top - window.innerHeight * 0.5 + 40);
        });
        return roles.last().getAttribute('class');
      })
      .toMatch(/is-open/);
    // Only the role the timeline is on stays open.
    await expect(roles.first()).not.toHaveClass(/is-open/);
  });

  test('GitHub heatmap renders the snapshot', async ({ page }) => {
    await page.goto('/#github');
    const heatmap = page.locator('#github [role="img"]');
    await expect(heatmap).toHaveAttribute('aria-label', /304 GitHub contributions/);
    await expect(heatmap.locator('span.aspect-square')).toHaveCount(368);
  });

  test('hero shows the portrait and no prices appear anywhere', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#home img[alt="Portrait of Chernor Sulaiman Jalloh"]')).toBeVisible();
    await expect(page.locator('#pricing')).toHaveCount(0);
    await expect(page.locator('main')).not.toContainText('$');
  });

  test('app screenshots sit in iPhone frames and load', async ({ page }) => {
    await page.goto('/#projects');
    const phones = page.locator('#projects .iphone img');
    // Airpay and Sahid, three phones each.
    await expect(phones).toHaveCount(6);
    await phones.first().scrollIntoViewIfNeeded();
    // The browser picked one of the two saved widths and it decoded.
    await expect
      .poll(() => phones.first().evaluate((img: HTMLImageElement) => (img.complete && img.naturalWidth > 0 ? img.currentSrc : '')))
      .toMatch(/\/images\/apps\/airpay-goal-(603|1206)\.webp$/);
  });

  test('brief builder summary follows the choices', async ({ page }) => {
    await page.goto('/#brief');
    const summary = page.getByTestId('brief-summary');
    // Default: a web app, nothing picked yet.
    await expect(summary).toContainText('Web app');
    await expect(summary).toContainText('To be discussed');

    await page.getByTestId('brief-type-mobile-app').click();
    await page.getByTestId('brief-feature-payments').click();
    await page.getByTestId('brief-feature-offline').click();
    await page.getByTestId('brief-timeline-asap').click();
    await page.getByTestId('brief-stage-designs').click();

    await expect(summary).toContainText('Mobile app');
    await expect(summary).toContainText('Payments, Works offline');
    await expect(summary).toContainText('As soon as possible');
    await expect(summary).toContainText('Designs or a spec');
    await expect(page.getByTestId('brief-feature-payments')).toHaveAttribute('aria-pressed', 'true');

    // Picking a feature again takes it off.
    await page.getByTestId('brief-feature-payments').click();
    await expect(summary).not.toContainText('Payments');
  });

  test('brief becomes an editable contact message', async ({ page }) => {
    await page.goto('/#brief');
    await page.getByTestId('brief-type-store').click();
    await page.getByTestId('brief-feature-payments').click();
    await page.getByTestId('use-brief').click();

    const message = page.getByTestId('contact-message');
    await expect(message).toBeFocused();
    await expect(message).toHaveValue(/Project: Online store/);
    await expect(message).toHaveValue(/Needs: Payments/);
    await expect(message).toHaveValue(/Timeline: 1 to 3 months/);
    await expect(message).not.toHaveValue(/\$/);

    await message.fill('Custom edited message');
    await expect(message).toHaveValue('Custom edited message');
  });

  test('the new phone number is the only one on the page', async ({ page }) => {
    await page.goto('/#contact');
    await expect(page.locator('#contact a[href="tel:+23234564931"]')).toContainText('+232 34 564 931');
    await expect(page.locator('body')).not.toContainText('512 941');
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
    expect(url).toContain('https://wa.me/23234564931?text=');
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
    await expect(page.locator('#home a[href="/Chernor-Sulaiman-Jalloh-CV.pdf"]')).toBeVisible();
    const response = await request.get('/Chernor-Sulaiman-Jalloh-CV.pdf');
    expect(response.ok()).toBeTruthy();
    expect(response.headers()['content-type']).toContain('pdf');
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

    // LearnMe replaced Gloze as project 01; the old address falls back to the home page.
    await page.goto('/work/learnme');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('LearnMe');
    await page.goto('/work/gloze-skincare');
    await expect(page.locator('#home')).toBeVisible();

    // Deep links work (SPA fallback), and "Work" returns to the projects section.
    await page.goto('/work/sahid');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Sahid');
    await page.locator('nav[aria-label="Primary"] a', { hasText: 'Work' }).click();
    await expect(page).toHaveURL(/\/#projects$/);
    await expect(page.locator('#projects')).toBeInViewport();
  });
});
