import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import galleryService from '../../services/galleryService';
import toast, { Toaster } from 'react-hot-toast';
import { FiArrowLeft, FiUploadCloud } from 'react-icons/fi';

const GalleryUpload = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const [edition, setEdition] = useState('3.0');
  const [category, setCategory] = useState('technical');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  const categories = ['technical', 'cultural', 'candid', 'stage', 'highlights', 'glimpses'];
  const editions = ['3.0', '2.0', '1.0'];

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!imageFile) {
      toast.error('Please select an image to upload.');
      return;
    }

    setLoading(true);
    
    const formData = new FormData();
    formData.append('edition', edition);
    formData.append('category', category);
    formData.append('image', imageFile);

    try {
      await galleryService.upload(formData);
      toast.success('Photo uploaded successfully');
      navigate('/admin/gallery');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to upload photo');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto pb-12 animate-fade-in">
      <Toaster position="top-right" />
      
      {/* Header */}
      <div className="flex items-center gap-4 mb-8 border-b border-gray-200 dark:border-dark-border pb-6">
        <Link 
          to="/admin/gallery" 
          className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-dark-border rounded-full transition-colors"
        >
          <FiArrowLeft className="w-6 h-6" />
        </Link>
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-900 dark:text-white">Upload Photo</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Add new memories to the fest gallery.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        <div className="bg-white dark:bg-dark-card rounded-2xl shadow-sm border border-gray-200 dark:border-dark-border p-6 md:p-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Aarambh Edition *
              </label>
              <select
                value={edition}
                onChange={(e) => setEdition(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-dark-border bg-white dark:bg-dark-bg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              >
                {editions.map(ed => (
                  <option key={ed} value={ed}>{ed}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Photo Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-dark-border bg-white dark:bg-dark-bg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all capitalize"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
               Upload Image *
             </label>
             {imagePreview ? (
                <div className="relative group rounded-xl overflow-hidden border border-gray-200 dark:border-dark-border">
                  <img src={imagePreview} alt="Preview" className="w-full object-contain max-h-[500px] bg-gray-50 dark:bg-dark-bg" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button 
                      type="button"
                      onClick={() => {
                        setImageFile(null);
                        setImagePreview('');
                      }}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium shadow-lg"
                    >
                      Remove Image
                    </button>
                  </div>
                </div>
             ) : (
                <label className="flex flex-col items-center justify-center w-full h-80 border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-primary dark:hover:border-primary rounded-xl cursor-pointer bg-gray-50 dark:bg-dark-bg/50 hover:bg-gray-100 dark:hover:bg-dark-bg transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
                    <FiUploadCloud className="w-16 h-16 text-gray-400 mb-4" />
                    <p className="mb-2 text-gray-500 dark:text-gray-400">
                      <span className="font-semibold text-primary">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-sm text-gray-400">High quality images recommended (Max 5MB)</p>
                  </div>
                  <input 
                    type="file" 
                    className="hidden" 
                    accept="image/jpeg, image/png, image/webp"
                    onChange={handleImageChange}
                  />
                </label>
             )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-4">
          <Link 
            to="/admin/gallery"
            className="px-6 py-3 font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-border rounded-lg transition-colors border border-gray-200 dark:border-dark-border"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading || !imageFile}
            className="px-8 py-3 bg-primary hover:bg-yellow-600 text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center min-w-[150px]"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              'Upload Photo'
            )}
          </button>
        </div>

      </form>
    </div>
  );
};

export default GalleryUpload;
