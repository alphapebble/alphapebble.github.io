
import { Button } from './ui/button';
import Image from './ui/image';

const HeroSection = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-custom-dark"></div>
      <div className="container mx-auto px-4 text-center z-10 relative">
        <div className="flex justify-center mb-12">
          <Image
            src="/images/logo.png"
            alt="AlphaPebble Logo"
            className="h-32 w-32 object-cover rounded-full"
          />
        </div>
        <p className="text-xl text-custom-light/70 mb-12 max-w-2xl mx-auto">
          We're working on something new. Currently in stealth mode.
        </p>
        <div className="mt-12">
          <a href="mailto:contact@alphapebble.com">
            <Button variant="outline" className="text-custom-light border-custom-light/20 hover:bg-custom-light/10 px-8 py-6 text-lg">
              Get in Touch
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

