import { useState, useEffect } from 'react';
import adminService from '../../services/adminService';
import toast, { Toaster } from 'react-hot-toast';
import { FiPlus, FiTrash2, FiUser, FiShield, FiX } from 'react-icons/fi';

const AdminManagement = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  
  // New Admin Form State
  const [newAdmin, setNewAdmin] = useState({
    email: '',
    password: '',
    role: 'technical'
  });

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const data = await adminService.list();
      setAdmins(data);
    } catch (error) {
      toast.error('Failed to fetch admins');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, role) => {
    if (role === 'global') {
      toast.error('Cannot delete global admin');
      return;
    }
    if (!window.confirm('Are you sure you want to remove this admin account?')) return;
    
    try {
      await adminService.delete(id);
      toast.success('Admin removed successfully');
      setAdmins(admins.filter(a => a._id !== id));
    } catch (error) {
      toast.error('Failed to remove admin');
    }
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      await adminService.create(newAdmin);
      toast.success('Admin created successfully');
      setShowAddModal(false);
      setNewAdmin({ email: '', password: '', role: 'technical' });
      fetchAdmins();
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to create admin');
    }
  };

  return (
    <div className="animate-fade-in">
      <Toaster position="top-right" />
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-900 dark:text-white">Admin Management</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage role-based access for fellow coordinators.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center justify-center gap-2 bg-primary hover:bg-yellow-600 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-md hover:shadow-lg"
        >
          <FiPlus className="w-5 h-5" />
          Create New Admin
        </button>
      </div>

      <div className="bg-white dark:bg-dark-card rounded-2xl shadow-sm border border-gray-100 dark:border-dark-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-dark-bg/50 border-b border-gray-100 dark:border-dark-border">
                <th className="px-6 py-4 text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Admin</th>
                <th className="px-6 py-4 text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Role</th>
                <th className="px-6 py-4 text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-dark-border">
              {loading ? (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary mx-auto"></div>
                  </td>
                </tr>
              ) : admins.map((admin) => (
                <tr key={admin._id} className="hover:bg-gray-50/50 dark:hover:bg-dark-bg/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-dark-bg flex items-center justify-center text-gray-500">
                        <FiUser size={20} />
                      </div>
                      <div className="font-medium text-gray-900 dark:text-white">{admin.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-lg text-xs font-bold uppercase ${
                      admin.role === 'global' ? 'bg-purple-100 text-purple-700' :
                      admin.role === 'technical' ? 'bg-blue-100 text-blue-700' :
                      admin.role === 'cultural' ? 'bg-pink-100 text-pink-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {admin.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">Active</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {admin.role !== 'global' && (
                      <button 
                        onClick={() => handleDelete(admin._id, admin.role)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Admin Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-dark-card w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-scale-up">
            <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-dark-border">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <FiShield className="text-primary" /> Create Admin Account
              </h3>
              <button 
                onClick={() => setShowAddModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <FiX size={24} />
              </button>
            </div>
            
            <form onSubmit={handleAddSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={newAdmin.email}
                  onChange={(e) => setNewAdmin({...newAdmin, email: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-bg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary outline-none transition-all"
                  placeholder="e.g. tech_head@gecjamui.ac.in"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Temporary Password</label>
                <input
                  type="password"
                  required
                  value={newAdmin.password}
                  onChange={(e) => setNewAdmin({...newAdmin, password: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-bg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary outline-none transition-all"
                  placeholder="••••••••"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Assigned Role</label>
                <select
                  value={newAdmin.role}
                  onChange={(e) => setNewAdmin({...newAdmin, role: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-bg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary outline-none transition-all"
                >
                  <option value="technical">Technical Admin</option>
                  <option value="cultural">Cultural Admin</option>
                  <option value="sports">Sports Admin</option>
                </select>
                <p className="text-[10px] text-gray-500 mt-2 italic">* Specified admin can only manage events/teams in their category.</p>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-4 bg-primary hover:bg-yellow-600 text-white font-bold rounded-xl shadow-lg transition-all"
                >
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminManagement;
