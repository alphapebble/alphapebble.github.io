
import HeroSection from '../components/HeroSection';
import Navbar from '../components/Navbar';

const Index = () => {
  return (
    <div className="min-h-screen bg-custom-dark">
      <Navbar />
      <HeroSection />
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-medium text-custom-light mb-6">About Us</h2>
          <p className="text-custom-light/70 mb-8">
            We're a stealth mode startup working at the intersection of AI, data engineering, and microservices.
            More details coming soon.
          </p>
        </div>
      </div>
      <footer className="py-8 text-center text-custom-light/60">
        <p>© 2024 alphapebble. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Index;
