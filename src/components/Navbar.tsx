
import { Github } from 'lucide-react';
import { Button } from './ui/button';
import Image from './ui/image';

const Navbar = () => {
  return (
    <nav className="fixed w-full top-0 z-50 bg-custom-dark/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image 
            src="/images/db3a807c-c152-4004-b592-a9ffbdff06b0.png" 
            alt="AlphaPebble Logo" 
            className="h-10 w-10 rounded-full object-cover"
          />
          <div className="text-custom-light font-bold text-xl font-sans">
            AlphaPebble
          </div>
        </div>
        <div className="flex items-center gap-4">
          <a href="https://github.com/alphapebble" target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" className="text-custom-light hover:text-[#40C057]">
              <Github className="w-5 h-5" />
            </Button>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
