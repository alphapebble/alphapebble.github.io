
import { Button } from './ui/button';
import Image from './ui/image';

const HeroSection = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-custom-gradient-start/10 to-custom-gradient-end/10 opacity-20 animate-gradient"></div>
      <div className="container mx-auto px-4 text-center z-10 relative">
        <div className="flex justify-center mb-8">
          <Image 
            src="/lovable-uploads/db3a807c-c152-4004-b592-a9ffbdff06b0.png" 
            alt="AlphaPebble Logo" 
            className="h-24 w-24 animate-pulse"
          />
        </div>
        <h1 className="text-5xl md:text-7xl font-bold text-custom-light mb-6 drop-shadow-md font-sans">
          AlphaPebble
        </h1>
        <p className="text-xl md:text-2xl text-custom-light/90 mb-12 max-w-2xl mx-auto">
          Stealth Mode
        </p>
        <div className="mt-12">
          <Button className="bg-[#40C057] hover:bg-[#40C057]/90 text-white px-8 py-6 text-lg shadow-lg">
            Coming Soon
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

