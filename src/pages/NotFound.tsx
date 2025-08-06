import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error('404 Error: User attempted to access non-existent route:', location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-custom-dark">
      <Navbar />
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="text-center px-4">
          <h1 className="text-6xl font-bold text-custom-light mb-4">404</h1>
          <p className="text-2xl text-custom-light/70 mb-8">Oops! Page not found</p>
          <p className="text-custom-light/60 mb-8 max-w-md mx-auto">
            The page you are looking for might have been removed, had its name changed, or is
            temporarily unavailable.
          </p>
          <Link to="/">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Home className="mr-2 h-4 w-4" /> Return to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
