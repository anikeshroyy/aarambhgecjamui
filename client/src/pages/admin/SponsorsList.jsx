import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import sponsorsService from '../../services/sponsorsService';
import { FiPlus, FiEdit2, FiTrash2, FiExternalLink } from 'react-icons/fi';
import toast, { Toaster } from 'react-hot-toast';

const SponsorsList = () => {
  const [sponsors, setSponsors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSponsors();
  }, []);

  const fetchSponsors = async () => {
    try {
      const data = await sponsorsService.getAll();
      setSponsors(data);
    } catch (error) {
      toast.error('Failed to fetch sponsors');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this sponsor?')) return;
    try {
      await sponsorsService.delete(id);
      toast.success('Sponsor deleted successfully');
      setSponsors(sponsors.filter(s => s._id !== id));
    } catch (error) {
      toast.error('Failed to delete sponsor');
      console.error(error);
    }
  };

  const getFullImageUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
    return `${baseUrl}${url}`;
  };

  return (
    <div className="animate-fade-in">
      <Toaster position="top-right" />
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-900 dark:text-white">Sponsors Management</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage festival sponsors and partners dynamically.</p>
        </div>
        <Link 
          to="/admin/sponsors/add" 
          className="flex items-center justify-center gap-2 bg-primary hover:bg-yellow-600 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-md hover:shadow-lg"
        >
          <FiPlus className="w-5 h-5" />
          Add Sponsor
        </Link>
      </div>

      <div className="bg-white dark:bg-dark-card rounded-2xl shadow-sm border border-gray-100 dark:border-dark-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-dark-bg/50 border-b border-gray-100 dark:border-dark-border">
                <th className="px-6 py-4 text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Logo</th>
                <th className="px-6 py-4 text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Name</th>
                <th className="px-6 py-4 text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Type</th>
                <th className="px-6 py-4 text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Order</th>
                <th className="px-6 py-4 text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-dark-border">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center">
                    <div className="flex justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                    </div>
                  </td>
                </tr>
              ) : sponsors.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                    No sponsors found. Click "Add Sponsor" to create one.
                  </td>
                </tr>
              ) : (
                sponsors.map((sponsor) => (
                  <tr key={sponsor._id} className="hover:bg-gray-50/50 dark:hover:bg-dark-bg/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-dark-bg p-1 flex items-center justify-center overflow-hidden border border-gray-100 dark:border-dark-border">
                        <img 
                          src={getFullImageUrl(sponsor.imageUrl)} 
                          alt={sponsor.name}
                          className="max-w-full max-h-full object-contain"
                          onError={(e) => e.target.src = 'https://via.placeholder.com/100?text=Sponsor'}
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900 dark:text-white uppercase tracking-tight">{sponsor.name}</div>
                      {sponsor.websiteUrl && (
                        <a 
                          href={sponsor.websiteUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-xs text-primary hover:underline flex items-center gap-1 mt-1"
                        >
                          Website <FiExternalLink size={10} />
                        </a>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-md text-xs font-bold uppercase ${
                        sponsor.type === 'title' ? 'bg-yellow-100 text-yellow-700' :
                        sponsor.type === 'gold' ? 'bg-amber-100 text-amber-700' :
                        sponsor.type === 'silver' ? 'bg-gray-200 text-gray-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {sponsor.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500 dark:text-gray-400 font-mono text-sm">
                      {sponsor.order}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Link 
                          to={`/admin/sponsors/edit/${sponsor._id}`}
                          className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all"
                        >
                          <FiEdit2 size={18} />
                        </Link>
                        <button 
                          onClick={() => handleDelete(sponsor._id)}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                        >
                          <FiTrash2 size={18} />
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

export default SponsorsList;
