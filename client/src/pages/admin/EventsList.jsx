import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import eventsService from '../../services/eventsService';
import toast, { Toaster } from 'react-hot-toast';
import { FiEdit2, FiTrash2, FiPlus, FiExternalLink, FiImage } from 'react-icons/fi';

const getFullImageUrl = (url) => {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
  return `${baseUrl}${url}`;
};

const EventsList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('technical');

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const data = await eventsService.getAll(activeTab);
      setEvents(data);
    } catch (error) {
      toast.error('Failed to load events');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [activeTab]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this event? This action cannot be undone.')) {
      try {
        await eventsService.delete(id);
        toast.success('Event deleted successfully');
        setEvents(events.filter(e => e.id !== id));
      } catch (error) {
        toast.error('Failed to delete event');
        console.error(error);
      }
    }
  };

  return (
    <div className="animate-fade-in">
      <Toaster position="top-right" />
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-900 dark:text-white">Events Management</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Create, update, and remove fest events.</p>
        </div>
        <Link 
          to="/admin/events/add" 
          className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-yellow-600 text-white font-medium rounded-lg transition-colors shadow-sm"
        >
          <FiPlus /> Add New Event
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 p-1 bg-gray-100 dark:bg-dark-card rounded-lg inline-flex">
        <button
          onClick={() => setActiveTab('technical')}
          className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${
            activeTab === 'technical' 
              ? 'bg-white dark:bg-dark-bg text-primary shadow-sm' 
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
          }`}
        >
          Technical
        </button>
        <button
          onClick={() => setActiveTab('cultural')}
          className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${
            activeTab === 'cultural' 
              ? 'bg-white dark:bg-dark-bg text-primary shadow-sm' 
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
          }`}
        >
          Cultural
        </button>
        <button
          onClick={() => setActiveTab('sports')}
          className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${
            activeTab === 'sports' 
              ? 'bg-white dark:bg-dark-bg text-primary shadow-sm' 
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
          }`}
        >
          Sports
        </button>
        <button
          onClick={() => setActiveTab('creative')}
          className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${
            activeTab === 'creative' 
              ? 'bg-white dark:bg-dark-bg text-primary shadow-sm' 
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
          }`}
        >
          Creative
        </button>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm border border-gray-200 dark:border-dark-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-dark-bg/50 border-b border-gray-200 dark:border-dark-border">
                <th className="p-4 font-semibold text-gray-600 dark:text-gray-300 text-sm w-16">Image</th>
                <th className="p-4 font-semibold text-gray-600 dark:text-gray-300 text-sm whitespace-nowrap">Title</th>
                <th className="p-4 font-semibold text-gray-600 dark:text-gray-300 text-sm hidden md:table-cell">Status</th>
                <th className="p-4 font-semibold text-gray-600 dark:text-gray-300 text-sm hidden lg:table-cell">Form Info</th>
                <th className="p-4 font-semibold text-gray-600 dark:text-gray-300 text-sm text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-dark-border">
              {loading ? (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-gray-500">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary mx-auto"></div>
                  </td>
                </tr>
              ) : events.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-gray-500 dark:text-gray-400">
                    No {activeTab} events found.
                  </td>
                </tr>
              ) : (
                events.map((event) => (
                  <tr key={event.id} className="hover:bg-gray-50 dark:hover:bg-dark-bg/30 transition-colors">
                    <td className="p-4">
                      {event.imageUrl ? (
                        <div className="w-12 h-12 rounded object-cover overflow-hidden bg-gray-100 dark:bg-gray-800">
                          <img src={getFullImageUrl(event.imageUrl)} alt={event.title} className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400">
                          <FiImage />
                        </div>
                      )}
                    </td>
                    <td className="p-4 font-medium text-gray-900 dark:text-white">
                      {event.title}
                    </td>
                    <td className="p-4 hidden md:table-cell">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        event.isActive 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                      }`}>
                        {event.isActive ? 'Active' : 'Closed'}
                      </span>
                    </td>
                    <td className="p-4 hidden lg:table-cell">
                      {event.googleFormUrl ? (
                        <div className="flex flex-col items-start text-sm">
                           <a href={event.googleFormUrl} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline flex items-center gap-1">
                             Google Form <FiExternalLink />
                           </a>
                        </div>
                      ) : (
                         <span className="text-gray-400 text-sm italic">No form attached</span>
                      )}
                    </td>
                    <td className="p-4 text-right whitespace-nowrap">
                      <div className="flex justify-end gap-2">
                        <Link
                          to={`/admin/events/edit/${event.id}`}
                          className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors"
                          title="Edit"
                        >
                          <FiEdit2 />
                        </Link>
                        <button
                          onClick={() => handleDelete(event.id)}
                          className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                          title="Delete"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EventsList;
