import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiInstagram, FiLinkedin, FiMail } from 'react-icons/fi';

const getFullImageUrl = (url) => {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
  return `${baseUrl}${url}`;
};

const CoordinatorCard = ({ member, isHead = false }) => {
  const [imgError, setImgError] = useState(false);
  const fallbackImage = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=random&color=fff&size=512`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className={`group flex flex-col bg-white dark:bg-dark-card rounded-2xl overflow-hidden transition-all duration-300 ${
        isHead 
          ? 'shadow-xl hover:shadow-2xl border-2 border-primary/20 dark:border-primary/30 transform hover:-translate-y-2' 
          : 'shadow-md hover:shadow-xl border border-gray-100 dark:border-dark-border transform hover:-translate-y-1'
      }`}
    >
      {/* Image Section */}
      <div className={`relative overflow-hidden ${isHead ? 'h-80' : 'h-64'} bg-gray-200 dark:bg-gray-800`}>
        <img 
          src={imgError ? fallbackImage : (getFullImageUrl(member.imageUrl) || fallbackImage)}  
          alt={member.name}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
        
        {/* Social Links overlay on hover */}
        <div className="absolute inset-0 bg-primary/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 flex items-center justify-center gap-4 transition-opacity duration-300">
          {(member.socialLinks?.instagram || member.socialLinks?.linkedin || member.socialLinks?.email) ? (
            <>
              {member.socialLinks.instagram && (
                <a href={member.socialLinks.instagram} target="_blank" rel="noreferrer" className="p-3 bg-white/20 hover:bg-white text-white hover:text-primary rounded-full transition-colors transform hover:scale-110">
                  <FiInstagram className="w-5 h-5" />
                </a>
              )}
              {member.socialLinks.linkedin && (
                <a href={member.socialLinks.linkedin} target="_blank" rel="noreferrer" className="p-3 bg-white/20 hover:bg-white text-white hover:text-primary rounded-full transition-colors transform hover:scale-110">
                  <FiLinkedin className="w-5 h-5" />
                </a>
              )}
              {member.socialLinks.email && (
                <a href={`mailto:${member.socialLinks.email}`} className="p-3 bg-white/20 hover:bg-white text-white hover:text-primary rounded-full transition-colors transform hover:scale-110">
                  <FiMail className="w-5 h-5" />
                </a>
              )}
            </>
          ) : (
             <span className="text-white font-medium">No Social Links</span>
          )}
        </div>
      </div>

      {/* Info Section */}
      <div className="p-6 text-center">
        {isHead && (
          <span className="inline-block px-3 py-1 mb-3 text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 rounded-full">
            Core Committee
          </span>
        )}
        <h3 className={`font-display font-bold text-gray-900 dark:text-white mb-1 ${isHead ? 'text-2xl' : 'text-xl'}`}>
          {member.name}
        </h3>
        <p className="text-primary font-medium">{member.role}</p>
        
        {member.branch && member.year && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            {member.branch} • {member.year} Year
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default CoordinatorCard;
