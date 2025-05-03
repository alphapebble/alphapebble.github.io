
import { Button } from './ui/button';
import Image from './ui/image';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="fixed w-full top-0 z-50 bg-custom-dark">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/">
            <Image
              src="/images/db3a807c-c152-4004-b592-a9ffbdff06b0.png"
              alt="AlphaPebble Logo"
              className="h-10 w-10 object-cover rounded-full"
            />
          </Link>
          <Link to="/" className="text-custom-light font-medium text-xl font-sans">
            AlphaPebble
          </Link>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <Link to="/services" className="text-custom-light hover:text-gray-400 font-medium">
            Services
          </Link>
          <Link to="/case-studies" className="text-custom-light hover:text-gray-400 font-medium">
            Case Studies
          </Link>
          <Link to="/team" className="text-custom-light hover:text-gray-400 font-medium">
            Our Team
          </Link>
          <Link to="/contact">
            <Button variant="outline" className="text-custom-light border-custom-light/20 hover:bg-custom-light/10">
              Contact Us
            </Button>
          </Link>
        </div>
        <div className="md:hidden flex items-center">
          <Button variant="outline" className="text-custom-light border-custom-light/20 hover:bg-custom-light/10">
            <Link to="/contact">Contact</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
