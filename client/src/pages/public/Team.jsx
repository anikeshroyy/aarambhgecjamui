import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import teamService from '../../services/teamService';
import SectionHeading from '../../components/SectionHeading';
import CoordinatorCard from '../../components/CoordinatorCard';

const Team = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Groupings based on typical fest structures
  const sections = [
    { id: 'faculty', title: 'Faculty Heads', subtitle: 'Our mentors guiding us through every step of Aarambh 3.0, helping us transition from theory to triumph.' },
    { id: 'organizing', title: 'Organizing Coordinator', subtitle: 'The dedicated visionaries coordinating the central pillars of the fest.' },
    { id: 'core', title: 'Core Committee', subtitle: 'The driving force behind Aarambh 3.0' },
    { id: 'technical', title: 'Technical Coordinator', subtitle: 'Minds behind the tech events' },
    { id: 'cultural', title: 'Cultural Coordinator', subtitle: 'Heart of the cultural extravaganza' },
    { id: 'sports', title: 'Sports Coordinator', subtitle: 'Managing the competitive spirit of Aarambh' },
    { id: 'hospitality', title: 'Hospitality & PR', subtitle: 'Welcoming our guests and participants' },
    { id: 'media', title: 'Media Coordinator', subtitle: 'Capturing moments, creating visuals' }
  ];

  useEffect(() => {
    const fetchTeam = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await teamService.getAll();
        setTeamMembers(data);
      } catch (err) {
        console.error('Error fetching team members:', err);
        setError('Failed to load team members. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, []);

  const getMembersBySection = (sectionId) => {
    return teamMembers.filter(member => member.section === sectionId);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg transition-colors duration-300 pb-16">
      
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden bg-gray-900 mb-16">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1522071823991-b59e74f4b48c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
            alt="Team working together" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent" />
        </div>
        
        <div className="relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-display font-extrabold text-white mb-4">
              Meet The <span className="text-primary">Team</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              The passionate individuals working tirelessly behind the scenes to make Aarambh 3.0 a grand success.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4">

        {/* Error State */}
        {error && (
          <div className="text-center text-red-500 p-8 bg-red-50 dark:bg-red-900/10 rounded-xl mb-12">
            <p>{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-4 py-2 bg-red-100 dark:bg-red-800 rounded hover:bg-red-200 dark:hover:bg-red-700 transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {/* Loading Skeleton */}
        {loading && !error && (
          <div className="space-y-24">
            {[1, 2].map((section) => (
              <div key={section}>
                <div className="w-64 h-8 bg-gray-200 dark:bg-gray-800 rounded mb-4 animate-pulse mx-auto" />
                <div className="w-96 h-4 bg-gray-200 dark:bg-gray-800 rounded mb-12 animate-pulse mx-auto" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {[1, 2, 3, 4].map((card) => (
                    <div key={card} className="animate-pulse bg-white dark:bg-dark-card rounded-2xl h-80 border border-gray-100 dark:border-dark-border" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Team Sections */}
        {!loading && !error && (
          <div className="space-y-24">
            {sections.map(({ id, title, subtitle }) => {
              const members = getMembersBySection(id);
              
              if (members.length === 0) return null; // Don't render empty sections
              
              const isCore = id === 'core';

              return (
                <section key={id}>
                  <div className="text-center mb-12">
                     <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white mb-4">
                       {title}
                     </h2>
                     <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                       {subtitle}
                     </p>
                  </div>

                  <div className={`grid grid-cols-1 sm:grid-cols-2 gap-8 ${
                    isCore 
                      ? 'lg:grid-cols-3 max-w-5xl mx-auto' 
                      : 'lg:grid-cols-4'
                  }`}>
                    {members.map(member => (
                      <CoordinatorCard 
                        key={member.id} 
                        member={member} 
                        isHead={isCore} 
                      />
                    ))}
                  </div>
                </section>
              );
            })}

            {teamMembers.length === 0 && (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="w-24 h-24 mb-6 rounded-full bg-gray-100 dark:bg-dark-card flex items-center justify-center border border-gray-200 dark:border-dark-border">
                  <span className="text-4xl">👥</span>
                </div>
                <h3 className="text-2xl font-display font-medium text-gray-900 dark:text-white mb-2">
                  Team Reveal Coming Soon
                </h3>
                <p className="text-gray-500 dark:text-gray-400 max-w-md">
                  We are finalizing the dedicated team behind Aarambh 3.0. Stay tuned to meet the faces behind the fest!
                </p>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default Team;
