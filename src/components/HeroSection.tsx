
import { Button } from './ui/button';

const HeroSection = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-custom-gradient-start to-custom-gradient-end opacity-20 animate-gradient"></div>
      <div className="container mx-auto px-4 text-center z-10">
        <h1 className="text-5xl md:text-7xl font-bold text-custom-light mb-6">
          AI Experiments
        </h1>
        <p className="text-xl md:text-2xl text-custom-light/90 mb-8 max-w-2xl mx-auto">
          Explore the possibilities of artificial intelligence through our collection of tiny, interactive experiments.
        </p>
        <Button className="bg-custom-purple hover:bg-custom-purple/90 text-custom-light px-8 py-6 text-lg">
          Start Exploring
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;
