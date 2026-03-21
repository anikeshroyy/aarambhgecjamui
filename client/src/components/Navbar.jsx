import { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiLogIn, FiUser, FiLayout, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollDirection, setScrollDirection] = useState('up');
  const [lastScrollY, setLastScrollY] = useState(0);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

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

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setProfileOpen(false);
    navigate('/');
  };

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
            <div className="pl-4 border-l border-gray-300 dark:border-gray-600 flex items-center gap-4">
              <ThemeToggle />
              {user ? (
                /* Profile Icon with Dropdown */
                <div className="relative" ref={profileRef}>
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="w-10 h-10 rounded-full bg-primary/10 border-2 border-primary/30 hover:border-primary flex items-center justify-center text-primary transition-all"
                  >
                    <FiUser className="w-5 h-5" />
                  </button>
                  <AnimatePresence>
                    {profileOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        onMouseDown={(e) => e.stopPropagation()}
                        className="absolute right-0 mt-3 w-56 bg-white dark:bg-dark-card rounded-xl shadow-xl border border-gray-200 dark:border-dark-border overflow-hidden z-50"
                      >
                        <div className="px-4 py-3 border-b border-gray-100 dark:border-dark-border">
                          <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{user.email || 'Admin'}</p>
                          <p className="text-xs text-primary font-medium capitalize">{user.role || 'admin'}</p>
                        </div>
                        <div className="py-1">
                          <button
                            onClick={() => { setProfileOpen(false); navigate('/admin/dashboard'); }}
                            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                          >
                            <FiLayout className="w-4 h-4" />
                            Dashboard
                          </button>
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
                          >
                            <FiLogOut className="w-4 h-4" />
                            Logout
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  to="/admin/login"
                  className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-primary hover:bg-yellow-600 rounded-lg transition-colors shadow-sm"
                >
                  <FiLogIn className="w-4 h-4" />
                  Login
                </Link>
              )}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden space-x-4">
            <ThemeToggle />
            {user && (
              <div className="relative" ref={!isOpen ? profileRef : undefined}>
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="w-9 h-9 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center text-primary"
                >
                  <FiUser className="w-4 h-4" />
                </button>
                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      onMouseDown={(e) => e.stopPropagation()}
                      className="absolute right-0 mt-2 w-48 bg-white dark:bg-dark-card rounded-xl shadow-xl border border-gray-200 dark:border-dark-border overflow-hidden z-50"
                    >
                      <button
                        onClick={() => { setProfileOpen(false); navigate('/admin/dashboard'); }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5"
                      >
                        <FiLayout className="w-4 h-4" />
                        Dashboard
                      </button>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10"
                      >
                        <FiLogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
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
                {!user && (
                  <Link
                    to="/admin/login"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 mt-4 px-4 py-3 text-sm font-semibold text-white bg-primary hover:bg-yellow-600 rounded-lg transition-colors text-center justify-center"
                  >
                    <FiLogIn className="w-4 h-4" />
                    Login
                  </Link>
                )}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
