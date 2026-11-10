import type { BriefSelection } from '../types';

/**
 * The message a visitor sends from the project brief builder. It reads as a filled-in template,
 * so they can edit any line before it goes to WhatsApp.
 */
export const buildBriefMessage = ({ projectType, features, timeline, stage }: BriefSelection): string =>
  [
    'Hi Chernor, I’d like to talk about a project.',
    '',
    `Project: ${projectType}`,
    `Needs: ${features.length ? features.join(', ') : 'To be discussed'}`,
    `Timeline: ${timeline}`,
    `Where it is now: ${stage}`,
    '',
    'A little more about it: ',
  ].join('\n');

/** WhatsApp chat link with the message ready to send. */
export const whatsappUrl = (phone: string, text: string): string =>
  `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
