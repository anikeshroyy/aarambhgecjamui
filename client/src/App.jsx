import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Layouts and Wrappers
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './components/admin/AdminLayout';

// Public Pages
import Home from './pages/public/Home';
import Events from './pages/public/Events';
import Team from './pages/public/Team';
import About from './pages/public/About';
import Gallery from './pages/public/Gallery';
import Schedule from './pages/public/Schedule';
import Developers from './pages/public/Developers';
import NotFound from './pages/public/NotFound';

// Admin Pages
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import EventsList from './pages/admin/EventsList';
import EventForm from './pages/admin/EventForm';
import TeamList from './pages/admin/TeamList';
import TeamForm from './pages/admin/TeamForm';
import GalleryList from './pages/admin/GalleryList';
import GalleryUpload from './pages/admin/GalleryUpload';

// Custom wrapper for public layout (Navbar + Footer)
const PublicLayout = ({ children }) => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <main className="flex-grow pt-20">
      {children}
    </main>
    <Footer />
  </div>
);

// Custom wrapper for Animations
const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public Routes */}
          <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
          <Route path="/events" element={<PublicLayout><Events /></PublicLayout>} />
          <Route path="/team" element={<PublicLayout><Team /></PublicLayout>} />
          <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
          <Route path="/gallery" element={<PublicLayout><Gallery /></PublicLayout>} />
          <Route path="/schedule" element={<PublicLayout><Schedule /></PublicLayout>} />
          <Route path="/developers" element={<PublicLayout><Developers /></PublicLayout>} />
          
          {/* Public Admin Login */}
          <Route path="/admin" element={<Login />} />
          <Route path="/admin/login" element={<Login />} />
          
          {/* Protected Admin Routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/events" element={<EventsList />} />
              <Route path="/admin/events/add" element={<EventForm />} />
              <Route path="/admin/events/edit/:id" element={<EventForm />} />
              <Route path="/admin/team" element={<TeamList />} />
              <Route path="/admin/team/add" element={<TeamForm />} />
              <Route path="/admin/team/edit/:id" element={<TeamForm />} />
              <Route path="/admin/gallery" element={<GalleryList />} />
              <Route path="/admin/gallery/upload" element={<GalleryUpload />} />
            </Route>
          </Route>
          
          {/* Catch all 404 */}
          <Route path="*" element={<PublicLayout><NotFound /></PublicLayout>} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <AnimatedRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;
