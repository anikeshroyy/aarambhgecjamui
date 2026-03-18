import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatGoogleFormUrl } from '../utils/formatGoogleFormUrl';
import { FiX, FiCalendar, FiClock, FiMapPin, FiBookOpen, FiExternalLink, FiInfo } from 'react-icons/fi';

const RegisterModal = ({ event, onClose }) => {
  const embeddedUrl = formatGoogleFormUrl(event.googleFormUrl);
  const [showForm, setShowForm] = useState(false);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="bg-white dark:bg-dark-card w-full max-w-5xl rounded-[32px] shadow-2xl overflow-hidden flex flex-col h-[90vh]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex justify-between items-center p-8 border-b border-gray-100 dark:border-dark-border bg-gray-50 dark:bg-dark-bg/50">
            <div>
              <h3 className="text-3xl font-display font-black text-gray-900 dark:text-white tracking-tight">
                {showForm ? `Registering for ${event.title}` : event.title}
              </h3>
              <div className="flex items-center gap-3 mt-2">
                <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest rounded-lg border border-primary/20">
                  {event.category}
                </span>
                <span className="text-sm text-gray-400 font-medium">
                  {showForm ? 'Please fill the form below' : 'Event Mission & Guidelines'}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-white dark:hover:bg-dark-border rounded-2xl transition-all shadow-sm border border-transparent hover:border-gray-200"
            >
              <FiX className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
            {/* Left Side: Rules and Info (Hidden when form is showing on mobile, visible side-by-side on desktop if needed, but we'll use a toggle for focus) */}
            {!showForm ? (
              <div className="flex-1 overflow-y-auto p-8 md:p-12 space-y-10 custom-scrollbar">
                {/* Event Highlights */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
                      <FiCalendar />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-black text-gray-400 tracking-wider">Date</p>
                      <p className="text-sm font-bold text-gray-700 dark:text-gray-200">{event.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
                    <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-500 flex items-center justify-center">
                      <FiClock />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-black text-gray-400 tracking-wider">Time</p>
                      <p className="text-sm font-bold text-gray-700 dark:text-gray-200">{event.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center">
                      <FiMapPin />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-black text-gray-400 tracking-wider">Venue</p>
                      <p className="text-sm font-bold text-gray-700 dark:text-gray-200">{event.venue}</p>
                    </div>
                  </div>
                </div>

                {/* About Section */}
                <div>
                  <h4 className="flex items-center gap-2 text-lg font-bold text-gray-900 dark:text-white mb-4">
                    <FiInfo className="text-primary" /> About Event
                  </h4>
                  <p className="text-gray-500 dark:text-gray-400 leading-relaxed font-light italic">
                    {event.description}
                  </p>
                </div>

                {/* Rules Section */}
                <div>
                  <h4 className="flex items-center gap-2 text-lg font-bold text-gray-900 dark:text-white mb-6">
                    <FiBookOpen className="text-primary" /> Event Rules & Guidelines
                  </h4>
                  {event.rules && event.rules.length > 0 ? (
                    <div className="space-y-4">
                      {event.rules.map((rule, idx) => (
                        <div key={idx} className="flex gap-4 group">
                          <span className="flex-shrink-0 w-6 h-6 rounded-lg bg-primary/10 text-primary text-[10px] flex items-center justify-center font-black">
                            {idx + 1}
                          </span>
                          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed pt-0.5 group-hover:text-primary transition-colors">
                            {rule}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-400 italic text-sm">Official rules will be communicated by event coordinators.</p>
                  )}
                </div>

                {/* Footer Actions */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  {event.rulebookUrl && (
                    <a 
                      href={event.rulebookUrl} 
                      target="_blank" 
                      rel="noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-white dark:bg-dark-card border-2 border-primary/20 text-primary font-black rounded-2xl hover:bg-primary/5 transition-all uppercase tracking-widest text-xs"
                    >
                      <FiExternalLink /> Download Rulebook
                    </a>
                  )}
                  <button 
                    onClick={() => setShowForm(true)}
                    className="flex-[2] py-4 bg-primary text-white font-black rounded-2xl shadow-xl shadow-primary/20 hover:bg-yellow-500 transition-all uppercase tracking-widest text-xs"
                  >
                    Proceed to Registration
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col">
                <div className="flex-1 w-full bg-gray-100 dark:bg-[#121212] overflow-hidden relative">
                  {!embeddedUrl ? (
                    <div className="absolute inset-0 flex items-center justify-center p-8 text-center">
                      <div>
                        <p className="text-red-500 mb-4 text-lg font-bold">Registration form link is unavailable.</p>
                        <button onClick={() => setShowForm(false)} className="px-6 py-2 bg-primary text-white rounded-lg font-medium">Go Back</button>
                      </div>
                    </div>
                  ) : (
                    <iframe
                      src={embeddedUrl}
                      width="100%"
                      height="100%"
                      frameBorder="0"
                      marginHeight="0"
                      marginWidth="0"
                      title={`${event.title} Registration Form`}
                      className="w-full h-full"
                    >
                      Loading…
                    </iframe>
                  )}
                </div>
                <div className="p-4 bg-white dark:bg-dark-card border-t border-gray-100 dark:border-white/5 flex justify-center">
                   <button 
                    onClick={() => setShowForm(false)}
                    className="text-gray-400 hover:text-primary text-xs font-bold uppercase tracking-widest transition-all"
                   >
                     ← Back to Rules
                   </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default RegisterModal;
