// Renders cv/cv.html to the PDF the site's Resume button downloads.
// Run with `npm run cv`. Set CHROMIUM_PATH if Playwright's own browser is not installed.
import { chromium } from '@playwright/test';
import { fileURLToPath } from 'node:url';

const source = fileURLToPath(new URL('../cv/cv.html', import.meta.url));
const output = fileURLToPath(new URL('../public/Chernor-Sulaiman-Jalloh-CV.pdf', import.meta.url));

const browser = await chromium.launch(
  process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {},
);
const page = await browser.newPage();
await page.goto(`file://${source}`, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);

const pageHeight = await page.evaluate(() => document.body.scrollHeight);
const a4Height = (297 / 25.4) * 96;
if (pageHeight > a4Height + 2) {
  console.warn(`The CV is ${Math.round(pageHeight - a4Height)}px taller than one A4 page and will spill onto a second.`);
}

await page.pdf({ path: output, format: 'A4', printBackground: true, margin: { top: 0, right: 0, bottom: 0, left: 0 } });
await browser.close();
console.log(`Wrote ${output}`);
