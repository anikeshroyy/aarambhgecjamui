import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import CountdownTimer from '../../components/CountdownTimer';
import SectionHeading from '../../components/SectionHeading';
import eventsService from '../../services/eventsService';
import sponsorsService from '../../services/sponsorsService';
// We'll scaffold EventCard soon, importing it here ahead of time
// import EventCard from '../../components/EventCard';

const Home = () => {
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [sponsors, setSponsors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventsData, sponsorsData] = await Promise.all([
          eventsService.getAll(),
          sponsorsService.getAll()
        ]);
        
        setFeaturedEvents(eventsData.slice(0, 3));
        setSponsors(sponsorsData);
      } catch (error) {
        console.error('Failed to fetch home data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col min-h-screen"
    >
      {/* Hero Section */}
      <section className="relative h-screen flex border-black items-center justify-center overflow-hidden bg-gray-900 bg-center bg-cover bg-no-repeat bg-fixed object-cover" 
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')` }}>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60 dark:bg-black/70 z-10" />

        <div className="container relative z-20 mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-primary/20 text-primary border border-primary/30 text-sm font-semibold tracking-wider mb-6 uppercase">
              The Wait Is Over
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-extrabold text-white leading-tight mb-4 drop-shadow-lg">
              Aarambh <span className="text-primary tracking-tight">3.0</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 font-light mb-8 max-w-3xl mx-auto drop-shadow-md">
              The Annual Techno-Cultural Fest of Government Engineering College, Jamui.
            </p>
            <p className="text-lg text-primary font-medium tracking-widest uppercase mb-12">
              7-8 April, 2026
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                to="/events" 
                className="w-full sm:w-auto px-8 py-4 bg-primary hover:bg-yellow-500 text-white rounded-lg font-bold text-lg transition-all transform hover:-translate-y-1 shadow-[0_0_20px_rgba(245,158,11,0.4)]"
              >
                Explore Events
              </Link>
              <Link 
                to="/team" 
                className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-white text-white hover:bg-white/10 rounded-lg font-bold text-lg transition-all"
              >
                Meet the Team
              </Link>
            </div>
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
        >
          <div className="w-8 h-12 rounded-full border-2 border-white/50 flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-white rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Countdown Section */}
      <section className="py-20 bg-white dark:bg-dark-bg transition-colors duration-300 relative">
        <div className="container mx-auto px-4">
          <SectionHeading 
            title="Fest Countdown" 
            subtitle="Get ready to experience the biggest college festival in Jamui. The clock is ticking!"
            centered 
          />
          <CountdownTimer targetDate="2026-04-07T09:00:00" />
        </div>
      </section>

      {/* Stats Section: The Numbers */}
      <section className="py-24 bg-gray-900 border-y border-white/5 relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-primary font-bold tracking-[0.2em] uppercase text-xs mb-4"
            >
              At A Glance
            </motion.p>
            <h2 className="text-5xl md:text-7xl font-display font-black text-white">
              The <span className="bg-gradient-to-r from-blue-400 to-primary bg-clip-text text-transparent italic">Numbers</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {/* Events Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="relative group overflow-hidden rounded-[32px] bg-white/5 border border-white/10 p-10 text-center transition-all duration-300 hover:bg-white/[0.08]"
            >
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-all" />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-purple-500/20 flex items-center justify-center mx-auto mb-6 text-purple-400 border border-purple-500/30">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-4xl md:text-5xl font-display font-black text-white mb-2 tracking-tight">30+</h3>
                <p className="text-gray-400 font-medium tracking-wide text-sm opacity-80 uppercase">Events</p>
              </div>
            </motion.div>

            {/* Participants Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="relative group overflow-hidden rounded-[32px] bg-white/5 border border-white/10 p-10 text-center transition-all duration-300 hover:bg-white/[0.08]"
            >
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all" />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-blue-500/20 flex items-center justify-center mx-auto mb-6 text-blue-400 border border-blue-500/30">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-4xl md:text-5xl font-display font-black text-white mb-2 tracking-tight">1500+</h3>
                <p className="text-gray-400 font-medium tracking-wide text-sm opacity-80 uppercase">Participants</p>
              </div>
            </motion.div>

            {/* Categories Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="relative group overflow-hidden rounded-[32px] bg-white/5 border border-white/10 p-10 text-center transition-all duration-300 hover:bg-white/[0.08]"
            >
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-all" />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-6 text-primary border border-primary/30">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.67.335a2 2 0 01-1.789 0l-.67-.335a6 6 0 00-3.86-.517l-2.388.477a2 2 0 00-1.022.547V18a2 2 0 002 2h11a2 2 0 002-2v-2.572zM12 11V3.5l3-1.5m-3 1.5l-3-1.5" />
                  </svg>
                </div>
                <h3 className="text-4xl md:text-5xl font-display font-black text-white mb-2 tracking-tight">4</h3>
                <p className="text-gray-400 font-medium tracking-wide text-sm opacity-80 uppercase">Categories</p>
              </div>
            </motion.div>

            {/* Days Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="relative group overflow-hidden rounded-[32px] bg-white/5 border border-white/10 p-10 text-center transition-all duration-300 hover:bg-white/[0.08]"
            >
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-pink-500/10 rounded-full blur-2xl group-hover:bg-pink-500/20 transition-all" />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-pink-500/20 flex items-center justify-center mx-auto mb-6 text-pink-400 border border-pink-500/30">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <h3 className="text-4xl md:text-5xl font-display font-black text-white mb-2 tracking-tight">2</h3>
                <p className="text-gray-400 font-medium tracking-wide text-sm opacity-80 uppercase">Days</p>
              </div>
            </motion.div>
          </div>

          {/* Category Chips Toggle */}
          <div className="mt-16 flex flex-wrap justify-center gap-4">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3 backdrop-blur-md cursor-pointer hover:border-purple-500/50 transition-colors"
            >
              <span className="text-purple-400"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" /></svg></span>
              <span className="text-white font-bold text-sm tracking-tight">Cultural</span>
              <span className="bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded-lg text-[10px] font-black">{loading ? '...' : (featuredEvents.filter(e => e.category === 'cultural').length + 10)}</span>
            </motion.div>
            
            <motion.div 
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3 backdrop-blur-md cursor-pointer hover:border-blue-400/50 transition-colors"
            >
              <span className="text-blue-400"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg></span>
              <span className="text-white font-bold text-sm tracking-tight">Technical</span>
              <span className="bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-lg text-[10px] font-black">{loading ? '...' : (featuredEvents.filter(e => e.category === 'technical').length + 8)}</span>
            </motion.div>
            
            <motion.div 
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3 backdrop-blur-md cursor-pointer hover:border-primary/50 transition-colors"
            >
              <span className="text-primary"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg></span>
              <span className="text-white font-bold text-sm tracking-tight">Creative</span>
              <span className="bg-primary/20 text-primary px-2 py-0.5 rounded-lg text-[10px] font-black">4</span>
            </motion.div>
            
            <motion.div 
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3 backdrop-blur-md cursor-pointer hover:border-green-500/50 transition-colors"
            >
              <span className="text-green-400"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg></span>
              <span className="text-white font-bold text-sm tracking-tight">Sports</span>
              <span className="bg-green-500/20 text-green-400 px-2 py-0.5 rounded-lg text-[10px] font-black">{loading ? '...' : (featuredEvents.filter(e => e.category === 'sports').length + 12)}</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Three Words, One Fest Section */}
      <section className="py-24 bg-gray-50 dark:bg-dark-bg transition-colors duration-300 relative overflow-hidden">
        {/* Thematic Background Blobs */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-primary font-bold tracking-widest uppercase text-sm mb-4"
            >
              Celebrating Unity in Diversity
            </motion.p>
            <SectionHeading 
              title="Three Words, One Fest" 
              subtitle="The trifecta of excellence that defines the spirit of Aarambh 3.0."
              centered
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Technical Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -10 }}
              className="group relative overflow-hidden rounded-3xl bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 p-8 shadow-xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-blue-500/20 flex items-center justify-center mb-6 border border-blue-400/30">
                  <span className="text-3xl">💻</span>
                </div>
                <h3 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-2">Technical</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  Unleash your inner engineer. From lines of code to complex robotics, pushing the boundaries of technology.
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {['Hackathon', 'Robotics', 'Coding'].map(tag => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-semibold border border-blue-500/20 uppercase tracking-tighter">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between border-t border-gray-100 dark:border-white/10 pt-6">
                  <span className="text-gray-500 dark:text-gray-500 text-sm font-medium">Total registered</span>
                  <span className="text-2xl font-bold text-blue-500">{loading ? '...' : (featuredEvents.filter(e => e.category === 'technical').length + 5)}+</span>
                </div>
              </div>
            </motion.div>

            {/* Cultural Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative overflow-hidden rounded-3xl bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 p-8 shadow-xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mb-6 border border-primary/30">
                  <span className="text-3xl">🎨</span>
                </div>
                <h3 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-2">Cultural</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  A explosion of artistic expression. Showcasing the rhythm, the colors, and the heart of our vibrant community.
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {['Dance', 'Music', 'Drama'].map(tag => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-pink-500/10 text-pink-600 dark:text-pink-400 text-xs font-semibold border border-pink-500/20 uppercase tracking-tighter">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between border-t border-gray-100 dark:border-white/10 pt-6">
                  <span className="text-gray-500 dark:text-gray-500 text-sm font-medium">Total registered</span>
                  <span className="text-2xl font-bold text-primary">{loading ? '...' : (featuredEvents.filter(e => e.category === 'cultural').length + 8)}+</span>
                </div>
              </div>
            </motion.div>

            {/* Sports Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -10 }}
              className="group relative overflow-hidden rounded-3xl bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 p-8 shadow-xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-green-500/20 flex items-center justify-center mb-6 border border-green-400/30">
                  <span className="text-3xl">⚽</span>
                </div>
                <h3 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-2">Sports</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  The ultimate test of strength and teamwork. High-octave matches where adrenaline and sportsmanship collide.
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {['Kabaddi', 'Volleyball', 'Cricket'].map(tag => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-semibold border border-green-500/20 uppercase tracking-tighter">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between border-t border-gray-100 dark:border-white/10 pt-6">
                  <span className="text-gray-500 dark:text-gray-500 text-sm font-medium">Total registered</span>
                  <span className="text-2xl font-bold text-green-500">{loading ? '...' : (featuredEvents.filter(e => e.category === 'sports').length + 4)}+</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Past Highlights Section */}
      <section className="py-24 bg-white dark:bg-dark-card transition-colors duration-300 overflow-hidden relative">
        <div className="container mx-auto px-4 mb-16 text-center">
          <SectionHeading 
            title="Past Highlights" 
            subtitle="Legacy of Aarambh: Captured moments of triumph and celebration from previous editions."
            centered
          />
        </div>

        <div className="flex flex-col gap-8">
          {/* Row 1 - Marquee */}
          <div className="flex overflow-hidden group">
            <motion.div 
              animate={{ x: [0, -1000] }}
              transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
              className="flex gap-6 whitespace-nowrap"
            >
              {[1,2,3,4,5,6,7,8,9,10].map(i => (
                <div key={i} className="w-80 h-48 flex-shrink-0 rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-white/10 group-hover:scale-105 transition-transform duration-500">
                  <img 
                    src={`https://images.unsplash.com/photo-${1500000000000 + i * 10000}?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80`} 
                    alt="Highlight" 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </motion.div>
            {/* Same set duplicated for infinite loop */}
            <motion.div 
              animate={{ x: [0, -1000] }}
              transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
              className="flex gap-6 whitespace-nowrap ml-6"
            >
              {[1,2,3,4,5,6,7,8,9,10].map(i => (
                <div key={i} className="w-80 h-48 flex-shrink-0 rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-white/10 group-hover:scale-105 transition-transform duration-500">
                  <img 
                    src={`https://images.unsplash.com/photo-${1500000000000 + i * 10000}?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80`} 
                    alt="Highlight" 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </motion.div>
          </div>

          {/* Row 2 - Marquee Reverse */}
          <div className="flex overflow-hidden group">
            <motion.div 
              animate={{ x: [-1000, 0] }}
              transition={{ repeat: Infinity, duration: 35, ease: "linear" }}
              className="flex gap-6 whitespace-nowrap"
            >
              {[11,12,13,14,15,16,17,18,19,20].map(i => (
                <div key={i} className="w-80 h-48 flex-shrink-0 rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-white/10 group-hover:scale-105 transition-transform duration-500">
                  <img 
                    src={`https://images.unsplash.com/photo-${1511795409834 + i * 5000}?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80`} 
                    alt="Highlight" 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </motion.div>
            <motion.div 
              animate={{ x: [-1000, 0] }}
              transition={{ repeat: Infinity, duration: 35, ease: "linear" }}
              className="flex gap-6 whitespace-nowrap ml-6"
            >
              {[11,12,13,14,15,16,17,18,19,20].map(i => (
                <div key={i} className="w-80 h-48 flex-shrink-0 rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-white/10 group-hover:scale-105 transition-transform duration-500">
                  <img 
                    src={`https://images.unsplash.com/photo-${1511795409834 + i * 5000}?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80`} 
                    alt="Highlight" 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Ready for Aarambh Section */}
      <section className="py-24 bg-gray-900 text-white relative overflow-hidden">
        {/* Decorative Grid or Shapes */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="bg-white/5 backdrop-blur-3xl rounded-[40px] border border-white/10 p-8 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="lg:max-w-xl text-center lg:text-left">
              <h2 className="text-4xl md:text-6xl font-display font-black text-white mb-6">Ready for <span className="text-primary italic">Aarambh?</span></h2>
              <p className="text-xl text-gray-300 font-light mb-10 leading-relaxed">
                Gear up for the most electrifying experience of your college life. Explore our diverse roster of events and mark your calendars!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link 
                  to="/events" 
                  className="px-10 py-5 bg-primary hover:bg-yellow-500 text-white font-bold rounded-2xl shadow-xl hover:shadow-primary/20 transition-all flex items-center justify-center gap-3"
                >
                  <span className="text-lg">Explore Events</span>
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link 
                  to="/schedule" 
                  className="px-10 py-5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-2xl border border-white/10 transition-all flex items-center justify-center gap-3"
                >
                  <span className="text-lg">See Schedule</span>
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </Link>
              </div>
            </div>

            <div className="w-full lg:w-96 space-y-6">
              <div className="p-8 rounded-3xl bg-white/10 border border-white/10 group hover:border-primary/50 transition-colors">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Main Arena</h4>
                    <p className="text-xl font-bold text-white uppercase tracking-tight">Day-1 & Day-2 Venue</p>
                  </div>
                </div>
                <p className="text-gray-300 font-light leading-snug">
                  Auditorium & Central Ground, GEC Jamui Campus. All flagship events will be hosted here.
                </p>
              </div>

              <div className="p-8 rounded-3xl bg-white/10 border border-white/10 group hover:border-blue-400/50 transition-colors">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-7h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Tech Hub</h4>
                    <p className="text-xl font-bold text-white uppercase tracking-tight">Department Blocks</p>
                  </div>
                </div>
                <p className="text-gray-300 font-light leading-snug">
                  Rooms 204-208 for Hackathons and Robotics labs for project showcase.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Events Section */}
      <section className="py-24 bg-gray-50 dark:bg-dark-bg transition-colors duration-300">
        <div className="container mx-auto px-4 text-center">
          <SectionHeading 
            title="Featured Events" 
            subtitle="Catch a glimpse of the most anticipated events happening this year."
            centered
          />
          
          {loading ? (
             <div className="flex justify-center items-center py-20">
               <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
             </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredEvents.length > 0 ? (
                // This will map EventCards later once we make the component
                <p className="text-gray-500 dark:text-gray-400 col-span-full">Events data found. Will render EventCards here.</p>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 col-span-full py-10">No events published yet. Stay tuned!</p>
              )}
            </div>
          )}
          
          <div className="mt-12 text-center">
            <Link 
              to="/events" 
              className="inline-flex items-center text-primary font-semibold text-lg hover:text-yellow-600 transition-colors group"
            >
              View All Events
              <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Sponsors Strip */}
      <section className="py-16 bg-white dark:bg-dark-card border-t border-gray-100 dark:border-dark-border transition-colors duration-300">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-8">Trusted by our amazing partners</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 dark:opacity-50 grayscale hover:grayscale-0 transition-all duration-300">
            {loading ? (
              <span className="text-gray-400">Loading sponsors...</span>
            ) : sponsors.length > 0 ? (
              sponsors.map(sponsor => (
                <a 
                  key={sponsor._id} 
                  href={sponsor.websiteUrl || '#'} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block h-12 md:h-16 hover:scale-110 transition-transform"
                  title={sponsor.name}
                >
                  <img 
                    src={sponsor.imageUrl.startsWith('/uploads') ? `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}${sponsor.imageUrl}` : sponsor.imageUrl} 
                    alt={sponsor.name}
                    className="h-full w-auto object-contain"
                  />
                </a>
              ))
            ) : (
              <>
                <h2 className="text-3xl font-display font-black text-gray-800 dark:text-white">GEC JAMUI</h2>
                <h2 className="text-3xl font-display font-black text-gray-800 dark:text-white">AARAMBH</h2>
              </>
            )}
          </div>
        </div>
      </section>

    </motion.div>
  );
};
export default Home;
