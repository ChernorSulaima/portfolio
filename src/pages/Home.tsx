import React, { useCallback, useEffect, useState } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Clients from '../components/Clients';
import Experience from '../components/Experience';
import Projects from '../components/Projects';
import About from '../components/About';
import Services from '../components/Services';
import Testimonials from '../components/Testimonials';
import GitHubOverview from '../components/GitHubOverview';
import PricingCalculator from '../components/PricingCalculator';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import { PHONE_QUERY, useMediaQuery } from '../hooks/useMediaQuery';
import type { QuoteSummary } from '../types';

const HOME_TITLE = 'Chernor Sulaiman Jalloh | Software Engineer';

/** One page for every screen size; phones get their own header, hero and client strip. */
const Home: React.FC = () => {
  const isPhone = useMediaQuery(PHONE_QUERY);
  const [quoteMessage, setQuoteMessage] = useState('');
  const [quoteKey, setQuoteKey] = useState(0);

  useEffect(() => {
    document.title = HOME_TITLE;
  }, []);

  const handleRequestQuote = useCallback((_summary: QuoteSummary, message: string) => {
    setQuoteMessage(message);
    setQuoteKey((key) => key + 1);
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Clients compact={isPhone} />
        <Experience />
        <Projects />
        <About />
        <Services />
        <Testimonials />
        <GitHubOverview />
        <PricingCalculator onRequestQuote={handleRequestQuote} />
        <Contact initialMessage={quoteMessage} quoteKey={quoteKey} />
      </main>
      <Footer />
    </>
  );
};

export default Home;
