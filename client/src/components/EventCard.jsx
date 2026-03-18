import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiCalendar, FiClock, FiMapPin, FiShare2, FiCopy, FiLinkedin, FiTwitter } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import RegisterModal from './RegisterModal';
import { toast } from 'react-hot-toast';

const getFullImageUrl = (url) => {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  return `http://localhost:5000${url}`;
};

const EventCard = ({ event }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [isShareMenuOpen, setIsShareMenuOpen] = useState(false);

  const getCategoryTheme = (cat) => {
    switch(cat?.toLowerCase()) {
      case 'cultural': return { bg: 'bg-pink-500', text: 'text-pink-400', border: 'border-pink-500/30' };
      case 'technical': return { bg: 'bg-blue-500', text: 'text-blue-400', border: 'border-blue-500/30' };
      case 'sports': return { bg: 'bg-orange-500', text: 'text-orange-400', border: 'border-orange-500/30' };
      case 'creative': return { bg: 'bg-primary', text: 'text-primary', border: 'border-primary/30' };
      default: return { bg: 'bg-purple-500', text: 'text-purple-400', border: 'border-purple-500/30' };
    }
  };

  const theme = getCategoryTheme(event.category);
  const eventDay = event.day || '1';

  const shareBaseUrl = `${window.location.origin}/events?id=${event.id}`;
  const shareText = `✨ *${event.title}* at Aarambh 2026! ✨\n\n📝 ${event.description}\n\n📅 Date: ${event.date}\n⏰ Time: ${event.time}\n📍 Venue: ${event.venue}\n\n📜 Rulebook: ${event.rulebookUrl || 'Available on request'}\n🔗 Register Now: ${shareBaseUrl}\n\nJoin the ultimate fest experience! 🎊`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareBaseUrl);
    toast.success('Event link copied to clipboard!');
    setIsShareMenuOpen(false);
  };

  const shareOptions = [
    { 
      name: 'WhatsApp', 
      icon: <FaWhatsapp className="text-green-500" />, 
      url: `https://wa.me/?text=${encodeURIComponent(shareText)}` 
    },
    { 
      name: 'Twitter', 
      icon: <FiTwitter className="text-sky-500" />, 
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}` 
    },
    { 
      name: 'LinkedIn', 
      icon: <FiLinkedin className="text-blue-600" />, 
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareBaseUrl)}` 
    }
  ];

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ y: -10 }}
        className="group relative flex flex-col bg-white dark:bg-dark-card rounded-[32px] overflow-hidden shadow-xl border border-gray-100 dark:border-dark-border transition-all duration-300 h-full"
      >
        {/* Image Section */}
        <div className="relative h-64 overflow-hidden">
          <img 
            src={imgError ? 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' : getFullImageUrl(event.imageUrl)} 
            alt={event.title}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Category Tag Overlay (Bottom Left) */}
          <div className="absolute bottom-4 left-4">
            <span className={`px-4 py-1.5 rounded-xl ${theme.bg} text-white text-[10px] font-black uppercase tracking-widest shadow-lg`}>
              {event.category}
            </span>
          </div>

          {/* Share Button Overlay (Top Left) */}
          <div className="absolute top-4 left-4 z-10">
            <div className="relative">
              <button 
                onClick={(e) => { e.stopPropagation(); setIsShareMenuOpen(!isShareMenuOpen); }}
                className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-all shadow-lg"
              >
                <FiShare2 />
              </button>

              <AnimatePresence>
                {isShareMenuOpen && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9, x: -10 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.9, x: -10 }}
                    className="absolute top-12 left-0 w-48 bg-white dark:bg-dark-card rounded-2xl shadow-2xl border border-gray-100 dark:border-white/5 overflow-hidden z-20"
                  >
                    <div className="p-2 border-b border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-white/5">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">Share Event</p>
                    </div>
                    <div className="p-1">
                      {shareOptions.map((option) => (
                        <a 
                          key={option.name}
                          href={option.url}
                          target="_blank"
                          rel="noreferrer"
                          onClick={() => setIsShareMenuOpen(false)}
                          className="flex items-center gap-3 px-3 py-2.5 text-sm font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 rounded-xl transition-all"
                        >
                          <span className="text-lg">{option.icon}</span>
                          {option.name}
                        </a>
                      ))}
                      <button 
                        onClick={handleCopyLink}
                        className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 rounded-xl transition-all"
                      >
                        <span className="text-lg text-gray-400"><FiCopy /></span>
                        Copy Link
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Day Badge Overlay (Top Right) */}
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1.5 rounded-xl bg-black/60 backdrop-blur-md text-white text-[10px] font-bold border border-white/10 uppercase tracking-widest">
              Day {eventDay}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-8 relative">
          <div className="mb-6">
            <h3 className="text-2xl font-display font-black text-gray-900 dark:text-white mb-2 tracking-tight">
              {event.title}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 line-clamp-2 text-sm italic font-light leading-relaxed">
              {event.description}
            </p>
          </div>

          {/* Details Grid */}
          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
              <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-400">
                <FiCalendar className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium">{event.date}</span>
            </div>
            <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
              <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-400">
                <FiClock className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium">{event.time}</span>
            </div>
            <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
              <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-400">
                <FiMapPin className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium">{event.venue}</span>
            </div>
          </div>

          {/* Footer Info */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-100 dark:border-white/5">
            <div className="text-xs text-gray-400 dark:text-gray-500">
              <span className="font-bold text-gray-600 dark:text-gray-400">{event.rules?.length || 0} rules</span> · Mission Info
            </div>
            <button 
              onClick={() => setIsModalOpen(true)}
              className={`flex items-center gap-2 font-bold text-sm transition-all ${theme.text} hover:opacity-80`}
            >
              View More
              <FiArrowRight className="w-4 h-4 translate-y-[1px] group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Modal */}
      {isModalOpen && (
        <RegisterModal event={event} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
};

export default EventCard;
