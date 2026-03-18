import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import galleryService from '../../services/galleryService';
import SectionHeading from '../../components/SectionHeading';
import TabSwitcher from '../../components/TabSwitcher';
import { GalleryCard, ImageLightbox } from '../../components/GalleryComponents';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeEdition, setActiveEdition] = useState('3.0');
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);

  const editionTabs = [
    { id: '3.0', label: 'Aarambh 3.0 (Prep)' },
    { id: '2.0', label: 'Archive 2.0' },
    { id: '1.0', label: 'Archive 1.0' }
  ];

  const categories = ['all', 'technical', 'cultural', 'candid', 'stage'];

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await galleryService.getAll(activeEdition);
        setImages(data);
      } catch (err) {
        console.error('Error fetching gallery images:', err);
        setError('Failed to load gallery images. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [activeEdition]);

  const filteredImages = activeCategory === 'all' 
    ? images 
    : images.filter(img => img.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg transition-colors duration-300 py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Header */}
        <div className="text-center mb-12">
          <SectionHeading 
            title="The Gallery" 
            subtitle="Relive the golden moments, the epic performances, and the vibrant campus life."
            centered
          />
        </div>

        {/* Edition Tabs */}
        <div className="mb-8">
          <TabSwitcher 
            tabs={editionTabs} 
            activeTab={activeEdition} 
            onTabChange={setActiveEdition} 
          />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat 
                  ? 'bg-primary text-white shadow-md' 
                  : 'bg-white dark:bg-dark-card text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-border hover:border-primary/50'
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="min-h-[400px]">
          
          {/* Error State */}
          {error && (
            <div className="text-center text-red-500 p-8 bg-red-50 dark:bg-red-900/10 rounded-xl">
              <p>{error}</p>
              <button 
                onClick={() => setActiveEdition(activeEdition)} 
                className="mt-4 px-4 py-2 bg-red-100 dark:bg-red-800 rounded hover:bg-red-200 dark:hover:bg-red-700 transition-colors"
              >
                Retry
              </button>
            </div>
          )}

          {/* Loading Skeleton */}
          {loading && !error && (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="animate-pulse bg-white dark:bg-dark-card rounded-xl h-64 border border-gray-100 dark:border-dark-border break-inside-avoid" />
              ))}
            </div>
          )}

          {/* Masonry Grid */}
          {!loading && !error && (
            <motion.div
              layout
              className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
            >
              {filteredImages.length > 0 ? (
                filteredImages.map((image) => (
                  <GalleryCard 
                    key={image.id} 
                    image={image} 
                    onClick={setSelectedImage} 
                  />
                ))
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center py-24 text-center break-inside-avoid w-full">
                   <div className="w-24 h-24 mb-6 rounded-full bg-gray-100 dark:bg-dark-card flex items-center justify-center border border-gray-200 dark:border-dark-border">
                     <span className="text-4xl">📸</span>
                   </div>
                   <h3 className="text-2xl font-display font-medium text-gray-900 dark:text-white mb-2">
                     No Images Found
                   </h3>
                   <p className="text-gray-500 dark:text-gray-400 max-w-md">
                     We don't have any images in this category for {activeEdition} right now. Check back soon for updates!
                   </p>
                </div>
              )}
            </motion.div>
          )}

        </div>
      </div>

      {/* Fullscreen Lightbox */}
      {selectedImage && (
        <ImageLightbox 
          image={selectedImage} 
          onClose={() => setSelectedImage(null)} 
        />
      )}
    </div>
  );
};

export default Gallery;
