import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <h1 className="text-6xl font-display font-bold text-primary mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200">Page Not Found</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md text-center">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link 
        to="/" 
        className="px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-yellow-600 transition-colors"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;
