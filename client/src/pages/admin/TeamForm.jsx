import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import teamService from '../../services/teamService';
import toast, { Toaster } from 'react-hot-toast';
import { FiArrowLeft, FiUploadCloud, FiInstagram, FiLinkedin, FiMail, FiMapPin } from 'react-icons/fi';

const TeamForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(isEditing);
  
  // Form State
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [section, setSection] = useState('technical');
  const [branch, setBranch] = useState('');
  const [year, setYear] = useState('');
  const [order, setOrder] = useState('0');
  
  // Social Links mapping
  const [socialLinks, setSocialLinks] = useState({
    instagram: '',
    linkedin: '',
    email: ''
  });

  // Image State
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  // Load existing data if editing
  useEffect(() => {
    const fetchMember = async () => {
      if (!isEditing) return;
      try {
        const data = await teamService.getById(id);
        setName(data.name || '');
        setRole(data.role || '');
        setSection(data.section || 'technical');
        setBranch(data.branch || '');
        setYear(data.year || '');
        setOrder(data.order?.toString() || '0');
        setSocialLinks(data.socialLinks || { instagram: '', linkedin: '', email: '' });
        
        // Ensure image preview works with backend relative URLs
        const imgUrl = data.imageUrl;
        if (imgUrl && imgUrl.startsWith('/uploads')) {
          setImagePreview(`http://localhost:5000${imgUrl}`);
        } else {
          setImagePreview(imgUrl || '');
        }
      } catch (error) {
        toast.error('Failed to load team member data');
        console.error(error);
        navigate('/admin/team');
      } finally {
        setInitialLoading(false);
      }
    };

    fetchMember();
  }, [id, isEditing, navigate]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size must be less than 5MB');
        return;
      }
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSocialChange = (e) => {
    setSocialLinks({
      ...socialLinks,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name || !role || !section) {
      toast.error('Please fill in Name, Role, and Section.');
      return;
    }

    setLoading(true);
    
    const formData = new FormData();
    formData.append('name', name);
    formData.append('role', role);
    formData.append('section', section);
    formData.append('branch', branch);
    formData.append('year', year);
    formData.append('order', parseInt(order, 10) || 0);
    formData.append('socialLinks', JSON.stringify(socialLinks));
    
    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      if (isEditing) {
        await teamService.update(id, formData);
        toast.success('Team member updated successfully');
      } else {
        await teamService.create(formData);
        toast.success('Team member added successfully');
      }
      navigate('/admin/team');
    } catch (error) {
      toast.error(error.response?.data?.error || `Failed to ${isEditing ? 'update' : 'add'} team member`);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto pb-12 animate-fade-in">
      <Toaster position="top-right" />
      
      {/* Header */}
      <div className="flex items-center gap-4 mb-8 border-b border-gray-200 dark:border-dark-border pb-6">
        <Link 
          to="/admin/team" 
          className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-dark-border rounded-full transition-colors"
        >
          <FiArrowLeft className="w-6 h-6" />
        </Link>
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-900 dark:text-white">
            {isEditing ? 'Edit Team Member' : 'Add Team Member'}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            {isEditing ? 'Update member details and photo.' : 'Add a new coordinator or core team member.'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Main Details Card */}
        <div className="bg-white dark:bg-dark-card rounded-2xl shadow-sm border border-gray-200 dark:border-dark-border p-6 md:p-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Member Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-dark-border bg-white dark:bg-dark-bg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Role/Designation *
              </label>
              <input
                type="text"
                required
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. Technical Head"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-dark-border bg-white dark:bg-dark-bg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Committee Section *
              </label>
              <select
                value={section}
                onChange={(e) => setSection(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-dark-border bg-white dark:bg-dark-bg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              >
                <option value="faculty">Faculty Heads</option>
                <option value="organizing">Organizing Coordinator</option>
                <option value="core">Core Committee</option>
                <option value="technical">Technical Coordinator</option>
                <option value="cultural">Cultural Coordinator</option>
                <option value="sports">Sports Coordinator</option>
                <option value="hospitality">Hospitality & PR</option>
                <option value="media">Media Coordinator</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Branch (Optional)
              </label>
              <input
                type="text"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                placeholder="e.g. CSE"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-dark-border bg-white dark:bg-dark-bg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Year (Optional)
              </label>
              <input
                type="text"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="e.g. 3rd"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-dark-border bg-white dark:bg-dark-bg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Sort Order
              </label>
              <input
                type="number"
                value={order}
                onChange={(e) => setOrder(e.target.value)}
                placeholder="0"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-dark-border bg-white dark:bg-dark-bg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              />
              <p className="text-xs text-gray-500 mt-1">Lower numbers appear first within their section.</p>
            </div>
          </div>
        </div>

        {/* Social Links Card */}
        <div className="bg-white dark:bg-dark-card rounded-2xl shadow-sm border border-gray-200 dark:border-dark-border p-6 md:p-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Social Links (Optional)</h2>
          
          <div className="space-y-4">
            <div className="flex bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent">
               <div className="px-4 py-3 flex items-center justify-center border-r border-gray-200 dark:border-dark-border bg-white dark:bg-dark-card text-gray-500">
                 <FiMapPin className="w-5 h-5 hidden" /> 
                 <FiInstagram className="w-5 h-5" />
               </div>
               <input
                 type="url"
                 name="instagram"
                 value={socialLinks.instagram}
                 onChange={handleSocialChange}
                 placeholder="Instagram URL"
                 className="flex-1 px-4 py-3 bg-transparent outline-none text-gray-900 dark:text-white"
               />
            </div>

            <div className="flex bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent">
               <div className="px-4 py-3 flex items-center justify-center border-r border-gray-200 dark:border-dark-border bg-white dark:bg-dark-card text-gray-500">
                 <FiLinkedin className="w-5 h-5" />
               </div>
               <input
                 type="url"
                 name="linkedin"
                 value={socialLinks.linkedin}
                 onChange={handleSocialChange}
                 placeholder="LinkedIn Profile URL"
                 className="flex-1 px-4 py-3 bg-transparent outline-none text-gray-900 dark:text-white"
               />
            </div>

            <div className="flex bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent">
               <div className="px-4 py-3 flex items-center justify-center border-r border-gray-200 dark:border-dark-border bg-white dark:bg-dark-card text-gray-500">
                 <FiMail className="w-5 h-5" />
               </div>
               <input
                 type="email"
                 name="email"
                 value={socialLinks.email}
                 onChange={handleSocialChange}
                 placeholder="Institutional or Personal Email"
                 className="flex-1 px-4 py-3 bg-transparent outline-none text-gray-900 dark:text-white"
               />
            </div>
          </div>
        </div>

        {/* Media Card */}
        <div className="bg-white dark:bg-dark-card rounded-2xl shadow-sm border border-gray-200 dark:border-dark-border p-6 md:p-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Profile Photo</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            
            {/* Upload Area */}
            <div className="w-full">
              <label className="relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-primary dark:hover:border-primary rounded-xl cursor-pointer bg-gray-50 dark:bg-dark-bg/50 hover:bg-gray-100 dark:hover:bg-dark-bg transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
                  <FiUploadCloud className="w-10 h-10 text-gray-400 mb-3" />
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold text-primary">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-400">Square images recommended (Max 5MB)</p>
                </div>
                <input 
                  type="file" 
                  className="hidden" 
                  accept="image/jpeg, image/png, image/webp"
                  onChange={handleImageChange}
                />
              </label>
            </div>

            {/* Preview Area */}
            <div className="w-full flex justify-center border border-gray-100 dark:border-dark-border rounded-xl p-4 bg-gray-50 dark:bg-dark-bg/20 min-h-[16rem] items-center">
              {imagePreview ? (
                <div className="relative w-48 h-48 overflow-hidden rounded-full shadow-lg border-4 border-white dark:border-dark-card">
                   <img 
                     src={imagePreview} 
                     alt="Preview" 
                     className="object-cover w-full h-full" 
                   />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-gray-400">
                  <div className="w-32 h-32 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center mb-2">
                    <FiUploadCloud className="w-8 h-8 opacity-50" />
                  </div>
                  <p className="text-sm">Preview</p>
                </div>
              )}
            </div>
            
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-4 pt-4">
          <Link 
            to="/admin/team"
            className="px-6 py-3 font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-border rounded-lg transition-colors border border-gray-200 dark:border-dark-border"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3 bg-primary hover:bg-yellow-600 text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center min-w-[150px]"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              isEditing ? 'Save Changes' : 'Add Member'
            )}
          </button>
        </div>

      </form>
    </div>
  );
};

export default TeamForm;
