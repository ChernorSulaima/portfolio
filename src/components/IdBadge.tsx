import React, { useId, useLayoutEffect, useRef } from 'react';
import Icon from './ui/Icon';
import { PROFILE_PHOTO } from '../data/personalData';

interface IdBadgeProps {
  /** Phone layout: thinner lanyard and "swipe" wording. */
  compact?: boolean;
  className?: string;
}

interface BadgeState {
  s: number;
  L: number;
  ax: number;
  ay: number;
  px: number;
  py: number;
  ox: number;
  oy: number;
  th: number;
  om: number;
  vxPrev: number;
  drag: boolean;
  gx: number;
  gy: number;
  tx: number;
  ty: number;
  raf: number;
  last: number;
  acc: number;
}

const CARD_WIDTH = 280;
/** Physics runs in fixed steps so uneven frame times can't jolt the swing. */
const STEP = 1 / 240;
/** Fastest the card can be thrown, in px per second. */
const MAX_THROW_SPEED = 840;
/** Card size relative to its 280px design width. */
const SCALE_BESIDE_TEXT = 1.25;
const SCALE_BELOW_TEXT = 1.2;
const SCALE_PHONE = 0.92;
/** Space kept under the card for the "Grab the badge" hint. */
const HINT_SPACE = 64;

/**
 * ID badge on a lanyard. The card is a pendulum on a rope (Verlet integration for the
 * clip point plus a damped angle for the card), which can be grabbed and thrown.
 */
