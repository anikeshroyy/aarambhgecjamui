import { useState, useEffect } from 'react';
import eventsService from '../../services/eventsService';
import teamService from '../../services/teamService';
import galleryService from '../../services/galleryService';
import { FiCalendar, FiUsers, FiImage } from 'react-icons/fi';

const DashboardCard = ({ title, count, icon, color }) => (
  <div className="bg-white dark:bg-dark-card p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-dark-border flex items-center gap-6">
    <div className={`p-4 rounded-xl text-white ${color}`}>
      {icon}
    </div>
    <div>
      <h3 className="text-gray-500 dark:text-gray-400 font-medium mb-1">{title}</h3>
      <p className="text-4xl font-display font-bold text-gray-900 dark:text-white">{count}</p>
    </div>
  </div>
);

const Dashboard = () => {
  const [stats, setStats] = useState({ events: 0, team: 0, gallery: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [events, team, gallery] = await Promise.all([
          eventsService.getAll(),
          teamService.getAll(),
          galleryService.getAll('3.0') // Default to current edition's count if needed, or all
        ]);

        setStats({
          events: events.length,
          team: team.length,
          gallery: gallery.length
        });
      } catch (error) {
        console.error('Failed to fetch dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-gray-900 dark:text-white">Dashboard Overview</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">Welcome back to the Aarambh 3.0 Admin Panel.</p>
      </div>
      
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white dark:bg-dark-card p-6 rounded-2xl h-32 animate-pulse border border-gray-100 dark:border-dark-border" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <DashboardCard 
            title="Total Events" 
            count={stats.events} 
            icon={<FiCalendar className="w-8 h-8" />}
            color="bg-blue-500"
          />
          <DashboardCard 
            title="Team Members" 
            count={stats.team} 
            icon={<FiUsers className="w-8 h-8" />}
            color="bg-primary"
          />
          <DashboardCard 
            title="Gallery Images" 
            count={stats.gallery} 
            icon={<FiImage className="w-8 h-8" />}
            color="bg-purple-500"
          />
        </div>
      )}

      <div className="mt-12 bg-white dark:bg-dark-card rounded-2xl p-8 border border-gray-100 dark:border-dark-border">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <a href="/admin/events/add" className="p-4 border border-dashed border-gray-300 dark:border-gray-600 rounded-xl text-center hover:bg-gray-50 dark:hover:bg-dark-bg text-gray-600 dark:text-gray-300 transition-colors">
            + Create New Event
          </a>
          <a href="/admin/team/add" className="p-4 border border-dashed border-gray-300 dark:border-gray-600 rounded-xl text-center hover:bg-gray-50 dark:hover:bg-dark-bg text-gray-600 dark:text-gray-300 transition-colors">
            + Add Team Member
          </a>
          <a href="/admin/gallery/upload" className="p-4 border border-dashed border-gray-300 dark:border-gray-600 rounded-xl text-center hover:bg-gray-50 dark:hover:bg-dark-bg text-gray-600 dark:text-gray-300 transition-colors">
            + Upload Photo
          </a>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
