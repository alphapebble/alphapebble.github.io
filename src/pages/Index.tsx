
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import ExperimentCard from '../components/ExperimentCard';

const experiments = [
  {
    title: "Text Generation",
    description: "Experience AI-powered creative writing and story generation.",
    icon: "✍️",
    caption: "Unleash your creativity with AI-driven storytelling"
  },
  {
    title: "Image Analysis",
    description: "Analyze and understand images using computer vision.",
    icon: "🔍",
    caption: "Discover insights hidden in visual data"
  },
  {
    title: "Pattern Recognition",
    description: "Discover patterns in data through machine learning.",
    icon: "🧮",
    caption: "Extract meaningful patterns from complex datasets"
  },
  {
    title: "Voice Synthesis",
    description: "Convert text to natural-sounding speech.",
    icon: "🔊",
    caption: "Transform text into lifelike spoken words"
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-custom-dark">
      <Navbar />
      <HeroSection />
      <section className="py-20 container mx-auto px-4">
        <h2 className="text-3xl font-bold text-custom-light text-center mb-12">
          Featured Experiments
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {experiments.map((experiment) => (
            <ExperimentCard
              key={experiment.title}
              {...experiment}
            />
          ))}
        </div>
      </section>
      <footer className="py-8 text-center text-custom-light/60">
        <p>© 2024 alphapebble. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Index;
