import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import sponsorsService from '../../services/sponsorsService';
import toast, { Toaster } from 'react-hot-toast';
import { FiArrowLeft, FiUploadCloud, FiX } from 'react-icons/fi';

const SponsorForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(isEditing);
  
  // Form State
  const [name, setName] = useState('');
  const [type, setType] = useState('gold');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [order, setOrder] = useState('0');
  const [isActive, setIsActive] = useState(true);
  
  // Image State
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    const fetchSponsor = async () => {
      if (!isEditing) return;
      try {
        const data = await sponsorsService.getAll();
        const sponsor = data.find(s => s._id === id);
        if (!sponsor) throw new Error('Sponsor not found');
        
        setName(sponsor.name || '');
        setType(sponsor.type || 'gold');
        setWebsiteUrl(sponsor.websiteUrl || '');
        setOrder(sponsor.order?.toString() || '0');
        setIsActive(sponsor.isActive !== false);
        
        const imgUrl = sponsor.imageUrl;
        if (imgUrl && imgUrl.startsWith('/uploads')) {
          const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
          setImagePreview(`${baseUrl}${imgUrl}`);
        } else {
          setImagePreview(imgUrl || '');
        }
      } catch (error) {
        toast.error('Failed to load sponsor data');
        console.error(error);
        navigate('/admin/sponsors');
      } finally {
        setInitialLoading(false);
      }
    };

    fetchSponsor();
  }, [id, isEditing, navigate]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error('Logo size must be less than 2MB');
        return;
      }
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name || (!imageFile && !imagePreview)) {
      toast.error('Please fill in Sponsor Name and upload a Logo.');
      return;
    }

    setLoading(true);
    
    const formData = new FormData();
    formData.append('name', name);
    formData.append('type', type);
    formData.append('websiteUrl', websiteUrl);
    formData.append('order', parseInt(order, 10) || 0);
    formData.append('isActive', isActive);
    
    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      if (isEditing) {
        await sponsorsService.update(id, formData);
        toast.success('Sponsor updated successfully');
      } else {
        await sponsorsService.create(formData);
        toast.success('Sponsor added successfully');
      }
      navigate('/admin/sponsors');
    } catch (error) {
      toast.error(error.response?.data?.error || `Failed to ${isEditing ? 'update' : 'add'} sponsor`);
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
      
      <div className="flex items-center gap-4 mb-8 border-b border-gray-200 dark:border-dark-border pb-6">
        <Link 
          to="/admin/sponsors" 
          className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-dark-border rounded-full transition-colors"
        >
          <FiArrowLeft className="w-6 h-6" />
        </Link>
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-900 dark:text-white">
            {isEditing ? 'Edit Sponsor' : 'Add New Sponsor'}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            {isEditing ? 'Update sponsor logo and details.' : 'Showcase a new partner or sponsor on the website.'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        <div className="bg-white dark:bg-dark-card rounded-2xl shadow-sm border border-gray-200 dark:border-dark-border p-6 md:p-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Sponsor Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Sponsor Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Google"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-dark-border bg-white dark:bg-dark-bg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Sponsorship Tier *
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-dark-border bg-white dark:bg-dark-bg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              >
                <option value="title">Title Sponsor</option>
                <option value="gold">Gold Sponsor</option>
                <option value="silver">Silver Sponsor</option>
                <option value="bronze">Bronze Sponsor</option>
                <option value="partner">Event Partner</option>
                <option value="media">Media Partner</option>
              </select>
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
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Website URL
              </label>
              <input
                type="url"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                placeholder="https://www.google.com"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-dark-border bg-white dark:bg-dark-bg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-dark-card rounded-2xl shadow-sm border border-gray-200 dark:border-dark-border p-6 md:p-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Logo Upload</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="w-full">
              <label className="relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-primary dark:hover:border-primary rounded-xl cursor-pointer bg-gray-50 dark:bg-dark-bg/50 hover:bg-gray-100 dark:hover:bg-dark-bg transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
                  <FiUploadCloud className="w-10 h-10 text-gray-400 mb-3" />
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400 font-semibold text-primary">Upload Logo</p>
                  <p className="text-xs text-gray-400">PNG or WebP (Max 2MB)</p>
                </div>
                <input 
                  type="file" 
                  className="hidden" 
                  accept="image/jpeg, image/png, image/webp"
                  onChange={handleImageChange}
                />
              </label>
            </div>

            <div className="w-full flex justify-center border border-gray-100 dark:border-dark-border rounded-xl p-4 bg-gray-50 dark:bg-dark-bg/20 min-h-[12rem] items-center">
              {imagePreview ? (
                <div className="relative w-40 h-40 flex items-center justify-center bg-white rounded-lg shadow-inner p-2 border border-gray-100">
                   <img 
                     src={imagePreview} 
                     alt="Preview" 
                     className="object-contain w-full h-full" 
                   />
                </div>
              ) : (
                <p className="text-gray-400 text-sm italic">Logo preview will appear here</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-4 pt-4">
          <Link 
            to="/admin/sponsors"
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
              isEditing ? 'Save Changes' : 'Add Sponsor'
            )}
          </button>
        </div>

      </form>
    </div>
  );
};

export default SponsorForm;
