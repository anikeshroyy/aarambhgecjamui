import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollDirection, setScrollDirection] = useState('up');
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setScrollDirection('down');
      } else {
        setScrollDirection('up');
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Events', path: '/events' },
    { name: 'Team', path: '/team' },
    { name: 'About', path: '/about' },
    { name: 'Gallery', path: '/gallery' },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: scrollDirection === 'down' ? -100 : 0 }}
      transition={{ duration: 0.3 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled 
          ? 'bg-white/80 dark:bg-dark-bg/80 backdrop-blur-md shadow-sm border-b border-gray-200 dark:border-dark-border' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-display font-bold text-gray-900 dark:text-white">
              Aarambh <span className="text-primary">3.0</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors hover:text-primary ${
                    isActive 
                      ? 'text-primary border-b-2 border-primary pb-1' 
                      : 'text-gray-700 dark:text-gray-300'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
            <div className="pl-4 border-l border-gray-300 dark:border-gray-600">
              <ThemeToggle />
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden space-x-4">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 dark:text-gray-300 focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
              className="fixed top-0 right-0 h-full w-[250px] bg-white dark:bg-dark-card shadow-xl z-50 flex flex-col py-20 px-6 md:hidden"
            >
              <nav className="flex flex-col space-y-6">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `text-lg font-medium transition-colors ${
                        isActive ? 'text-primary' : 'text-gray-900 dark:text-gray-100'
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
