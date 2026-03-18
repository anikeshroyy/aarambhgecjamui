import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiInstagram, FiCode, FiLayers, FiGitCommit, FiUsers, FiClock } from 'react-icons/fi';
import SectionHeading from '../../components/SectionHeading';

const Developers = () => {
  const devStats = [
    { label: 'Total Commits', value: '142', icon: <FiGitCommit />, color: 'purple' },
    { label: 'Contributors', value: '1', icon: <FiUsers />, color: 'blue' },
    { label: 'Last Commit', value: 'Today', icon: <FiClock />, color: 'green' },
    { label: 'Lines of Code', value: '12K+', icon: <FiCode />, color: 'primary' },
  ];

  const buildLogs = [
    { date: 'March 15, 2026', title: 'Phase 15: Developer Recognition', status: 'Completed' },
    { date: 'March 14, 2026', title: 'Phase 14: Stats Section Redesign', status: 'Completed' },
    { date: 'March 12, 2026', title: 'Phase 13: Home Page Category Sections', status: 'Completed' },
    { date: 'March 10, 2026', title: 'Phase 12: Team Hero Redesign', status: 'Completed' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg transition-colors duration-300 py-24 overflow-hidden relative">
      {/* Background Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px] -ml-48 -mb-48" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <SectionHeading 
            title="The Developer" 
            subtitle="Meet the mind behind the digital experience of Aarambh 3.0."
            centered
          />
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-24">
            {/* Developer Profile Card */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-1"
            >
              <div className="bg-white dark:bg-dark-card rounded-[40px] shadow-2xl border border-gray-100 dark:border-dark-border overflow-hidden sticky top-32">
                <div className="h-32 bg-gradient-to-r from-primary to-yellow-500" />
                <div className="px-8 pb-10 text-center -mt-16">
                  <div className="w-32 h-32 rounded-3xl border-4 border-white dark:border-dark-card bg-gray-200 mx-auto overflow-hidden shadow-xl mb-6 relative group">
                    <img 
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" 
                      alt="Anikesh Roy" 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                  <h3 className="text-3xl font-display font-black text-gray-900 dark:text-white mb-2">Anikesh Roy</h3>
                  <p className="text-primary font-bold tracking-widest text-xs uppercase mb-6">Lead Developer & UI/UX Architect</p>
                  
                  <p className="text-gray-500 dark:text-gray-400 font-light mb-8 leading-relaxed">
                    Crafting digital excellence with code and creativity. Dedicated to building institutional legacies through modern web technologies.
                  </p>

                  <div className="flex justify-center gap-4">
                    {[
                      { icon: <FiLinkedin />, link: 'https://linkedin.com/' },
                      { icon: <FiInstagram />, link: 'https://instagram.com/' },
                      { icon: <FiGithub />, link: 'https://github.com/' }
                    ].map((item, idx) => (
                      <motion.a 
                        key={idx}
                        href={item.link}
                        whileHover={{ y: -5, scale: 1.1 }}
                        className="w-12 h-12 rounded-2xl bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors border border-transparent hover:border-primary/20"
                      >
                        {item.icon}
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Stats and Logs */}
            <div className="lg:col-span-2 space-y-12">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {devStats.map((stat, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="p-8 rounded-[32px] bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border shadow-lg group hover:border-primary/30 transition-all"
                  >
                    <div className={`w-12 h-12 rounded-xl bg-${stat.color}-500/10 flex items-center justify-center text-${stat.color}-500 mb-6 group-hover:scale-110 transition-transform`}>
                      {stat.icon}
                    </div>
                    <h4 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">{stat.label}</h4>
                    <p className="text-4xl font-display font-black text-gray-900 dark:text-white tracking-tight">{stat.value}</p>
                  </motion.div>
                ))}
              </div>

              {/* Build Logs Section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-dark-card rounded-[40px] border border-gray-100 dark:border-dark-border shadow-xl overflow-hidden"
              >
                <div className="px-10 py-8 border-b border-gray-100 dark:border-white/5 flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-white">Project Build Logs</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Real-time status of the Aarambh 3.0 infrastructure</p>
                  </div>
                  <div className="px-4 py-2 rounded-full bg-green-500/10 text-green-500 text-[10px] font-black uppercase tracking-widest animate-pulse border border-green-500/20">
                    Live Status: Healthy
                  </div>
                </div>
                
                <div className="p-10">
                  <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 dark:before:via-white/10 before:to-transparent">
                    {buildLogs.map((log, idx) => (
                      <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white dark:border-dark-card bg-gray-50 dark:bg-white/10 text-primary shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 transition-colors duration-500 group-hover:bg-primary group-hover:text-white">
                          <FiCode className="w-4 h-4" />
                        </div>
                        <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl bg-gray-50 dark:bg-white/5 border border-transparent group-hover:border-primary/20 transition-all">
                          <div className="flex items-center justify-between space-x-2 mb-1">
                            <div className="font-bold text-gray-900 dark:text-white">{log.title}</div>
                            <time className="font-mono text-xs text-primary">{log.date}</time>
                          </div>
                          <div className="text-gray-500 dark:text-gray-400 text-sm font-light">Status: <span className="text-green-500 font-bold">{log.status}</span></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="px-10 py-6 bg-gray-50 dark:bg-white/5 text-center">
                  <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                    Pushing updates to GitHub repository... Logs will sync automatically.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Developers;
