import React, { useEffect, useMemo, useRef, useState } from 'react';
import Kicker from './ui/Kicker';
import Icon from './ui/Icon';
import Reveal from './ui/Reveal';
import { useInView } from '../hooks/useInView';
import { PHONE_QUERY, useMediaQuery } from '../hooks/useMediaQuery';

const GITHUB_USERNAME = 'ChernorSulaima';
const PROFILE_URL = `https://github.com/${GITHUB_USERNAME}`;

interface ContributionDay {
  contributionCount: number;
  date: string;
  color: string;
}

interface RepoNode {
  name: string;
  description: string | null;
  url: string;
  stargazerCount: number;
  primaryLanguage: { name: string; color: string } | null;
  isFork: boolean;
}

/** Shape of public/github-data.json (a saved GitHub GraphQL response). */
interface GitHubSnapshot {
  data: {
    user: {
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: number;
          weeks: { contributionDays: ContributionDay[] }[];
        };
      };
      repositories: { nodes: RepoNode[] };
    };
  };
}

/** Heatmap square size on phones, where the year scrolls sideways. */
const PHONE_CELL = 11;

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// GitHub's five greens, mapped onto the site accent.
const LEVEL_BY_COLOR: Record<string, number> = { '#ebedf0': 0, '#9be9a8': 1, '#40c463': 2, '#30a14e': 3, '#216e39': 4 };
const LEVEL_FILL = [
  'var(--line)',
  'color-mix(in srgb, var(--accent) 30%, transparent)',
  'color-mix(in srgb, var(--accent) 55%, transparent)',
  'color-mix(in srgb, var(--accent) 78%, transparent)',
  'var(--accent)',
];

// Repos with a live site link there instead of to the code.
const HOSTED_URLS: Record<string, string> = {
  'golden-gate-law': 'https://golden-gate-law.vercel.app',
  shopgloze: 'https://shopgloze.vercel.app',
  'bmk-gold-standard': 'https://bmkprocurement.vercel.app',
  'rollbet-arena': 'https://rollbet-arena.vercel.app',
  travel_agency: 'https://travel-agency-ten-sage.vercel.app',
};

// Personal or duplicate repos left out of the list.
const EXCLUDED_REPOS = [
  'rotroract-website',
  'Brave-pirtfolio',
  'for-rabi-heartfelt-whispers',
  'rabi-s-valentine-dream',
  'rabi',
  'intro',
  'port',
  'brave',
];

