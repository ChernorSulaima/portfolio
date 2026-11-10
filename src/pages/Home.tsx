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
import BriefBuilder from '../components/BriefBuilder';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import { PHONE_QUERY, useMediaQuery } from '../hooks/useMediaQuery';

const HOME_TITLE = 'Chernor Sulaiman Jalloh | Full-Stack Software Engineer';

/** One page for every screen size; phones get their own header, hero and client strip. */
const Home: React.FC = () => {
  const isPhone = useMediaQuery(PHONE_QUERY);
  const [briefMessage, setBriefMessage] = useState('');
  const [briefKey, setBriefKey] = useState(0);

  useEffect(() => {
    document.title = HOME_TITLE;
  }, []);

  const handleUseBrief = useCallback((message: string) => {
    setBriefMessage(message);
    setBriefKey((key) => key + 1);
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Clients compact={isPhone} />
        <Projects />
        <Experience />
        <About />
        <GitHubOverview />
        <Testimonials />
        <Services />
        <BriefBuilder onUseBrief={handleUseBrief} />
        <Contact initialMessage={briefMessage} briefKey={briefKey} />
      </main>
      <Footer />
    </>
  );
};

export default Home;
