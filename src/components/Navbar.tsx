
import { Github } from 'lucide-react';
import { Button } from './ui/button';

const Navbar = () => {
  return (
    <nav className="fixed w-full top-0 z-50 bg-custom-dark/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="text-custom-light font-bold text-xl">
          alphapebble
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" className="text-custom-light hover:text-custom-accent">
            About
          </Button>
          <Button variant="ghost" className="text-custom-light hover:text-custom-accent">
            Experiments
          </Button>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" className="text-custom-light hover:text-custom-accent">
              <Github className="w-5 h-5" />
            </Button>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
