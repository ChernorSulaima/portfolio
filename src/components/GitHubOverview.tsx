import React, { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Github, GitCommit, Flame, Code2, Star, ExternalLink } from 'lucide-react';

const GITHUB_USERNAME = 'ChernorSulaima';

interface ContributionDay {
  contributionCount: number;
  date: string;
  color: string;
}

interface ContributionWeek {
  contributionDays: ContributionDay[];
}

interface RepoNode {
  name: string;
  description: string | null;
  url: string;
  stargazerCount: number;
  primaryLanguage: { name: string; color: string } | null;
  isFork: boolean;
}

interface GitHubAPIResponse {
  data: {
    user: {
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: number;
          weeks: ContributionWeek[];
        };
      };
      repositories: {
        nodes: RepoNode[];
      };
    };
  };
}

const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// Map GitHub's green palette to our brand colors
const getBrandedColor = (ghColor: string, isDark: boolean): string => {
  switch (ghColor) {
    case '#ebedf0': return isDark ? 'bg-[hsl(217,33%,15%)]' : 'bg-secondary';
    case '#9be9a8': return isDark ? 'bg-primary/30' : 'bg-primary/25';
    case '#40c463': return isDark ? 'bg-primary/55' : 'bg-primary/50';
    case '#30a14e': return isDark ? 'bg-primary/75' : 'bg-primary/70';
    case '#216e39': return isDark ? 'bg-primary' : 'bg-primary/90';
    default: return isDark ? 'bg-[hsl(217,33%,15%)]' : 'bg-secondary';
  }
};