const IdBadge: React.FC<IdBadgeProps> = ({ compact = false, className = '' }) => {
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const hookRef = useRef<HTMLSpanElement>(null);
  const strapRef = useRef<SVGPathElement>(null);
  const strapId = `badge-strap-${useId().replace(/:/g, '')}`;

  // Layout effect: the card is placed and sized before the first paint, so it never jumps.
  useLayoutEffect(() => {
    const stage = stageRef.current;
    const card = cardRef.current;
    const hook = hookRef.current;
    const strap = strapRef.current;
    if (!stage || !card || !hook || !strap) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const section = stage.closest('section') ?? stage;
    const b: BadgeState = {
      s: 1, L: 170, ax: stage.clientWidth / 2, ay: -150, px: 0, py: 0, ox: 0, oy: 0, th: 0, om: 0,
      vxPrev: 0, drag: false, gx: 0, gy: 0, tx: 0, ty: 0, raf: 0, last: 0, acc: 0,
    };
    let alive = true;

    // Beside the hero text on wide screens, the lanyard hangs from the top of the hero.
    // Otherwise (below the text, or on phones) it hangs from the hook at the top of the stage.
    const layout = () => {
      const sr = stage.getBoundingClientRect();
      const hr = section.getBoundingClientRect();
      const besideText = window.innerWidth >= 1024 && sr.top - hr.top < 240;
      const prevScale = b.s;
      const prevAx = b.ax;
      const prevAy = b.ay;
      const prevL = b.L;

      if (besideText) {
        b.s = SCALE_BESIDE_TEXT;
        b.ay = hr.top - sr.top - 6;
        b.L = Math.max(60, 20 - b.ay);
      } else {
        b.s = window.innerWidth < 600 ? SCALE_PHONE : SCALE_BELOW_TEXT;
        b.ay = 6;
        b.L = 64;
      }
      b.ax = stage.clientWidth / 2;

      // Carry the card along when its anchor moves (resize, fonts loading). Moving the current and
      // previous positions together keeps its velocity, so the jump isn't read as a throw.
      const shiftX = b.ax - prevAx;
      const shiftY = b.ay - prevAy + (b.L - prevL);
      b.px += shiftX;
      b.ox += shiftX;
      b.tx += shiftX;
      b.py += shiftY;
      b.oy += shiftY;
      b.ty += shiftY;

      hook.style.display = besideText ? 'none' : 'block';
      stage.style.height = `${Math.ceil(b.ay + b.L + card.offsetHeight * b.s + HINT_SPACE)}px`;

      // The card is its own compositing layer (cheap to move). Re-create it when its size
      // changes so the text is redrawn sharp at the new scale instead of stretched.
      if (b.s !== prevScale) {
        card.style.willChange = 'auto';
        requestAnimationFrame(() => {
          if (alive) card.style.willChange = 'transform';
        });
      }
    };

    const draw = () => {
      card.style.transform = `translate(${(b.px - CARD_WIDTH / 2).toFixed(2)}px, ${b.py.toFixed(2)}px) rotate(${b.th.toFixed(4)}rad) scale(${b.s})`;
      const dx = b.px - b.ax;
      const dy = b.py - b.ay;
      const d = Math.hypot(dx, dy);
      let path = `M ${b.ax.toFixed(1)} ${b.ay.toFixed(1)} `;
      if (d < b.L - 0.5) {
        const sag = Math.sqrt(b.L * b.L - d * d) * 0.55;
        path += `Q ${((b.ax + b.px) / 2).toFixed(1)} ${((b.ay + b.py) / 2 + sag).toFixed(1)} `;
      } else {
        path += 'L ';
      }
      path += `${b.px.toFixed(1)} ${b.py.toFixed(1)}`;
      strap.setAttribute('d', path);
    };

    const step = (dt: number) => {
      const G = 2400;
      const prevX = b.px;
      const prevY = b.py;
      if (b.drag) {
        const k = 1 - Math.pow(0.0005, dt);
        b.px += (b.tx - b.px) * k;
        b.py += (b.ty - b.py) * k;
      } else {
        const damp = Math.pow(0.978, dt * 60);
        b.px += (b.px - b.ox) * damp;
        b.py += (b.py - b.oy) * damp + G * dt * dt;
      }
      b.ox = prevX;
      b.oy = prevY;
      let dx = b.px - b.ax;
      let dy = b.py - b.ay;
      let d = Math.hypot(dx, dy) || 1;
      if (d > b.L) {
        b.px = b.ax + (dx / d) * b.L;
        b.py = b.ay + (dy / d) * b.L;
      }
      dx = b.px - b.ax;
      dy = b.py - b.ay;
      d = Math.hypot(dx, dy) || 1;
      const vx = (b.px - b.ox) / dt;
      const axc = Math.max(-6000, Math.min(6000, (vx - b.vxPrev) / dt));
      b.vxPrev = vx;
      const phi = -Math.atan2(dx, dy);
      const Lc = 190;
      b.om += ((-G * Math.sin(b.th) + axc * Math.cos(b.th)) / Lc + (phi - b.th) * 18) * dt;
      b.om *= Math.exp(-3.4 * dt);
      b.th += b.om * dt;
      if (b.th > 1.3) {
        b.th = 1.3;
        b.om = 0;
      } else if (b.th < -1.3) {
        b.th = -1.3;
        b.om = 0;
      }
      const speed = Math.hypot(b.px - b.ox, b.py - b.oy) / dt;
      if (
        !b.drag &&
        speed < 4 &&
        Math.abs(b.om) < 0.02 &&
        Math.abs(b.th) < 0.004 &&
        Math.abs(dx) < 0.6 &&
        Math.abs(d - b.L) < 0.6
      ) {
        b.px = b.ax;
        b.py = b.ay + b.L;
        b.ox = b.px;
        b.oy = b.py;
        b.th = 0;
        b.om = 0;
        b.vxPrev = 0;
        return false;
      }
      return true;
    };

    const kick = () => {
      if (b.raf) return;
      b.last = performance.now();
      b.acc = 0;
      const tick = (t: number) => {
        b.raf = 0;
        if (!alive) return;
        // Cap a long gap (e.g. a background tab) so the card doesn't fast-forward.
        b.acc += Math.min(0.1, Math.max(0, (t - b.last) / 1000));
        b.last = t;
        let moving = true;
        while (b.acc >= STEP) {
          b.acc -= STEP;
          moving = step(STEP);
          if (!moving) {
            b.acc = 0;
            break;
          }
        }
        draw();
        if (moving) b.raf = requestAnimationFrame(tick);
      };
      b.raf = requestAnimationFrame(tick);
    };

    layout();
    b.px = b.ax + (reduce ? 0 : 60 * b.s);
    b.py = b.ay + b.L - (reduce ? 0 : 20);
    b.ox = b.px;
    b.oy = b.py;
    b.th = reduce ? 0 : -0.2;

    const toLocal = (e: PointerEvent) => {
      const r = stage.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const onDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      const p = toLocal(e);
      b.drag = true;
      b.gx = p.x - b.px;
      b.gy = p.y - b.py;
      b.tx = b.px;
      b.ty = b.py;
      card.style.cursor = 'grabbing';
      try {
        card.setPointerCapture(e.pointerId);
      } catch {
        // Capture can fail if the pointer is already gone; dragging still works via window events.
      }
      e.preventDefault();
      kick();
    };
    const onMove = (e: PointerEvent) => {
      if (!b.drag) return;
      const p = toLocal(e);
      b.tx = p.x - b.gx;
      b.ty = p.y - b.gy;
    };
    const onUp = () => {
      if (!b.drag) return;
      b.drag = false;
      card.style.cursor = 'grab';
      const vx = b.px - b.ox;
      const vy = b.py - b.oy;
      const v = Math.hypot(vx, vy);
      const maxV = MAX_THROW_SPEED * STEP;
      if (v > maxV) {
        b.ox = b.px - (vx / v) * maxV;
        b.oy = b.py - (vy / v) * maxV;
      }
      kick();
    };
    const onResize = () => {
      layout();
      draw();
      kick();
    };
    const noDrag = (e: Event) => e.preventDefault();

    const ro = new ResizeObserver(onResize);
    ro.observe(section);
    ro.observe(stage);
    document.fonts?.ready.then(() => {
      if (alive) onResize();
    });
    card.addEventListener('dragstart', noDrag);
    card.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
    window.addEventListener('resize', onResize);
    draw();
    if (!reduce) kick();

    return () => {
      alive = false;
      card.removeEventListener('dragstart', noDrag);
      card.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
      window.removeEventListener('resize', onResize);
      ro.disconnect();
      if (b.raf) cancelAnimationFrame(b.raf);
    };
  }, []);

  const strapText = compact
    ? { size: 7.5, spacing: 2.2, dy: 2.6, offset: 4, repeat: 6, outer: 18, inner: 14 }
    : { size: 8.5, spacing: 2.5, dy: 3, offset: 6, repeat: 8, outer: 20, inner: 16 };

  return (
    <div
      ref={stageRef}
      role="group"
      aria-label={`ID badge for Chernor Sulaiman Jalloh hanging on a lanyard. ${
        compact ? 'Swipe sideways to swing it.' : 'Drag it to swing it.'
      }`}
      className={`relative ${className}`}
    >
      <div
        aria-hidden="true"
        className={`absolute rounded-full ${
          compact ? 'left-[6%] right-[6%] top-[18%] h-[62%]' : 'left-[10%] right-[10%] top-[22%] h-[60%]'
        }`}
        style={{ background: 'radial-gradient(closest-side, rgba(59, 130, 246, 0.22), transparent)' }}
      />
      {/* Hook the lanyard hangs from when it can't reach the top of the hero (shown from the layout code). */}
      <span
        ref={hookRef}
        aria-hidden="true"
        className="absolute z-[3] -top-0.5 left-1/2 w-14 h-4 -ml-7 rounded-lg bg-line-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
      >
        <span className="absolute left-1/2 top-1 w-2 h-2 -ml-1 rounded-full bg-[#94A3B8]" />
      </span>
      <svg
        aria-hidden="true"
        width="100%"
        height="100%"
        className="absolute inset-0 overflow-visible pointer-events-none"
        style={{ willChange: 'transform' }}
      >
        <defs>
          <path ref={strapRef} id={strapId} d="M 220 -150 L 220 20" fill="none" />
        </defs>
        <use href={`#${strapId}`} stroke="#1E3A8A" strokeWidth={strapText.outer} strokeLinecap="round" fill="none" />
        <use href={`#${strapId}`} stroke="#2563EB" strokeWidth={strapText.inner} fill="none" />
        <text
          fontFamily="JetBrains Mono, monospace"
          fontSize={strapText.size}
          fontWeight={700}
          letterSpacing={strapText.spacing}
          fill="#FFFFFF"
          fillOpacity={0.9}
          dy={strapText.dy}
        >
          <textPath href={`#${strapId}`} startOffset={strapText.offset}>
            {Array(strapText.repeat).fill('SULAIMAN.').join(' · ')}
          </textPath>
        </text>
      </svg>

      <div
        ref={cardRef}
        className="absolute left-0 top-0 z-[2] cursor-grab select-none touch-pan-y"
        style={{ width: CARD_WIDTH, transformOrigin: '50% 0', willChange: 'transform' }}
      >
        {/* Clip */}
        <div
          aria-hidden="true"
          className="relative w-[26px] h-[30px] mx-auto rounded-[7px_7px_5px_5px] shadow-[inset_0_-2px_0_rgba(15,23,42,0.35),0_4px_10px_rgba(2,6,23,0.4)]"
          style={{ background: 'linear-gradient(180deg, #F1F5F9, #94A3B8)' }}
        >
          <span className="absolute left-[7px] right-[7px] top-1.5 h-1.5 rounded-[3px] bg-[#475569]" />
        </div>
        <div
          aria-hidden="true"
          className="w-4 h-3.5 -mt-[3px] mx-auto box-border border-[3px] border-t-0 border-[#CBD5E1] rounded-[0_0_10px_10px]"
        />
        <article
          className="relative -mt-1.5 px-5 pt-4 pb-5 rounded-[20px] border border-[#2A3850] text-[#F1F5F9] flex flex-col gap-3.5 shadow-[0_50px_90px_-30px_rgba(2,6,23,0.85),inset_0_1px_0_rgba(255,255,255,0.06)]"
          style={{ background: 'linear-gradient(160deg, #1A2642 0%, #0F172A 55%, #0B1120 100%)' }}
        >
          <span
            aria-hidden="true"
            className="self-center w-14 h-[9px] rounded-[5px] bg-[#070B16] shadow-[inset_0_1px_2px_rgba(0,0,0,0.7)]"
          />
          <div className="flex justify-between items-center">
            <span className="font-heading font-extrabold text-[18px] tracking-[-0.02em]">
              Sulaiman<span className="text-[#3B82F6]">.</span>
            </span>
            <span className="font-mono text-[10px] font-bold tracking-[0.14em] text-[#94A3B8]">ENGINEER · 2026</span>
          </div>
          <div
            className="relative aspect-[6/5] rounded-[14px] overflow-hidden border border-[#2A3850]"
            style={{ background: `#3A3F47 url(${PROFILE_PHOTO}) 50% 22% / cover no-repeat` }}
          >
            <img
              src={PROFILE_PHOTO}
              alt="Portrait of Chernor Sulaiman Jalloh"
              draggable={false}
              className="block w-full h-full object-cover object-[50%_22%]"
            />
            <span className="absolute left-2.5 bottom-2.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[rgba(11,17,32,0.78)] font-mono text-[10px] font-bold tracking-[0.12em] text-[#E2E8F0]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
              AVAILABLE
            </span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="font-heading font-bold text-[22px] leading-[1.15] tracking-[-0.02em]">
              Chernor Sulaiman Jalloh
            </span>
            <span className="text-[13px] text-[#94A3B8]">Full-Stack Software Engineer</span>
          </div>
          <dl className="m-0 grid grid-cols-2 gap-2.5 pt-3 border-t border-[#1E293B] text-[12px] leading-[1.4]">
            <div>
              <dt className="font-mono text-[9px] font-bold tracking-[0.14em] uppercase text-[#94A3B8]">Based in</dt>
              <dd className="mt-[3px] font-semibold">Freetown, SL</dd>
            </div>
            <div>
              <dt className="font-mono text-[9px] font-bold tracking-[0.14em] uppercase text-[#94A3B8]">Currently</dt>
              <dd className="mt-[3px] font-semibold">Altruistech</dd>
            </div>
          </dl>
          <div aria-hidden="true" className="flex items-center gap-3">
            <span
              className="flex-1 h-6 rounded-[3px] opacity-80"
              style={{
                background:
                  'repeating-linear-gradient(90deg, #E2E8F0 0 2px, transparent 2px 4px, #E2E8F0 4px 5px, transparent 5px 8px, #E2E8F0 8px 11px, transparent 11px 13px)',
              }}
            />
            <span className="font-mono text-[10px] text-[#94A3B8]">CSJ · FT</span>
          </div>
        </article>
      </div>

      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 flex justify-center items-center gap-2 font-mono text-[11px] tracking-[0.08em] text-muted"
      >
        <Icon name="grab" size={14} strokeWidth={2} />
        {compact ? 'Swipe the badge' : 'Grab the badge'}
      </span>
    </div>
  );
};

export default IdBadge;
