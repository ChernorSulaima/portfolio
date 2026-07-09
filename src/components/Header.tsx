import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
      <div className="container mx-auto px-4 h-14 sm:h-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#home"
          className="text-lg sm:text-xl font-extrabold font-heading tracking-tight text-foreground hover:opacity-80 transition-opacity"
        >
          Sulaiman<span className="text-primary">.</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-6 lg:space-x-8">
            {navItems.map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase()}`}
                  className={`relative text-sm font-semibold tracking-wide transition-colors duration-300 hover:text-primary py-1 ${
                    activeSection === item.toLowerCase()
                      ? 'text-primary'
                      : 'text-muted-foreground'
                  }`}
                >
                  {item}
                  {activeSection === item.toLowerCase() && (
                    <motion.span
                      className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full"
                      layoutId="activeNavIndicator"
                      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right side controls */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Theme Toggle */}
          <motion.button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-secondary/80 text-foreground transition-colors"
            aria-label="Toggle theme"
            whileTap={{ scale: 0.9, rotate: 180 }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </motion.button>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <motion.button
              className="p-2.5 rounded-full hover:bg-secondary/80 text-foreground min-w-[44px] min-h-[44px] flex items-center justify-center"
              onClick={toggleMenu}
              aria-label="Toggle menu"
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={22} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ opacity: 0, rotate: 90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: -90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={22} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden fixed inset-0 bg-background/95 backdrop-blur-xl"
            style={{ top: '56px' }}
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <nav className="container mx-auto px-4 py-6 sm:py-8">
              <ul className="space-y-1">
                {navItems.map((item, index) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + index * 0.06, type: 'spring', stiffness: 200, damping: 20 }}
                  >
                    <a
                      href={`#${item.toLowerCase()}`}
                      className={`text-xl sm:text-2xl font-bold font-heading tracking-tight transition-colors duration-300 block py-3 sm:py-4 border-b border-border/30 min-h-[48px] flex items-center ${
                        activeSection === item.toLowerCase()
                          ? 'text-primary'
                          : 'text-foreground'
                      }`}
                      onClick={() => handleNavClick(item)}
                    >
                      {activeSection === item.toLowerCase() && (
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mr-3 flex-shrink-0" />
                      )}
                      {item}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
