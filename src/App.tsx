import { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { bioInfo } from './data/personalData';

function App() {
  useEffect(() => {
    // Update document title
    document.title = `${bioInfo.name} | ${bioInfo.title}`;
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = (e.currentTarget as HTMLAnchorElement).getAttribute('href')?.substring(1);
        if (!targetId) return;
        
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80, // Offset for header
            behavior: 'smooth'
          });
        }
      });
    });
    
    return () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', function() {});
      });
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background dark:bg-background text-foreground dark:text-foreground">
      <Header />
      <main className="flex-grow">
        <Hero />
        <About />
        <Skills />
        <Services />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;