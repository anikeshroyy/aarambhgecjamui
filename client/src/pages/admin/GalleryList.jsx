import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import galleryService from '../../services/galleryService';
import toast, { Toaster } from 'react-hot-toast';
import { FiTrash2, FiPlus, FiImage } from 'react-icons/fi';

const GalleryList = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeEdition, setActiveEdition] = useState('3.0');

  const fetchImages = async () => {
    setLoading(true);
    try {
      const data = await galleryService.getAll(activeEdition);
      setImages(data);
    } catch (error) {
      toast.error('Failed to load gallery images');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, [activeEdition]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this image? This action cannot be undone.')) {
      try {
        await galleryService.delete(id);
        toast.success('Image deleted successfully');
        setImages(images.filter(img => img.id !== id));
      } catch (error) {
        toast.error('Failed to delete image');
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
          <h1 className="text-3xl font-display font-bold text-gray-900 dark:text-white">Gallery Management</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage photos from Aarambh editions.</p>
        </div>
        <Link 
          to="/admin/gallery/upload" 
          className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-yellow-600 text-white font-medium rounded-lg transition-colors shadow-sm"
        >
          <FiPlus /> Upload Photo
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 p-1 bg-gray-100 dark:bg-dark-card rounded-lg inline-flex">
        {['3.0', '2.0', '1.0'].map(edition => (
          <button
            key={edition}
            onClick={() => setActiveEdition(edition)}
            className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${
              activeEdition === edition 
                ? 'bg-white dark:bg-dark-bg text-primary shadow-sm' 
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            Aarambh {edition}
          </button>
        ))}
      </div>

      {/* Grid */}
      {loading ? (
        <div className="flex justify-center py-12">
           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : images.length === 0 ? (
         <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-dark-card rounded-xl border border-gray-200 dark:border-dark-border border-dashed">
            <FiImage className="w-16 h-16 text-gray-300 dark:text-gray-600 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No Images Found</h3>
            <p className="text-gray-500">There are no photos uploaded for Aarambh {activeEdition} yet.</p>
         </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {images.map(image => (
            <div key={image.id} className="group bg-white dark:bg-dark-card rounded-xl overflow-hidden shadow-sm border border-gray-200 dark:border-dark-border hover:shadow-md transition-shadow relative">
              <div className="aspect-square bg-gray-100 dark:bg-gray-800">
                <img 
                  src={image.imageUrl} 
                  alt={image.category} 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-3">
                <span className="inline-block px-2 text-xs font-semibold text-primary uppercase bg-primary/10 rounded">
                  {image.category}
                </span>
                <p className="text-xs text-gray-500 mt-1 truncate">ID: {image.id.slice(0, 8)}...</p>
              </div>
              
              {/* Delete Overlay */}
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                 <button 
                   onClick={() => handleDelete(image.id)}
                   className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-lg"
                 >
                   <FiTrash2 className="w-4 h-4" />
                 </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GalleryList;
