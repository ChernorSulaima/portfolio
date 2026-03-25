import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Moon, Sun } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const lastScrollY = useRef(0);

  const navItems = ['Home', 'Experience', 'Projects', 'About', 'Services', 'Contact'];

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
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 50);

      // Hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
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
      { threshold: 0.3 }
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
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        hidden && !isMenuOpen ? '-translate-y-full' : 'translate-y-0'
      } ${
        scrolled
          ? 'bg-background/60 backdrop-blur-xl border-b border-border/30 shadow-[0_4px_30px_rgba(0,0,0,0.05)]'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#home"
          className="text-xl font-extrabold font-heading tracking-tight text-foreground hover:opacity-80 transition-opacity"
        >
          Sulaiman<span className="text-primary">.</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            {navItems.map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase()}`}
                  className={`relative text-sm font-semibold tracking-wide transition-colors duration-300 hover:text-primary ${
                    activeSection === item.toLowerCase()
                      ? 'text-primary'
                      : 'text-muted-foreground'
                  }`}
                >
                  {item}
                  {activeSection === item.toLowerCase() && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full" />
                  )}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right side controls */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-secondary/80 text-foreground transition-colors"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              className="p-2 rounded-full hover:bg-secondary/80 text-foreground"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden fixed inset-0 bg-background/95 backdrop-blur-xl transition-all duration-500 ease-out ${
          isMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'
        }`}
        style={{ top: '64px' }}
      >
        <nav className="container mx-auto px-4 py-8">
          <ul className="space-y-1">
            {navItems.map((item, index) => (
              <li
                key={item}
                className="overflow-hidden"
                style={{
                  transform: isMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                  opacity: isMenuOpen ? 1 : 0,
                  transition: `all 0.4s ease ${index * 0.05}s`,
                }}
              >
                <a
                  href={`#${item.toLowerCase()}`}
                  className={`text-2xl font-bold font-heading tracking-tight transition-colors duration-300 block py-4 border-b border-border/30 ${
                    activeSection === item.toLowerCase()
                      ? 'text-primary'
                      : 'text-foreground'
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
