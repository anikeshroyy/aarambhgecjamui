import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiZoomIn } from 'react-icons/fi';

const getFullImageUrl = (url) => {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
  return `${baseUrl}${url}`;
};

export const GalleryCard = ({ image, onClick }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group relative cursor-pointer overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 bg-gray-200 dark:bg-gray-800 break-inside-avoid mb-6"
      onClick={() => onClick(image)}
    >
      <img
        src={getFullImageUrl(image.imageUrl)}
        alt={image.category}
        className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300 group-hover:scale-105"
        loading="lazy"
      />
      
      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
        <div className="flex justify-between items-end transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          <div>
            <span className="inline-block px-2.5 py-1 bg-primary/20 backdrop-blur-md text-yellow-100 border border-primary/30 rounded text-xs font-bold uppercase tracking-wider mb-2">
              {image.category}
            </span>
            <p className="text-white text-sm font-medium drop-shadow-md">Aarambh {image.edition}</p>
          </div>
          <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white">
            <FiZoomIn className="w-5 h-5" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const ImageLightbox = ({ image, onClose }) => {
  if (!image) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 md:p-8 backdrop-blur-sm"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 md:top-8 md:right-8 z-[110] p-3 text-white/70 hover:text-white bg-black/50 hover:bg-black/80 rounded-full backdrop-blur-md transition-all"
        >
          <FiX className="w-6 h-6" />
        </button>

        {/* Image Container */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative max-w-7xl max-h-[90vh] w-full flex items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={getFullImageUrl(image.imageUrl)}
            alt={image.category}
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
          />
          
          {/* Info Bar */}
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent rounded-b-lg pointer-events-none">
            <span className="inline-block px-3 py-1 bg-primary text-white rounded text-sm font-bold uppercase tracking-wider mb-2">
              {image.category}
            </span>
            <h3 className="text-white text-xl font-medium">Aarambh {image.edition} Memories</h3>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
