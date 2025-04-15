
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-custom-dark">
      <Navbar />
      <HeroSection />
      <footer className="py-8 text-center text-custom-light/60">
        <p>© 2024 alphapebble. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Index;
