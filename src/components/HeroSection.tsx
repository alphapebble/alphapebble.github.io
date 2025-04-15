
import { Button } from './ui/button';
import Image from './ui/image';

const HeroSection = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-custom-gradient-start to-custom-gradient-end opacity-20 animate-gradient"></div>
      <div className="container mx-auto px-4 text-center z-10 relative">
        <div className="flex justify-center mb-8">
          <Image 
            src="/lovable-uploads/f803d6ac-8eb9-448f-82b6-fd50c584becc.png" 
            alt="AlphaPebble Logo" 
            className="h-24 w-24 animate-pulse shadow-lg rounded-full border-4 border-custom-light/20"
          />
        </div>
        <h1 className="text-5xl md:text-7xl font-bold text-custom-light mb-6 drop-shadow-md">
          AI Experiments
        </h1>
        <p className="text-xl md:text-2xl text-custom-light/90 mb-8 max-w-2xl mx-auto opacity-90">
          Explore cutting-edge AI capabilities through interactive, bite-sized experiments.
        </p>
        <Button className="bg-custom-purple hover:bg-custom-purple/90 text-custom-light px-8 py-6 text-lg shadow-lg">
          Start Exploring
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;