const parseDay = (date: string) => new Date(`${date}T12:00:00`);
const formatMonthYear = (date: string) =>
  parseDay(date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

const GitHubOverview: React.FC = () => {
  const isPhone = useMediaQuery(PHONE_QUERY);
  const [snapshot, setSnapshot] = useState<GitHubSnapshot | null>(null);
  const [failed, setFailed] = useState(false);
  const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null);
  const [heatmapRef, heatmapIn] = useInView<HTMLDivElement>();
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('/github-data.json')
      .then((res) => {
        if (!res.ok) throw new Error(`GitHub data ${res.status}`);
        return res.json();
      })
      .then((data: GitHubSnapshot) => {
        if (!data?.data?.user) throw new Error('Unexpected GitHub data shape');
        setSnapshot(data);
      })
      .catch(() => setFailed(true));
  }, []);

  const stats = useMemo(() => {
    if (!snapshot) return null;
    const calendar = snapshot.data.user.contributionsCollection.contributionCalendar;
    const repos = snapshot.data.user.repositories.nodes;
    const days = calendar.weeks.flatMap((w) => w.contributionDays).filter((d) => d.date);

    // Days in a row with contributions, counting back from the end of the snapshot.
    let streak = 0;
    for (let i = days.length - 1; i >= 0; i--) {
      if (days[i].contributionCount > 0) streak++;
      else if (streak > 0) break;
    }

    const langs = new Map<string, { count: number; color: string }>();
    repos
      .filter((r) => !r.isFork && r.primaryLanguage)
      .forEach((r) => {
        const lang = r.primaryLanguage!;
        const prev = langs.get(lang.name) ?? { count: 0, color: lang.color };
        langs.set(lang.name, { count: prev.count + 1, color: lang.color });
      });
    const langTotal = [...langs.values()].reduce((sum, l) => sum + l.count, 0) || 1;
    const languages = [...langs.entries()]
      .sort((a, b) => b[1].count - a[1].count)
      .slice(0, 5)
      .map(([name, { count, color }]) => ({ name, color, percentage: Math.round((count / langTotal) * 100) }));

    const recentRepos = repos
      .filter((r) => !r.isFork && !EXCLUDED_REPOS.includes(r.name))
      .sort((a, b) => Number(Boolean(HOSTED_URLS[b.name])) - Number(Boolean(HOSTED_URLS[a.name])))
      .slice(0, 4)
      .map((r) => ({
        name: r.name,
        language: r.primaryLanguage?.name ?? 'Unknown',
        languageColor: r.primaryLanguage?.color ?? '#6e7781',
        stars: r.stargazerCount,
        url: HOSTED_URLS[r.name] ?? r.url,
      }));

    // Label a column with its month when the month changes (skipping labels that would collide).
    const monthLabels: { column: number; label: string }[] = [];
    calendar.weeks.forEach((week, column) => {
      const first = week.contributionDays[0]?.date;
      if (!first) return;
      const month = parseDay(first).getMonth();
      const prevFirst = calendar.weeks[column - 1]?.contributionDays[0]?.date;
      const isNewMonth = column === 0 || (prevFirst && parseDay(prevFirst).getMonth() !== month);
      const lastLabel = monthLabels[monthLabels.length - 1];
      if (isNewMonth && (!lastLabel || column - lastLabel.column >= 3)) {
        monthLabels.push({ column, label: MONTHS[month] });
      }
    });

    return {
      total: calendar.totalContributions,
      weeks: calendar.weeks,
      range: `${formatMonthYear(days[0].date)} – ${formatMonthYear(days[days.length - 1].date)}`,
      streak,
      languages,
      recentRepos,
      monthLabels,
    };
  }, [snapshot]);

  // Open the phone strip at the most recent weeks.
  useEffect(() => {
    const el = scrollerRef.current;
    if (isPhone && stats && el) el.scrollLeft = el.scrollWidth;
  }, [isPhone, stats]);

  const header = (
    <Reveal className="flex flex-wrap items-end justify-between gap-x-12 gap-y-5">
      <div className="flex flex-col gap-[18px] max-w-[620px]">
        <Kicker>Open source</Kicker>
        <h2 className="h2-section">GitHub activity</h2>
        <p className="m-0 text-[17px] text-muted">
          {stats
            ? `A snapshot of my contributions and repositories, ${stats.range}.`
            : 'A snapshot of my contributions and repositories.'}
        </p>
      </div>
      <a href={PROFILE_URL} className="link-accent">
        View GitHub profile
        <Icon name="arrow-up-right" size={16} strokeWidth={2} />
      </a>
    </Reveal>
  );

  if (failed) {
    return (
      <section id="github" className="border-t border-line">
        <div className="pf-container section-pad flex flex-col gap-8">
          {header}
          <p className="m-0 text-[15px] text-muted">
            The contribution snapshot isn’t available right now — my GitHub profile has the latest activity.
          </p>
        </div>
      </section>
    );
  }

  const columns = stats?.weeks.length ?? 53;
  const gap = isPhone ? 2 : 3;
  // Cells grow with the card but stop at 15px so the year never gets oversized.
  const gridMaxWidth = columns * 15 + (columns - 1) * gap;
  const phoneGridWidth = columns * PHONE_CELL + (columns - 1) * gap;

  return (
    <section id="github" className="border-t border-line">
      <div className="pf-container section-pad flex flex-col gap-12">
        {header}

        {!stats ? (
          <div className="min-h-[320px] rounded-[20px] border border-line bg-surface" aria-busy="true" />
        ) : (
          <>
            <Reveal className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-px bg-line border border-line rounded-[20px] overflow-hidden">
              {[
                { icon: 'code' as const, label: 'Contributions', value: String(stats.total), note: stats.range },
                { icon: 'zap' as const, label: 'Latest streak', value: String(stats.streak), note: 'days in a row' },
                {
                  icon: 'grid' as const,
                  label: 'Top language',
                  value: stats.languages[0]?.name ?? '—',
                  note: `${stats.languages[0]?.percentage ?? 0}% of repositories`,
                },
              ].map((s) => (
                <div key={s.label} className="p-6 sm:p-7 bg-surface flex flex-col gap-1.5">
                  <span className="flex items-center gap-2.5 eyebrow">
                    <Icon name={s.icon} size={16} className="text-accent-text" />
                    {s.label}
                  </span>
                  <span className="font-heading font-bold text-[36px] leading-none tracking-[-0.03em] mt-2">{s.value}</span>
                  <span className="font-mono text-[12px] text-muted">{s.note}</span>
                </div>
              ))}
            </Reveal>

            <Reveal>
              <div className="p-5 sm:p-8 border border-line rounded-[20px] bg-surface flex flex-col gap-5">
                <div className="flex flex-wrap justify-between items-baseline gap-x-6 gap-y-1 min-h-[22px]">
                  <span className="eyebrow">Contribution activity</span>
                  {hoveredDay && (
                    <span className="font-mono text-[12px] text-muted">
                      <strong className="text-fg">{hoveredDay.contributionCount}</strong>{' '}
                      {hoveredDay.contributionCount === 1 ? 'contribution' : 'contributions'} on{' '}
                      {parseDay(hoveredDay.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  )}
                </div>

                {/* Phones: readable squares in a sideways strip, opened at the latest weeks. */}
                <div ref={scrollerRef} className={isPhone ? 'overflow-x-auto -mx-5 px-5 pb-3' : ''}>
                <div
                  ref={heatmapRef}
                  role="img"
                  aria-label={`${stats.total} GitHub contributions, ${stats.range}`}
                  className="w-full"
                  style={isPhone ? { width: phoneGridWidth } : { maxWidth: gridMaxWidth }}
                >
                  <div
                    aria-hidden="true"
                    className="grid mb-2 font-mono text-[10px] text-muted"
                    style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`, columnGap: gap }}
                  >
                    {stats.monthLabels.map((m) => (
                      <span key={m.column} className="whitespace-nowrap" style={{ gridColumnStart: m.column + 1 }}>
                        {m.label}
                      </span>
                    ))}
                  </div>
                  <div
                    className="grid"
                    style={{
                      gridTemplateRows: 'repeat(7, auto)',
                      gridAutoFlow: 'column',
                      gridAutoColumns: 'minmax(0, 1fr)',
                      gap,
                    }}
                  >
                    {stats.weeks.flatMap((week, column) =>
                      week.contributionDays.map((day) => (
                        <span
                          key={day.date}
                          className={`block aspect-square ${isPhone ? 'rounded-[2px]' : 'rounded-[3px]'} transition-opacity duration-300`}
                          style={{
                            background: LEVEL_FILL[LEVEL_BY_COLOR[day.color] ?? 0],
                            opacity: heatmapIn ? 1 : 0,
                            // The year fills in from left to right as it scrolls into view.
                            transitionDelay: heatmapIn ? `${Math.min(column * 10, 500)}ms` : '0ms',
                          }}
                          onMouseEnter={() => setHoveredDay(day)}
                          onMouseLeave={() => setHoveredDay(null)}
                        />
                      ))
                    )}
                  </div>
                </div>
                </div>

                <div aria-hidden="true" className="flex items-center gap-1.5 justify-end font-mono text-[10px] text-muted">
                  Less
                  {LEVEL_FILL.map((fill) => (
                    <span key={fill} className="w-3 h-3 rounded-[3px]" style={{ background: fill }} />
                  ))}
                  More
                </div>
              </div>
            </Reveal>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] gap-5">
              <Reveal className="p-6 sm:p-8 border border-line rounded-[20px] bg-surface flex flex-col gap-6">
                <span className="eyebrow">Top languages</span>
                <div className="flex h-2.5 rounded-full overflow-hidden gap-0.5 bg-line">
                  {stats.languages.map((lang) => (
                    <span
                      key={lang.name}
                      className="h-full transition-[width] duration-700 ease-out"
                      style={{ width: heatmapIn ? `${lang.percentage}%` : '0%', background: lang.color }}
                    />
                  ))}
                </div>
                <ul className="m-0 p-0 list-none flex flex-col gap-3">
                  {stats.languages.map((lang) => (
                    <li key={lang.name} className="flex items-center justify-between gap-4">
                      <span className="flex items-center gap-3 font-mono text-[13px] font-bold">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ background: lang.color }} />
                        {lang.name}
                      </span>
                      <span className="font-mono text-[13px] text-muted">{lang.percentage}%</span>
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={120} className="p-6 sm:p-8 border border-line rounded-[20px] bg-surface flex flex-col gap-4">
                <span className="eyebrow">Recent repositories</span>
                <ul className="m-0 p-0 list-none flex flex-col gap-3">
                  {stats.recentRepos.map((repo) => (
                    <li key={repo.name}>
                      <a
                        href={repo.url}
                        className="flex items-center justify-between gap-4 px-4 py-3.5 border border-line rounded-xl"
                      >
                        <span className="flex flex-col gap-1 min-w-0">
                          <span className="font-mono text-[14px] font-bold text-accent-text truncate">{repo.name}</span>
                          <span className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-muted">
                            <span className="w-2.5 h-2.5 rounded-full" style={{ background: repo.languageColor }} />
                            {repo.language}
                            {repo.stars > 0 && <span>· ★ {repo.stars}</span>}
                          </span>
                        </span>
                        <Icon name="arrow-up-right" size={16} strokeWidth={2} className="flex-none text-muted" />
                      </a>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default GitHubOverview;
