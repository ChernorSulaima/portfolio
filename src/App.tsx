import React, { Suspense, lazy, useLayoutEffect, useRef } from 'react';
import Home from './pages/Home';
import { scrollToHash, usePathname } from './lib/router';

const CASE_STUDIES: Record<string, React.LazyExoticComponent<React.FC>> = {
  '/work/gloze-skincare': lazy(() => import('./pages/case-studies/GlozeCaseStudy')),
  '/work/airpay': lazy(() => import('./pages/case-studies/AirpayCaseStudy')),
  '/work/nakam-gaming': lazy(() => import('./pages/case-studies/NakamCaseStudy')),
  '/work/sahid': lazy(() => import('./pages/case-studies/SahidCaseStudy')),
};

const App: React.FC = () => {
  const pathname = usePathname().replace(/\/+$/, '') || '/';
  const CaseStudy = CASE_STUDIES[pathname];
  const firstRender = useRef(true);

  // New page: jump to the requested section (e.g. "/#contact" from a case study), otherwise to the top.
  // On the first render, leave the browser's own scroll restoration alone unless there is a hash.
  useLayoutEffect(() => {
    const isFirst = firstRender.current;
    firstRender.current = false;
    if (!scrollToHash(window.location.hash) && !isFirst) window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-bg text-fg overflow-x-clip">
      {CaseStudy ? (
        <Suspense fallback={<div className="min-h-screen" />}>
          <CaseStudy />
        </Suspense>
      ) : (
        <Home />
      )}
    </div>
  );
};

export default App;