const GitHubOverview: React.FC = () => {
  const [apiData, setApiData] = useState<GitHubAPIResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDark, setIsDark] = useState(false);
  const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null);

  // Detect dark mode
  useEffect(() => {
    const checkDark = () => setIsDark(document.documentElement.classList.contains('dark'));
    checkDark();
    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    fetch('/github-data.json')
      .then(res => res.json())
      .then(data => {
        setApiData(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Compute derived data
  const { totalContributions, weeks, currentStreak, topLanguages, pinnedRepos } = useMemo(() => {
    if (!apiData) return { totalContributions: 0, weeks: [], currentStreak: 0, topLanguages: [], pinnedRepos: [] };

    const calendar = apiData.data.user.contributionsCollection.contributionCalendar;
    const repos = apiData.data.user.repositories.nodes;

    // Current streak — count backwards from today
    let streak = 0;
    const allDays = calendar.weeks.flatMap(w => w.contributionDays).filter(d => d.date);
    for (let i = allDays.length - 1; i >= 0; i--) {
      if (allDays[i].contributionCount > 0) streak++;
      else if (streak > 0) break;
    }

    // Top languages
    const langMap = new Map<string, { count: number; color: string }>();
    repos.filter(r => !r.isFork && r.primaryLanguage).forEach(repo => {
      const lang = repo.primaryLanguage!;
      const existing = langMap.get(lang.name) || { count: 0, color: lang.color };
      langMap.set(lang.name, { count: existing.count + 1, color: lang.color });
    });
    const totalLangCount = Array.from(langMap.values()).reduce((a, b) => a + b.count, 0);
    const topLangs = Array.from(langMap.entries())
      .sort((a, b) => b[1].count - a[1].count)
      .slice(0, 5)
      .map(([name, { count, color }]) => ({
        name,
        percentage: Math.round((count / totalLangCount) * 100),
        color,
      }));

    // Map repo names to hosted URLs
    const hostedUrls: Record<string, string> = {
      'golden-gate-law': 'https://golden-gate-law.vercel.app',
      'shopgloze': 'https://shopgloze.vercel.app',
      'bmk-gold-standard': 'https://bmkprocurement.vercel.app',
      'rollbet-arena': 'https://rollbet-arena.vercel.app',
      'portfolio': 'https://portfolio-two-amber-40.vercel.app',
      'travel_agency': 'https://travel-agency-ten-sage.vercel.app',
      'intro': 'https://intro-seven-roan.vercel.app',
      'port': 'https://port-lovat-three.vercel.app',
      'rabi': 'https://rabi-two.vercel.app',
    };

    // Exclude certain repos, prioritize ones with hosted URLs
    const excludeRepos = ['rotroract-website', 'Brave-pirtfolio', 'for-rabi-heartfelt-whispers', 'rabi-s-valentine-dream', 'rabi', 'intro', 'port', 'brave'];
    const pinned = repos
      .filter(r => !r.isFork && !excludeRepos.includes(r.name))
      .sort((a, b) => {
        const aHasUrl = hostedUrls[a.name] ? 1 : 0;
        const bHasUrl = hostedUrls[b.name] ? 1 : 0;
        return bHasUrl - aHasUrl;
      })
      .slice(0, 4)
      .map(repo => ({
        name: repo.name,
        description: repo.description || 'No description',
        language: repo.primaryLanguage?.name || 'Unknown',
        languageColor: repo.primaryLanguage?.color || '#6e7781',
        stars: repo.stargazerCount,
        url: hostedUrls[repo.name] || repo.url,
      }));

    return {
      totalContributions: calendar.totalContributions,
      weeks: calendar.weeks,
      currentStreak: streak,
      topLanguages: topLangs,
      pinnedRepos: pinned,
    };
  }, [apiData]);

  if (loading) {
    return (
      <section id="github" className="py-20 md:py-32 bg-background border-t border-border">
        <div className="container px-4 mx-auto max-w-6xl">
          <div className="flex items-center justify-center min-h-[300px]">
            <div className="relative w-12 h-12">
              <div className="absolute inset-0 border-4 border-primary/20 rounded-full" />
              <div className="absolute inset-0 border-4 border-primary rounded-full animate-spin border-t-transparent" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!apiData) return null;

  return (
    <section id="github" className="py-20 md:py-32 bg-background border-t border-border">
      <div className="container px-4 mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Github className="w-8 h-8 text-foreground" />
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground font-heading">
                GITHUB OVERVIEW
              </h2>
            </div>
            <p className="text-muted-foreground text-lg max-w-xl font-sans leading-relaxed">
              Live contribution data from my GitHub profile.
            </p>
          </div>
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center text-sm font-bold font-mono text-foreground hover:text-primary transition-colors uppercase tracking-wider"
          >
            View Profile <ExternalLink className="ml-2 w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="p-6 rounded-xl border border-border bg-card hover:border-primary/30 transition-colors group">
            <div className="flex items-center gap-3 mb-2">
              <GitCommit className="w-5 h-5 text-primary" />
              <span className="text-xs font-bold font-mono text-muted-foreground uppercase tracking-wider">Contributions</span>
            </div>
            <p className="text-3xl font-extrabold text-foreground font-heading group-hover:text-primary transition-colors">{totalContributions}</p>
            <p className="text-xs text-muted-foreground font-mono mt-1">past year</p>
          </div>

          <div className="p-6 rounded-xl border border-border bg-card hover:border-primary/30 transition-colors group">
            <div className="flex items-center gap-3 mb-2">
              <Flame className="w-5 h-5 text-amber-500" />
              <span className="text-xs font-bold font-mono text-muted-foreground uppercase tracking-wider">Current Streak</span>
            </div>
            <p className="text-3xl font-extrabold text-foreground font-heading group-hover:text-primary transition-colors">{currentStreak}</p>
            <p className="text-xs text-muted-foreground font-mono mt-1">days</p>
          </div>

          <div className="p-6 rounded-xl border border-border bg-card hover:border-primary/30 transition-colors col-span-2 md:col-span-1 group">
            <div className="flex items-center gap-3 mb-2">
              <Code2 className="w-5 h-5 text-primary" />
              <span className="text-xs font-bold font-mono text-muted-foreground uppercase tracking-wider">Top Language</span>
            </div>
            <p className="text-3xl font-extrabold text-foreground font-heading group-hover:text-primary transition-colors">
              {topLanguages[0]?.name || 'TypeScript'}
            </p>
            <p className="text-xs text-muted-foreground font-mono mt-1">
              {topLanguages[0]?.percentage || 0}% of repos
            </p>
          </div>
        </motion.div>

        {/* Contribution Heatmap */}
        <motion.div
          className="p-6 md:p-8 rounded-xl border border-border bg-card mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-bold font-mono text-muted-foreground uppercase tracking-wider">
              Contribution Activity
            </h3>
            {hoveredDay && (
              <span className="text-xs font-mono text-muted-foreground">
                <strong className="text-foreground">{hoveredDay.contributionCount}</strong> contribution{hoveredDay.contributionCount !== 1 ? 's' : ''} on{' '}
                {new Date(hoveredDay.date + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            )}
          </div>

          <div className="overflow-x-auto pb-2">
            {/* Month labels */}
            <div className="flex mb-2 ml-8 min-w-[720px]">
              {weeks.map((week, weekIndex) => {
                if (weekIndex % 4 === 0 && week.contributionDays[0]?.date) {
                  const month = new Date(week.contributionDays[0].date + 'T12:00:00').getMonth();
                  return (
                    <span
                      key={weekIndex}
                      className="text-[10px] font-mono text-muted-foreground"
                      style={{ width: '52px', flexShrink: 0 }}
                    >
                      {MONTH_LABELS[month]}
                    </span>
                  );
                }
                return null;
              })}
            </div>

            {/* Heatmap Grid */}
            <div className="flex gap-[3px] min-w-[720px]">
              {/* Day labels */}
              <div className="flex flex-col gap-[3px] mr-1 flex-shrink-0">
                {['', 'Mon', '', 'Wed', '', 'Fri', ''].map((day, i) => (
                  <span key={i} className="text-[10px] font-mono text-muted-foreground h-[13px] leading-[13px]">
                    {day}
                  </span>
                ))}
              </div>

              {/* Weeks */}
              {weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-[3px]">
                  {week.contributionDays.map((day, dayIndex) => (
                    <motion.div
                      key={`${weekIndex}-${dayIndex}`}
                      className={`w-[13px] h-[13px] rounded-[3px] ${getBrandedColor(day.color, isDark)} hover:ring-2 hover:ring-primary/50 transition-all cursor-default`}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: Math.min(weekIndex * 0.008, 0.4),
                        duration: 0.2,
                      }}
                      onMouseEnter={() => day.date && setHoveredDay(day)}
                      onMouseLeave={() => setHoveredDay(null)}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-2 mt-4 justify-end">
            <span className="text-[10px] font-mono text-muted-foreground">Less</span>
            {['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'].map((color) => (
              <div
                key={color}
                className={`w-[13px] h-[13px] rounded-[3px] ${getBrandedColor(color, isDark)}`}
              />
            ))}
            <span className="text-[10px] font-mono text-muted-foreground">More</span>
          </div>
        </motion.div>

        {/* Bottom Grid: Languages + Pinned Repos */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Top Languages */}
          <motion.div
            className="p-6 md:p-8 rounded-xl border border-border bg-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <h3 className="text-sm font-bold font-mono text-muted-foreground uppercase tracking-wider mb-6">
              Top Languages
            </h3>

            {/* Language bar */}
            <div className="flex h-3 rounded-full overflow-hidden mb-6 gap-0.5">
              {topLanguages.map((lang) => (
                <motion.div
                  key={lang.name}
                  className="h-full first:rounded-l-full last:rounded-r-full"
                  style={{ backgroundColor: lang.color }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${lang.percentage}%` }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
                />
              ))}
            </div>

            {/* Language list */}
            <div className="space-y-3">
              {topLanguages.map((lang) => (
                <div key={lang.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: lang.color }} />
                    <span className="text-sm font-bold font-mono text-foreground">{lang.name}</span>
                  </div>
                  <span className="text-sm font-mono text-muted-foreground">{lang.percentage}%</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Pinned Repos */}
          <motion.div
            className="p-6 md:p-8 rounded-xl border border-border bg-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <h3 className="text-sm font-bold font-mono text-muted-foreground uppercase tracking-wider mb-6">
              Recent Repositories
            </h3>

            <div className="space-y-3">
              {pinnedRepos.map((repo) => (
                <a
                  key={repo.name}
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block p-4 rounded-lg border border-border hover:border-primary/30 hover:bg-secondary/30 transition-all"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sm text-primary font-mono group-hover:underline">
                      {repo.name}
                    </span>
                    {repo.stars > 0 && (
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Star className="w-3.5 h-3.5" />
                        <span className="text-xs font-mono">{repo.stars}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: repo.languageColor }} />
                    <span className="text-[11px] font-bold font-mono text-foreground/60 uppercase tracking-wider">
                      {repo.language}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GitHubOverview;
