import { Outlet, Navigate, NavLink, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FiLayout, FiCalendar, FiUsers, FiImage, FiLogOut, FiMenu, FiX, FiHome, FiGift, FiShield } from 'react-icons/fi';
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const menuItems = [
    { path: '/admin/dashboard', icon: FiLayout, label: 'Dashboard' },
    { path: '/admin/events', icon: FiCalendar, label: 'Events' },
    { path: '/admin/team', icon: FiUsers, label: 'Team' },
    { path: '/admin/gallery', icon: FiImage, label: 'Gallery' },
  ];

  if (user?.role === 'global') {
    menuItems.push({ path: '/admin/sponsors', icon: FiGift, label: 'Sponsors' });
    menuItems.push({ path: '/admin/accounts', icon: FiShield, label: 'Manage Admins' });
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="flex bg-gray-100 dark:bg-dark-bg min-h-screen">
      <Toaster position="top-right" />
      
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-dark-card border-r border-gray-200 dark:border-dark-border z-30 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 dark:border-dark-border">
          <span className="text-xl font-bold font-display text-primary">Aarambh Admin</span>
          <button 
            className="lg:hidden text-gray-500"
            onClick={() => setIsSidebarOpen(false)}
          >
            <FiX size={24} />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsSidebarOpen(false)}
                className={({ isActive }) => 
                  `flex items-center px-4 py-3 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-primary/10 text-primary font-medium' 
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-dark-bg'
                  }`
                }
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.label}
              </NavLink>
            );
          })}
          
          <div className="pt-4 mt-4 border-t border-gray-200 dark:border-dark-border">
            <Link to="/" className="flex items-center px-4 py-3 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-dark-bg rounded-lg transition-colors">
              <FiHome className="w-5 h-5 mr-3" />
              Back to Site
            </Link>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:pl-64 flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="h-16 bg-white dark:bg-dark-card border-b border-gray-200 dark:border-dark-border flex items-center justify-between px-4 lg:px-8 sticky top-0 z-10">
          <button 
            className="lg:hidden p-2 text-gray-600 dark:text-gray-300"
            onClick={() => setIsSidebarOpen(true)}
          >
            <FiMenu size={24} />
          </button>
          
          <div className="ml-auto flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 hidden sm:block">
              {user.email}
            </span>
            <button
              onClick={handleLogout}
              className="flex items-center px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
            >
              <FiLogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-4 lg:p-8 flex-1">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
