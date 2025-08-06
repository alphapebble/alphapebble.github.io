import { Button } from '@/components/ui/button';
import Image from '@/components/ui/image';
import { ArrowRight, CheckCircle, Code, LineChart, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import Navbar from '../components/Navbar';

const Index = () => {
  return (
    <div className="min-h-screen bg-custom-dark">
      <Navbar />
      <HeroSection />

      {/* About Section */}
      <div className="bg-gray-900 py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold text-custom-light mb-6">
                Why Choose AlphaPebble Consulting?
              </h2>
              <p className="text-custom-light/80 mb-8 text-lg">
                We're a team of experienced engineers, designers, and product strategists who
                specialize in helping startups validate ideas through rapid experimentation.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-blue-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-medium text-custom-light">Rapid Results</h3>
                    <p className="text-custom-light/70">
                      We deliver working prototypes and experiments in days or weeks, not months.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-blue-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-medium text-custom-light">Cost-Effective</h3>
                    <p className="text-custom-light/70">
                      Our focused approach saves you money by validating ideas before major
                      investments.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-blue-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-medium text-custom-light">Technical Excellence</h3>
                    <p className="text-custom-light/70">
                      Our team brings expertise in AI, data engineering, and full-stack development.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <Link to="/about">
                  <Button
                    variant="outline"
                    className="text-custom-light border-custom-light/20 hover:bg-custom-light/10">
                    Learn More About Us <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="md:w-1/2 bg-gray-800/50 p-8 rounded-lg border border-gray-700">
              <h3 className="text-2xl font-semibold text-custom-light mb-6">Our Expertise</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col items-center text-center p-4">
                  <div className="bg-blue-600/20 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                    <Code className="h-7 w-7 text-blue-400" />
                  </div>
                  <h4 className="text-lg font-medium text-custom-light mb-2">
                    Technical Development
                  </h4>
                  <p className="text-custom-light/70 text-sm">
                    Full-stack, AI/ML, and data engineering solutions
                  </p>
                </div>

                <div className="flex flex-col items-center text-center p-4">
                  <div className="bg-blue-600/20 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                    <Users className="h-7 w-7 text-blue-400" />
                  </div>
                  <h4 className="text-lg font-medium text-custom-light mb-2">Product Strategy</h4>
                  <p className="text-custom-light/70 text-sm">
                    User research, MVP definition, and roadmapping
                  </p>
                </div>

                <div className="flex flex-col items-center text-center p-4">
                  <div className="bg-blue-600/20 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                    <LineChart className="h-7 w-7 text-blue-400" />
                  </div>
                  <h4 className="text-lg font-medium text-custom-light mb-2">Growth Consulting</h4>
                  <p className="text-custom-light/70 text-sm">
                    Metrics analysis, optimization, and scaling strategies
                  </p>
                </div>

                <div className="flex flex-col items-center text-center p-4">
                  <div className="bg-blue-600/20 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                    <Users className="h-7 w-7 text-blue-400" />
                  </div>
                  <h4 className="text-lg font-medium text-custom-light mb-2">Team Augmentation</h4>
                  <p className="text-custom-light/70 text-sm">
                    Skilled resources to complement your existing team
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Process Section */}
      <div className="py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-custom-light mb-4">
            Our Approach to Tiny Experiments
          </h2>
          <p className="text-custom-light/80 mb-16 max-w-3xl mx-auto text-lg">
            We follow a proven methodology to turn your ideas into successful experiments with
            minimal risk and maximum learning.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-gray-800/30 p-6 rounded-lg border border-gray-700 relative">
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold text-custom-light mt-6 mb-3">Discovery</h3>
              <p className="text-custom-light/70">
                We analyze your idea, identify assumptions, and define clear success metrics.
              </p>
            </div>

            <div className="bg-gray-800/30 p-6 rounded-lg border border-gray-700 relative">
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold text-custom-light mt-6 mb-3">Design</h3>
              <p className="text-custom-light/70">
                We create a minimal experiment design that tests your core hypothesis efficiently.
              </p>
            </div>

            <div className="bg-gray-800/30 p-6 rounded-lg border border-gray-700 relative">
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold text-custom-light mt-6 mb-3">Build</h3>
              <p className="text-custom-light/70">
                Our team rapidly develops the experiment using the right technologies for your
                needs.
              </p>
            </div>

            <div className="bg-gray-800/30 p-6 rounded-lg border border-gray-700 relative">
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold">
                4
              </div>
              <h3 className="text-xl font-semibold text-custom-light mt-6 mb-3">Analyze</h3>
              <p className="text-custom-light/70">
                We measure results, extract insights, and recommend next steps for your business.
              </p>
            </div>
          </div>

          <div className="mt-16">
            <Link to="/services">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg">
                Explore Our Services <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-900 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-custom-light mb-6">
            Ready to Validate Your Startup Idea?
          </h2>
          <p className="text-custom-light/80 mb-10 max-w-2xl mx-auto text-lg">
            Let's discuss how we can help you test your concept with a focused experiment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg">
                Schedule a Consultation
              </Button>
            </Link>
            <Link to="/case-studies">
              <Button
                variant="outline"
                className="text-custom-light border-custom-light/20 hover:bg-custom-light/10 px-8 py-6 text-lg">
                View Case Studies
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <footer className="py-12 bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="flex items-center gap-4 mb-6 md:mb-0">
              <Image
                src="/images/db3a807c-c152-4004-b592-a9ffbdff06b0.png"
                alt="AlphaPebble Logo"
                className="h-10 w-10 object-cover rounded-full"
              />
              <div className="text-custom-light font-medium text-xl">AlphaPebble</div>
            </div>
            <div className="flex gap-6">
              <Link to="/services" className="text-custom-light/80 hover:text-custom-light">
                Services
              </Link>
              <Link to="/case-studies" className="text-custom-light/80 hover:text-custom-light">
                Case Studies
              </Link>
              <Link to="/team" className="text-custom-light/80 hover:text-custom-light">
                Our Team
              </Link>
              <Link to="/contact" className="text-custom-light/80 hover:text-custom-light">
                Contact
              </Link>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-custom-light/60">
            <p>© 2024 AlphaPebble Consulting. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
