import React, { useCallback, useEffect, useState } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Clients from '../components/Clients';
import Experience from '../components/Experience';
import Projects from '../components/Projects';
import About from '../components/About';
import Services from '../components/Services';
import Testimonials from '../components/Testimonials';
import PricingCalculator from '../components/PricingCalculator';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import MobileHome from '../components/mobile/MobileHome';
import { PHONE_QUERY, useMediaQuery } from '../hooks/useMediaQuery';
import type { QuoteSummary } from '../types';

const HOME_TITLE = 'Chernor Sulaiman Jalloh | Software Engineer';

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

  // Phones get the shorter page from the "Home — mobile" artboard.
  if (isPhone) return <MobileHome />;

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Clients />
        <Experience />
        <Projects />
        <About />
        <Services />
        <Testimonials />
        <PricingCalculator onRequestQuote={handleRequestQuote} />
        <Contact initialMessage={quoteMessage} quoteKey={quoteKey} />
      </main>
      <Footer />
    </>
  );
};

export default Home;
