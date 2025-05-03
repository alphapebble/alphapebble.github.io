import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import Image from '@/components/ui/image';
import { useState } from 'react';

const Contact = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    submitted: false,
    error: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, you would send the form data to a server
    // For now, we'll just simulate a successful submission
    setFormState({
      ...formState,
      submitted: true,
      name: '',
      email: '',
      company: '',
      message: ''
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value
    });
  };

  return (
    <div className="min-h-screen bg-custom-dark">
      <Navbar />
      
      {/* Hero Section */}
      <div className="pt-32 pb-20 bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-custom-light mb-6">
            Get in Touch
          </h1>
          <p className="text-xl text-custom-light/80 mb-10 max-w-3xl mx-auto">
            Ready to start your next experiment? Have questions about our services? We're here to help.
          </p>
        </div>
      </div>
      
      {/* Contact Form Section */}
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold text-custom-light mb-6">
                Contact Us
              </h2>
              <p className="text-custom-light/80 mb-8">
                Fill out the form below and our team will get back to you within 24 hours to discuss how we can help with your startup's needs.
              </p>
              
              {formState.submitted ? (
                <div className="bg-blue-600/20 border border-blue-500 rounded-lg p-6 text-center">
                  <Send className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-custom-light mb-2">Message Sent!</h3>
                  <p className="text-custom-light/80">
                    Thank you for reaching out. We'll get back to you as soon as possible.
                  </p>
                  <Button 
                    className="mt-6 bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={() => setFormState({...formState, submitted: false})}
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-custom-light mb-2">
                      Your Name *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                      className="bg-gray-800 border-gray-700 text-custom-light"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-custom-light mb-2">
                      Email Address *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formState.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                      className="bg-gray-800 border-gray-700 text-custom-light"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="company" className="block text-custom-light mb-2">
                      Company Name
                    </label>
                    <Input
                      id="company"
                      name="company"
                      value={formState.company}
                      onChange={handleChange}
                      placeholder="Your Company"
                      className="bg-gray-800 border-gray-700 text-custom-light"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-custom-light mb-2">
                      How Can We Help? *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      placeholder="Tell us about your project or inquiry..."
                      required
                      className="bg-gray-800 border-gray-700 text-custom-light min-h-[150px]"
                    />
                  </div>
                  
                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6">
                    Send Message
                  </Button>
                </form>
              )}
            </div>
            
            <div className="lg:w-1/2 bg-gray-800/30 p-8 rounded-lg border border-gray-700">
              <h2 className="text-2xl font-bold text-custom-light mb-8">
                Other Ways to Connect
              </h2>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-600/20 p-3 rounded-full">
                    <Mail className="h-6 w-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-custom-light mb-1">Email Us</h3>
                    <p className="text-custom-light/70 mb-2">
                      For general inquiries:
                    </p>
                    <a href="mailto:contact@alphapebble.com" className="text-blue-400 hover:underline">
                      contact@alphapebble.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-blue-600/20 p-3 rounded-full">
                    <Phone className="h-6 w-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-custom-light mb-1">Call Us</h3>
                    <p className="text-custom-light/70 mb-2">
                      Monday to Friday, 9am - 5pm PST:
                    </p>
                    <a href="tel:+14155551234" className="text-blue-400 hover:underline">
                      +1 (415) 555-1234
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-blue-600/20 p-3 rounded-full">
                    <MapPin className="h-6 w-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-custom-light mb-1">Visit Us</h3>
                    <p className="text-custom-light/70">
                      123 Startup Avenue<br />
                      San Francisco, CA 94107<br />
                      United States
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-12 pt-8 border-t border-gray-700">
                <h3 className="text-xl font-medium text-custom-light mb-6">
                  Frequently Asked Questions
                </h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-medium text-custom-light mb-2">
                      How quickly can you start on my project?
                    </h4>
                    <p className="text-custom-light/70">
                      We can typically begin within 1-2 weeks of finalizing project details and agreements.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-medium text-custom-light mb-2">
                      Do you work with early-stage startups?
                    </h4>
                    <p className="text-custom-light/70">
                      Yes! We specialize in helping early-stage startups validate ideas and build MVPs efficiently.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-medium text-custom-light mb-2">
                      What industries do you specialize in?
                    </h4>
                    <p className="text-custom-light/70">
                      We have experience across various industries including fintech, healthtech, e-commerce, and SaaS.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
              <div className="text-custom-light font-medium text-xl">
                AlphaPebble
              </div>
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

export default Contact;
