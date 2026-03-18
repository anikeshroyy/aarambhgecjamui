import { motion } from 'framer-motion';

const TabSwitcher = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="flex justify-center mb-10">
      <div className="bg-gray-100 dark:bg-dark-card p-1 rounded-xl inline-flex relative shadow-inner">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`relative py-2.5 px-6 rounded-lg text-sm font-medium transition-colors focus:outline-none z-10 ${
              activeTab === tab.id 
                ? 'text-white' 
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTabBadge"
                className="absolute inset-0 bg-primary rounded-lg shadow-md"
                initial={false}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                style={{ zIndex: -1 }}
              />
            )}
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabSwitcher;
