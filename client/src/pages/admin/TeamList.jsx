import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import teamService from '../../services/teamService';
import toast, { Toaster } from 'react-hot-toast';
import { FiEdit2, FiTrash2, FiPlus, FiUser } from 'react-icons/fi';

const TeamList = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('faculty');

  const sections = [
    { id: 'faculty', label: 'Faculty' },
    { id: 'organizing', label: 'Organizing' },
    { id: 'core', label: 'Core' },
    { id: 'technical', label: 'Technical' },
    { id: 'cultural', label: 'Cultural' },
    { id: 'sports', label: 'Sports' },
    { id: 'hospitality', label: 'Hospitality' },
    { id: 'media', label: 'Media' }
  ];

  const fetchMembers = async () => {
    setLoading(true);
    try {
      const data = await teamService.getAll(activeSection);
      setMembers(data);
    } catch (error) {
      toast.error('Failed to load team members');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, [activeSection]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to remove this team member?')) {
      try {
        await teamService.delete(id);
        toast.success('Member removed successfully');
        setMembers(members.filter(m => m.id !== id));
      } catch (error) {
        toast.error('Failed to remove member');
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
          <h1 className="text-3xl font-display font-bold text-gray-900 dark:text-white">Team Management</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Organize and manage the festival committee.</p>
        </div>
        <Link 
          to="/admin/team/add" 
          className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-yellow-600 text-white font-medium rounded-lg transition-colors shadow-sm"
        >
          <FiPlus /> Add Member
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 p-1 bg-gray-100 dark:bg-dark-card rounded-lg inline-flex">
        {sections.map(section => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${
              activeSection === section.id 
                ? 'bg-white dark:bg-dark-bg text-primary shadow-sm' 
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            {section.label}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm border border-gray-200 dark:border-dark-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-dark-bg/50 border-b border-gray-200 dark:border-dark-border">
                <th className="p-4 font-semibold text-gray-600 dark:text-gray-300 text-sm w-16">Photo</th>
                <th className="p-4 font-semibold text-gray-600 dark:text-gray-300 text-sm whitespace-nowrap">Name</th>
                <th className="p-4 font-semibold text-gray-600 dark:text-gray-300 text-sm hidden md:table-cell">Role</th>
                <th className="p-4 font-semibold text-gray-600 dark:text-gray-300 text-sm hidden lg:table-cell">Year & Branch</th>
                <th className="p-4 font-semibold text-gray-600 dark:text-gray-300 text-sm hidden lg:table-cell w-16 text-center">Order</th>
                <th className="p-4 font-semibold text-gray-600 dark:text-gray-300 text-sm text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-dark-border">
              {loading ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-gray-500">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary mx-auto"></div>
                  </td>
                </tr>
              ) : members.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-gray-500 dark:text-gray-400">
                    No members found in {activeSection} committee.
                  </td>
                </tr>
              ) : (
                members.map((member) => (
                  <tr key={member.id} className="hover:bg-gray-50 dark:hover:bg-dark-bg/30 transition-colors">
                    <td className="p-4">
                      {member.imageUrl ? (
                        <div className="w-10 h-10 rounded-full object-cover overflow-hidden bg-gray-100 dark:bg-gray-800 border-2 border-white dark:border-dark-card shadow-sm">
                          <img src={member.imageUrl} alt={member.name} className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400 border-2 border-white dark:border-dark-card shadow-sm">
                          <FiUser />
                        </div>
                      )}
                    </td>
                    <td className="p-4 font-medium text-gray-900 dark:text-white">
                      {member.name}
                    </td>
                    <td className="p-4 hidden md:table-cell text-gray-600 dark:text-gray-300">
                      {member.role}
                    </td>
                    <td className="p-4 hidden lg:table-cell text-sm text-gray-500 dark:text-gray-400">
                      {member.branch && member.year ? `${member.branch} - ${member.year}` : '-'}
                    </td>
                    <td className="p-4 hidden lg:table-cell text-center text-gray-500">
                      {member.order || 0}
                    </td>
                    <td className="p-4 text-right whitespace-nowrap">
                      <div className="flex justify-end gap-2">
                        <Link
                          to={`/admin/team/edit/${member.id}`}
                          className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors"
                          title="Edit"
                        >
                          <FiEdit2 />
                        </Link>
                        <button
                          onClick={() => handleDelete(member.id)}
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

export default TeamList;
