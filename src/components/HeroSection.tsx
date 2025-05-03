
import { Button } from './ui/button';
import Image from './ui/image';
import { Link } from 'react-router-dom';
import { ArrowRight, Lightbulb, Rocket, Zap } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <div className="absolute inset-0 bg-custom-dark"></div>
      <div className="container mx-auto px-4 z-10 relative">
        <div className="flex flex-col items-center text-center mb-12">
          <Image
            src="/images/logo.png"
            alt="AlphaPebble Logo"
            className="h-24 w-24 object-cover rounded-full mb-8"
          />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-custom-light mb-6 leading-tight">
            Turning Startup Ideas into <br className="hidden md:block" />
            <span className="text-blue-400">Successful Experiments</span>
          </h1>
          <p className="text-xl text-custom-light/80 mb-8 max-w-2xl mx-auto">
            We help startups validate ideas quickly through tiny, focused experiments.
            Our expert consulting team turns concepts into reality with minimal risk.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Link to="/services">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg">
                Our Services <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" className="text-custom-light border-custom-light/20 hover:bg-custom-light/10 px-8 py-6 text-lg">
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
            <div className="bg-blue-600/20 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Lightbulb className="h-6 w-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-custom-light mb-3">Idea Validation</h3>
            <p className="text-custom-light/70">
              Test your startup concepts with minimal investment before committing resources.
            </p>
          </div>

          <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
            <div className="bg-blue-600/20 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Zap className="h-6 w-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-custom-light mb-3">Rapid Prototyping</h3>
            <p className="text-custom-light/70">
              Transform ideas into working prototypes in days, not months, with our agile approach.
            </p>
          </div>

          <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
            <div className="bg-blue-600/20 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Rocket className="h-6 w-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-custom-light mb-3">Growth Strategy</h3>
            <p className="text-custom-light/70">
              Scale successful experiments with our proven frameworks for sustainable growth.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

