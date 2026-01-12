import React, { useState, useEffect } from 'react';
import { Menu, X, Moon, Sun } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navItems = ['Home', 'Experience', 'Projects', 'Contact'];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = !isMenuOpen ? 'hidden' : 'auto';
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const handleNavClick = (item: string) => {
    setIsMenuOpen(false);
    document.body.style.overflow = 'auto';
    setActiveSection(item.toLowerCase());
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ScrollSpy Implementation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    navItems.forEach((item) => {
      const element = document.getElementById(item.toLowerCase());
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-background/80 backdrop-blur-md border-b border-border/50 shadow-sm' : 'bg-transparent'
        }`}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">

        {/* Desktop Navigation - Moved to Left to balance layout */}
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            {navItems.map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase()}`}
                  className={`text-sm font-semibold tracking-wide transition-colors duration-300 hover:text-primary ${activeSection === item.toLowerCase()
                    ? 'text-primary'
                    : 'text-muted-foreground'
                    }`}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Menu Button - Left aligned on mobile */}
        <div className="md:hidden">
          <button
            className="p-2 -ml-2 rounded-full hover:bg-accent text-foreground"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Theme Toggle - Right aligned */}
        <div className="flex items-center">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-accent text-foreground transition-colors"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden fixed inset-0 bg-background/95 backdrop-blur-xl transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        style={{ top: '64px' }}
      >
        <nav className="container mx-auto px-4 py-8">
          <ul className="space-y-4">
            {navItems.map((item) => (
              <li key={item} className="border-b border-border/50 pb-4">
                <a
                  href={`#${item.toLowerCase()}`}
                  className={`text-lg font-medium transition-colors duration-300 block ${activeSection === item.toLowerCase()
                    ? 'text-primary'
                    : 'text-muted-foreground'
                    }`}
                  onClick={() => handleNavClick(item)}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;