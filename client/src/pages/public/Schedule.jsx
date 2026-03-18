import { motion } from 'framer-motion';
import SectionHeading from '../../components/SectionHeading';
import { FiCalendar, FiClock, FiMapPin } from 'react-icons/fi';

const Schedule = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg transition-colors duration-300 py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <SectionHeading 
            title="Event Schedule" 
            subtitle="Plan your journey through Aarambh 3.0. The full itinerary of Technical, Cultural and Sports events."
            centered
          />
        </div>

        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-dark-card rounded-[40px] shadow-xl border border-gray-100 dark:border-dark-border overflow-hidden"
          >
            <div className="p-12 text-center">
              <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-8">
                <FiCalendar className="w-10 h-10 text-primary" />
              </div>
              <h2 className="text-4xl font-display font-black text-gray-900 dark:text-white mb-6 italic uppercase tracking-tight">Full Schedule Reveal <span className="text-primary italic">Soon!</span></h2>
              <p className="text-xl text-gray-500 dark:text-gray-400 font-light mb-12 leading-relaxed">
                Our master coordination team is fine-tuning the timestamps for over 30+ events. We'll be announcing the detailed Day-1 and Day-2 itinerary very shortly.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left border-t border-gray-100 dark:border-white/10 pt-12">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                    <FiClock />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Starts At</h4>
                    <p className="font-bold text-gray-900 dark:text-white">09:00 AM</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500">
                    <FiMapPin />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Venue</h4>
                    <p className="font-bold text-gray-900 dark:text-white">Main Auditorium</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <FiCalendar />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Dates</h4>
                    <p className="font-bold text-gray-900 dark:text-white">Nov 20-22</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
