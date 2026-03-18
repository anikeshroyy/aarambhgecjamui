import { motion } from 'framer-motion';

const SectionHeading = ({ title, subtitle, centered = false }) => {
  return (
    <div className={`mb-12 ${centered ? 'text-center flex flex-col items-center' : ''}`}>
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white capitalize"
      >
        {title}
      </motion.h2>
      
      <motion.div 
        initial={{ opacity: 0, width: 0 }}
        whileInView={{ opacity: 1, width: 64 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="h-1 bg-primary rounded mt-3" 
        style={{ width: '4rem' }}
      />
      
      {subtitle && (
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};

export default SectionHeading;
