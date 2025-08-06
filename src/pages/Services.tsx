import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import Image from '@/components/ui/image';
import {
  ArrowRight,
  CheckCircle,
  Code,
  Database,
  Lightbulb,
  LineChart,
  Rocket,
  Users,
  Zap,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Services = () => {
  return (
    <div className="min-h-screen bg-custom-dark">
      <Navbar />

      {/* Hero Section */}
      <div className="pt-32 pb-20 bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-custom-light mb-6">
            Our Consulting Services
          </h1>
          <p className="text-xl text-custom-light/80 mb-10 max-w-3xl mx-auto">
            We help startups validate ideas and build successful products through focused
            experiments and expert guidance.
          </p>
        </div>
      </div>

      {/* Main Services */}
      <div className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-custom-light mb-16 text-center">
            How We Help Startups Succeed
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
            <div className="bg-gray-800/30 p-8 rounded-lg border border-gray-700">
              <div className="bg-blue-600/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Lightbulb className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-2xl font-semibold text-custom-light mb-4">Idea Validation</h3>
              <p className="text-custom-light/70 mb-6">
                We help you validate your startup idea with minimal investment. Our structured
                approach identifies key assumptions and designs experiments to test them
                efficiently.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <span className="text-custom-light/70">
                    Market research and competitive analysis
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <span className="text-custom-light/70">Customer problem validation</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <span className="text-custom-light/70">Solution hypothesis testing</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <span className="text-custom-light/70">Experiment design and execution</span>
                </li>
              </ul>
              <Link to="/contact">
                <Button
                  variant="outline"
                  className="w-full text-custom-light border-custom-light/20 hover:bg-custom-light/10">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="bg-gray-800/30 p-8 rounded-lg border border-gray-700">
              <div className="bg-blue-600/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Zap className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-2xl font-semibold text-custom-light mb-4">Rapid Prototyping</h3>
              <p className="text-custom-light/70 mb-6">
                We build functional prototypes and MVPs in days or weeks, not months. Our technical
                expertise allows us to quickly bring your ideas to life for testing.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <span className="text-custom-light/70">Interactive UI/UX prototypes</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <span className="text-custom-light/70">Functional MVP development</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <span className="text-custom-light/70">Technical proof-of-concept</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <span className="text-custom-light/70">Iterative testing and refinement</span>
                </li>
              </ul>
              <Link to="/contact">
                <Button
                  variant="outline"
                  className="w-full text-custom-light border-custom-light/20 hover:bg-custom-light/10">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="bg-gray-800/30 p-8 rounded-lg border border-gray-700">
              <div className="bg-blue-600/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Code className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-2xl font-semibold text-custom-light mb-4">
                Technical Development
              </h3>
              <p className="text-custom-light/70 mb-6">
                Our team of experienced engineers can build your product using the latest
                technologies. We specialize in AI/ML, data engineering, and full-stack development.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <span className="text-custom-light/70">AI/ML model development</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <span className="text-custom-light/70">Data pipeline engineering</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <span className="text-custom-light/70">Full-stack web and mobile apps</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <span className="text-custom-light/70">Microservices architecture</span>
                </li>
              </ul>
              <Link to="/contact">
                <Button
                  variant="outline"
                  className="w-full text-custom-light border-custom-light/20 hover:bg-custom-light/10">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="bg-gray-800/30 p-8 rounded-lg border border-gray-700">
              <div className="bg-blue-600/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Rocket className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-2xl font-semibold text-custom-light mb-4">Growth Strategy</h3>
              <p className="text-custom-light/70 mb-6">
                Once your experiment shows promise, we help you scale. Our growth experts provide
                data-driven strategies to acquire users and optimize your business model.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <span className="text-custom-light/70">Metrics definition and tracking</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <span className="text-custom-light/70">User acquisition strategy</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <span className="text-custom-light/70">Conversion optimization</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <span className="text-custom-light/70">Business model refinement</span>
                </li>
              </ul>
              <Link to="/contact">
                <Button
                  variant="outline"
                  className="w-full text-custom-light border-custom-light/20 hover:bg-custom-light/10">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Specialized Services */}
      <div className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-custom-light mb-16 text-center">
            Specialized Consulting Services
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
              <div className="bg-blue-600/20 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Database className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-custom-light mb-3">Data Engineering</h3>
              <p className="text-custom-light/70">
                Build scalable data pipelines, ETL processes, and analytics infrastructure to make
                data-driven decisions.
              </p>
            </div>

            <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
              <div className="bg-blue-600/20 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-custom-light mb-3">Team Augmentation</h3>
              <p className="text-custom-light/70">
                Extend your team with our skilled engineers, designers, and product managers for
                short or long-term projects.
              </p>
            </div>

            <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
              <div className="bg-blue-600/20 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <LineChart className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-custom-light mb-3">
                Technical Due Diligence
              </h3>
              <p className="text-custom-light/70">
                Evaluate technical architecture, code quality, and scalability for investors or
                acquisition purposes.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-custom-light mb-6">Flexible Engagement Models</h2>
          <p className="text-xl text-custom-light/80 mb-16 max-w-3xl mx-auto">
            We offer various ways to work together based on your needs and budget.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800/30 p-8 rounded-lg border border-gray-700 flex flex-col">
              <h3 className="text-2xl font-semibold text-custom-light mb-2">Tiny Experiment</h3>
              <p className="text-custom-light/70 mb-6">
                A focused 2-week sprint to validate a specific hypothesis or build a
                proof-of-concept.
              </p>
              <div className="text-3xl font-bold text-custom-light mb-6">Starting at $5,000</div>
              <ul className="space-y-3 mb-8 text-left">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <span className="text-custom-light/70">2-week focused sprint</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <span className="text-custom-light/70">Single experiment or prototype</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <span className="text-custom-light/70">Dedicated expert team</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <span className="text-custom-light/70">Results report and recommendations</span>
                </li>
              </ul>
              <div className="mt-auto">
                <Link to="/contact">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>

            <div className="bg-gray-800/30 p-8 rounded-lg border border-blue-500 flex flex-col relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                Most Popular
              </div>
              <h3 className="text-2xl font-semibold text-custom-light mb-2">MVP Development</h3>
              <p className="text-custom-light/70 mb-6">
                A comprehensive 4-8 week engagement to build and launch a minimal viable product.
              </p>
              <div className="text-3xl font-bold text-custom-light mb-6">Starting at $15,000</div>
              <ul className="space-y-3 mb-8 text-left">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <span className="text-custom-light/70">4-8 week development cycle</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <span className="text-custom-light/70">Full MVP with core features</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <span className="text-custom-light/70">Technical architecture design</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <span className="text-custom-light/70">Launch strategy and support</span>
                </li>
              </ul>
              <div className="mt-auto">
                <Link to="/contact">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>

            <div className="bg-gray-800/30 p-8 rounded-lg border border-gray-700 flex flex-col">
              <h3 className="text-2xl font-semibold text-custom-light mb-2">Ongoing Partnership</h3>
              <p className="text-custom-light/70 mb-6">
                Long-term collaboration with flexible resource allocation based on your evolving
                needs.
              </p>
              <div className="text-3xl font-bold text-custom-light mb-6">Custom Pricing</div>
              <ul className="space-y-3 mb-8 text-left">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <span className="text-custom-light/70">Flexible team composition</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <span className="text-custom-light/70">Monthly or quarterly contracts</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <span className="text-custom-light/70">Strategic advisory services</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <span className="text-custom-light/70">Priority support and consulting</span>
                </li>
              </ul>
              <div className="mt-auto">
                <Link to="/contact">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-900 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-custom-light mb-6">
            Ready to Start Your Next Experiment?
          </h2>
          <p className="text-xl text-custom-light/80 mb-10 max-w-2xl mx-auto">
            Let's discuss how we can help you validate your idea and build a successful product.
          </p>
          <Link to="/contact">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg">
              Schedule a Free Consultation
            </Button>
          </Link>
        </div>
      </div>

      {/* Footer */}
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

export default Services;
