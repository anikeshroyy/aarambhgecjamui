import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiInstagram, FiLinkedin, FiYoutube, FiMail, FiPhone, FiTerminal, FiGlobe, FiCode } from 'react-icons/fi';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    navigation: [
      { name: 'Home', path: '/' },
      { name: 'Events', path: '/events' },
      { name: 'Team', path: '/team' },
      { name: 'About Us', path: '/about' },
      { name: 'Gallery', path: '/gallery' },
    ],
    categories: [
      { name: 'Technical', path: '/events?category=technical' },
      { name: 'Cultural', path: '/events?category=cultural' },
      { name: 'Sports', path: '/events?category=sports' },
    ],
    socials: [
      { name: 'Instagram', icon: <FiInstagram />, link: 'https://instagram.com/aarambh_gecj' },
      { name: 'LinkedIn', icon: <FiLinkedin />, link: 'https://linkedin.com/school/gecjamui' },
      { name: 'YouTube', icon: <FiYoutube />, link: '#', disabled: true },
    ]
  };

  return (
    <footer className="relative bg-white dark:bg-dark-card border-t border-gray-100 dark:border-dark-border pt-20 pb-10 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Column - 4 cols */}
          <div className="lg:col-span-4 max-w-sm">
            <Link to="/" className="inline-block group mb-6">
              <h3 className="text-3xl font-display font-black tracking-tighter text-gray-900 dark:text-white transition-transform group-hover:scale-105">
                AARAMBH<span className="text-primary"> 3.0</span>
              </h3>
            </Link>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-8">
              The flagship techno-cultural festival of Government Engineering College, Jamui. 
              Celebrating innovation, talent, and transition from theory to triumph.
            </p>
            <div className="flex gap-4">
              {footerLinks.socials.map((social, idx) => (
                <a 
                  key={idx}
                  href={social.disabled ? '#' : social.link}
                  className={`w-11 h-11 rounded-xl glass flex items-center justify-center text-lg transition-all duration-300 ${
                    social.disabled 
                      ? 'opacity-40 cursor-not-allowed text-gray-400' 
                      : 'text-gray-600 dark:text-gray-300 hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white hover:-translate-y-1 shadow-sm'
                  }`}
                  target={social.disabled ? '' : '_blank'}
                  rel="noopener noreferrer"
                  title={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Column - 2 cols */}
          <div className="lg:col-span-2 sm:col-span-1">
            <h4 className="text-sm font-black uppercase tracking-widest text-primary mb-8">Navigation</h4>
            <ul className="space-y-4">
              {footerLinks.navigation.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors font-medium flex items-center group"
                  >
                    <span className="w-0 group-hover:w-3 h-[2px] bg-primary mr-0 group-hover:mr-2 transition-all duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Category Column - 2 cols */}
          <div className="lg:col-span-2 sm:col-span-1">
            <h4 className="text-sm font-black uppercase tracking-widest text-primary mb-8">Major Fests</h4>
            <ul className="space-y-4">
              {footerLinks.categories.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors font-medium flex items-center group"
                  >
                    <span className="w-0 group-hover:w-3 h-[2px] bg-primary mr-0 group-hover:mr-2 transition-all duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column - 4 cols */}
          <div className="lg:col-span-4">
            <h4 className="text-sm font-black uppercase tracking-widest text-primary mb-8">Connectivity</h4>
            <div className="space-y-6">
              <div className="group flex items-start p-4 rounded-2xl bg-gray-50/50 dark:bg-dark-bg/40 border border-gray-100 dark:border-dark-border transition-all hover:shadow-md">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0 mr-4">
                  <FiMail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-tighter mb-1">Send an Email</p>
                  <a href="mailto:gec.jamui@gov.in" className="text-gray-700 dark:text-gray-300 font-bold hover:text-primary dark:hover:text-primary transition-colors break-all">
                    gec.jamui@gov.in
                  </a>
                </div>
              </div>

              <div className="group flex items-start p-4 rounded-2xl bg-gray-50/50 dark:bg-dark-bg/40 border border-gray-100 dark:border-dark-border transition-all hover:shadow-md">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500 shrink-0 mr-4">
                  <FiGlobe className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-tighter mb-1">Official Site</p>
                  <a href="https://gecjamui.ac.in" target="_blank" rel="noopener noreferrer" className="text-gray-700 dark:text-gray-300 font-bold hover:text-blue-500 transition-colors">
                    gecjamui.ac.in
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-gray-100 dark:border-dark-border flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
            © {currentYear} <span className="font-black text-gray-900 dark:text-white">AARAMBH</span>. GEC Jamui
          </p>
          
          <div className="flex items-center gap-2 group cursor-default">
            <div className="flex -space-x-2">
              <div className="w-7 h-7 rounded-full bg-primary/20 border-2 border-white dark:border-dark-card flex items-center justify-center text-primary">
                <FiCode className="w-4 h-4" />
              </div>
              <div className="w-7 h-7 rounded-full bg-blue-500/20 border-2 border-white dark:border-dark-card flex items-center justify-center text-blue-500">
                <FiTerminal className="w-4 h-4" />
              </div>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
              Developed by <span className="text-gray-900 dark:text-white font-bold group-hover:text-primary transition-colors">Aarambh Web Wing</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
