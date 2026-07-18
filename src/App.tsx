import React, { Suspense, lazy, useCallback, useState } from 'react';
import Header from './components/Header';
import type { QuoteSummary } from './types';

const Hero = lazy(() => import('./components/Hero'));
const Experience = lazy(() => import('./components/Experience'));
const Projects = lazy(() => import('./components/Projects'));
const About = lazy(() => import('./components/About'));
const Skills = lazy(() => import('./components/Skills'));
const Services = lazy(() => import('./components/Services'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const PricingCalculator = lazy(() => import('./components/PricingCalculator'));
const Contact = lazy(() => import('./components/Contact'));
const GitHubOverview = lazy(() => import('./components/GitHubOverview'));
const Footer = lazy(() => import('./components/Footer'));

const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-[200px]">
    <div className="relative w-16 h-16">
      <div className="absolute top-0 left-0 w-full h-full border-4 border-primary/20 rounded-full"></div>
      <div className="absolute top-0 left-0 w-full h-full border-4 border-primary rounded-full animate-spin border-t-transparent"></div>
    </div>
  </div>
);

const App: React.FC = () => {
  const [quoteMessage, setQuoteMessage] = useState('');
  const [quoteKey, setQuoteKey] = useState(0);

  const handleRequestQuote = useCallback((_summary: QuoteSummary, message: string) => {
    setQuoteMessage(message);
    setQuoteKey((key) => key + 1);
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground overflow-x-hidden">
      <Header />
      <main className="flex-grow">
        <Suspense fallback={<LoadingSpinner />}>
          <Hero />
        </Suspense>

        <Suspense fallback={<LoadingSpinner />}>
          <Experience />
        </Suspense>

        <Suspense fallback={<LoadingSpinner />}>
          <Projects />
        </Suspense>

        <Suspense fallback={<LoadingSpinner />}>
          <About />
        </Suspense>

        <Suspense fallback={<LoadingSpinner />}>
          <Skills />
        </Suspense>

        <Suspense fallback={<LoadingSpinner />}>
          <Services />
        </Suspense>

        <Suspense fallback={<LoadingSpinner />}>
          <Testimonials />
        </Suspense>

        <Suspense fallback={<LoadingSpinner />}>
          <PricingCalculator onRequestQuote={handleRequestQuote} />
        </Suspense>

        <Suspense fallback={<LoadingSpinner />}>
          <Contact initialMessage={quoteMessage} quoteKey={quoteKey} />
        </Suspense>

        <Suspense fallback={<LoadingSpinner />}>
          <GitHubOverview />
        </Suspense>
      </main>
      <Suspense fallback={<LoadingSpinner />}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default App;
