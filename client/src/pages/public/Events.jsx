import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { FiMusic, FiTerminal, FiZap, FiEdit3, FiLayers, FiCalendar } from 'react-icons/fi';
import eventsService from '../../services/eventsService';
import SectionHeading from '../../components/SectionHeading';
import EventCard from '../../components/EventCard';
import RegisterModal from '../../components/RegisterModal';

// Internal helper to handle the modal when pre-selected from URL
const DeepLinkModal = ({ eventId, events, onClose }) => {
  const event = events.find(e => e.id === eventId);
  if (!event) return null;
  return <RegisterModal event={event} onClose={onClose} />;
};

const Events = () => {
  const [allEvents, setAllEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeDay, setActiveDay] = useState('all');
  const [error, setError] = useState(null);
  const [selectedEventId, setSelectedEventId] = useState(null);
  
  const location = useLocation();

  const categories = [
    { id: 'all', label: 'All Events', icon: <FiLayers /> },
    { id: 'cultural', label: 'Cultural', icon: <FiMusic /> },
    { id: 'technical', label: 'Technical', icon: <FiTerminal /> },
    { id: 'creative', label: 'Creative', icon: <FiEdit3 /> },
    { id: 'sports', label: 'Sports', icon: <FiZap /> }
  ];

  const days = [
    { id: 'all', label: 'All Days', date: '' },
    { id: '1', label: 'Day 1', date: ' — 7 April' },
    { id: '2', label: 'Day 2', date: ' — 8 April' }
  ];

  useEffect(() => {
    const fetchAllEvents = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await eventsService.getAll();
        setAllEvents(data);
        setFilteredEvents(data);
      } catch (err) {
        console.error('Error fetching events:', err);
        setError('Failed to load events. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchAllEvents();
  }, []);

  useEffect(() => {
    let filtered = [...allEvents];
    
    if (activeCategory !== 'all') {
      filtered = filtered.filter(e => e.category?.toLowerCase() === activeCategory);
    }
    
    if (activeDay !== 'all') {
      filtered = filtered.filter(e => String(e.day) === activeDay);
    }
    
    setFilteredEvents(filtered);
  }, [activeCategory, activeDay, allEvents]);

  // Handle deep linking
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const eventId = params.get('id');
    if (eventId) setSelectedEventId(eventId);
  }, [location]);

  const handleCloseModal = () => {
    setSelectedEventId(null);
    window.history.replaceState({}, '', window.location.pathname);
  };

  const getCount = (catId) => {
    if (catId === 'all') return allEvents.length;
    return allEvents.filter(e => e.category?.toLowerCase() === catId).length;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg transition-colors duration-300 py-16">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-16">
          <SectionHeading 
            title="Explore Events" 
            subtitle="Discover technical, cultural, and sports excellence at Aarambh 3.0"
            centered
          />
        </div>

        {/* Categories Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-3 px-6 py-3.5 rounded-full font-bold transition-all duration-300 transform hover:-translate-y-1 ${
                activeCategory === cat.id
                  ? 'bg-primary text-white shadow-xl shadow-primary/20 scale-105'
                  : 'bg-white dark:bg-dark-card text-gray-500 dark:text-gray-400 border border-gray-100 dark:border-white/5 hover:border-primary/30'
              }`}
            >
              <span className="text-lg">{cat.icon}</span>
              <span className="text-sm tracking-wide">{cat.label}</span>
              <span className={`flex items-center justify-center w-6 h-6 rounded-full text-[10px] font-black ${
                activeCategory === cat.id ? 'bg-white/20 text-white' : 'bg-gray-100 dark:bg-white/10 text-gray-400'
              }`}>
                {getCount(cat.id)}
              </span>
            </button>
          ))}
        </div>

        {/* Days Filter */}
        <div className="flex flex-wrap justify-center gap-8 mb-16">
          {days.map((day) => (
            <button
              key={day.id}
              onClick={() => setActiveDay(day.id)}
              className={`group flex items-center gap-2 text-sm font-bold transition-all ${
                activeDay === day.id
                  ? 'text-primary'
                  : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
              }`}
            >
              <span className={`px-4 py-1.5 rounded-full transition-all ${
                activeDay === day.id ? 'bg-primary text-white' : 'bg-transparent'
              }`}>
                {day.label}
              </span>
              <span className="opacity-60">{day.date}</span>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="relative min-h-[400px]">
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse bg-white dark:bg-dark-card rounded-[32px] h-[500px] border border-gray-100 dark:border-dark-border" />
              ))}
            </div>
          )}

          {!loading && error && (
            <div className="text-center py-24 bg-red-500/5 rounded-[40px] border border-red-500/10">
              <p className="text-red-500 font-bold mb-4">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="px-8 py-3 bg-red-500 text-white rounded-2xl font-bold hover:bg-red-600 transition-all"
              >
                Retry
              </button>
            </div>
          )}

          {!loading && !error && (
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeCategory}-${activeDay}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: "circOut" }}
              >
                {filteredEvents.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {filteredEvents.map((event) => (
                      <EventCard key={event.id} event={event} />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-32 text-center bg-white/40 dark:bg-dark-card/40 backdrop-blur-xl rounded-[48px] border border-gray-100 dark:border-white/5 shadow-2xl">
                    <div className="w-32 h-32 mb-8 rounded-full bg-primary/10 flex items-center justify-center text-5xl">
                      🌌
                    </div>
                    <h3 className="text-3xl font-display font-black text-gray-900 dark:text-white mb-4">
                      No events found
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 max-w-md font-light">
                      We couldn't find any {activeCategory === 'all' ? '' : activeCategory} events on {activeDay === 'all' ? 'any day' : `Day ${activeDay}`}. Try adjusting your filters!
                    </p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
        
        {selectedEventId && (
          <DeepLinkModal 
            eventId={selectedEventId} 
            events={allEvents} 
            onClose={handleCloseModal} 
          />
        )}
      </div>
    </div>
  );
};

export default Events;
