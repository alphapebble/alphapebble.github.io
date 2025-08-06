import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Github, Linkedin, Twitter } from 'lucide-react';
import Image from '@/components/ui/image';

const teamMembers = [
  {
    id: 1,
    name: 'Alex Johnson',
    role: 'Founder & CEO',
    bio: 'Former tech lead at Google with 15+ years of experience in AI and data engineering. Alex founded AlphaPebble to help startups validate ideas quickly and efficiently.',
    image: '/images/placeholder-project.jpg',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
    github: 'https://github.com',
  },
  {
    id: 2,
    name: 'Sarah Chen',
    role: 'CTO',
    bio: 'Ex-Amazon principal engineer with expertise in distributed systems and microservices architecture. Sarah leads our technical team and ensures we deliver high-quality solutions.',
    image: '/images/placeholder-project.jpg',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
    github: 'https://github.com',
  },
  {
    id: 3,
    name: 'Michael Rodriguez',
    role: 'Head of Product',
    bio: 'Product leader with experience at multiple successful startups. Michael specializes in helping founders define MVPs and create product roadmaps that drive growth.',
    image: '/images/placeholder-project.jpg',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
  },
  {
    id: 4,
    name: 'Emily Wong',
    role: 'Lead Data Scientist',
    bio: 'PhD in Machine Learning with 8+ years of industry experience. Emily helps startups leverage AI and data to create competitive advantages and solve complex problems.',
    image: '/images/placeholder-project.jpg',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
  },
  {
    id: 5,
    name: 'David Park',
    role: 'Senior Full-Stack Engineer',
    bio: 'Full-stack developer with expertise in React, Node.js, and cloud infrastructure. David specializes in building scalable web applications and MVPs for early-stage startups.',
    image: '/images/placeholder-project.jpg',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
  },
  {
    id: 6,
    name: 'Priya Sharma',
    role: 'UX/UI Designer',
    bio: 'Designer with a background in cognitive psychology and human-computer interaction. Priya creates intuitive, user-centered designs that help startups validate their ideas.',
    image: '/images/placeholder-project.jpg',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
  },
];

const Team = () => {
  return (
    <div className="min-h-screen bg-custom-dark">
      <Navbar />

      {/* Hero Section */}
      <div className="pt-32 pb-20 bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-custom-light mb-6">Meet Our Team</h1>
          <p className="text-xl text-custom-light/80 mb-10 max-w-3xl mx-auto">
            We're a diverse group of engineers, designers, and product strategists passionate about
            helping startups succeed.
          </p>
        </div>
      </div>

      {/* Team Members Section */}
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map(member => (
              <div
                key={member.id}
                className="bg-gray-800/30 rounded-lg border border-gray-700 overflow-hidden">
                <div className="h-64 overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-custom-light mb-1">{member.name}</h3>
                  <p className="text-blue-400 mb-4">{member.role}</p>
                  <p className="text-custom-light/70 mb-6">{member.bio}</p>
                  <div className="flex gap-3">
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gray-700 hover:bg-gray-600 p-2 rounded-full">
                        <Linkedin className="h-5 w-5 text-custom-light" />
                      </a>
                    )}
                    {member.twitter && (
                      <a
                        href={member.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gray-700 hover:bg-gray-600 p-2 rounded-full">
                        <Twitter className="h-5 w-5 text-custom-light" />
                      </a>
                    )}
                    {member.github && (
                      <a
                        href={member.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gray-700 hover:bg-gray-600 p-2 rounded-full">
                        <Github className="h-5 w-5 text-custom-light" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Company Values Section */}
      <div className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-custom-light mb-16 text-center">Our Values</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800/50 p-8 rounded-lg border border-gray-700 text-center">
              <div className="bg-blue-600/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-custom-light mb-4">Speed & Efficiency</h3>
              <p className="text-custom-light/70">
                We believe in moving fast and helping startups validate ideas quickly without
                wasting resources.
              </p>
            </div>

            <div className="bg-gray-800/50 p-8 rounded-lg border border-gray-700 text-center">
              <div className="bg-blue-600/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-custom-light mb-4">Technical Excellence</h3>
              <p className="text-custom-light/70">
                We maintain high standards in our work, delivering solutions that are not just
                functional but also well-engineered.
              </p>
            </div>

            <div className="bg-gray-800/50 p-8 rounded-lg border border-gray-700 text-center">
              <div className="bg-blue-600/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-custom-light mb-4">Client Partnership</h3>
              <p className="text-custom-light/70">
                We see ourselves as partners in our clients' success, not just service providers.
                Your goals are our goals.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Join Our Team Section */}
      <div className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-custom-light mb-6">Join Our Team</h2>
          <p className="text-xl text-custom-light/80 mb-10 max-w-2xl mx-auto">
            We're always looking for talented individuals who are passionate about helping startups
            succeed.
          </p>

          <div className="bg-gray-800/30 p-8 rounded-lg border border-gray-700 max-w-3xl mx-auto">
            <h3 className="text-2xl font-semibold text-custom-light mb-6">Open Positions</h3>

            <div className="space-y-6">
              <div className="p-4 border border-gray-700 rounded-lg bg-gray-800/50">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h4 className="text-xl font-medium text-custom-light">
                      Senior Full-Stack Developer
                    </h4>
                    <p className="text-custom-light/70">Remote • Full-time</p>
                  </div>
                  <Link to="/contact">
                    <Button
                      variant="outline"
                      className="text-custom-light border-custom-light/20 hover:bg-custom-light/10">
                      Apply Now
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="p-4 border border-gray-700 rounded-lg bg-gray-800/50">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h4 className="text-xl font-medium text-custom-light">Product Manager</h4>
                    <p className="text-custom-light/70">San Francisco • Full-time</p>
                  </div>
                  <Link to="/contact">
                    <Button
                      variant="outline"
                      className="text-custom-light border-custom-light/20 hover:bg-custom-light/10">
                      Apply Now
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="p-4 border border-gray-700 rounded-lg bg-gray-800/50">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h4 className="text-xl font-medium text-custom-light">
                      Machine Learning Engineer
                    </h4>
                    <p className="text-custom-light/70">Remote • Contract</p>
                  </div>
                  <Link to="/contact">
                    <Button
                      variant="outline"
                      className="text-custom-light border-custom-light/20 hover:bg-custom-light/10">
                      Apply Now
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="mt-8 text-custom-light/70">
              <p>Don't see a position that fits your skills?</p>
              <Link to="/contact" className="text-blue-400 hover:underline">
                Send us your resume anyway! We're always interested in meeting talented people.
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-900 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-custom-light mb-6">
            Work With Our Expert Team
          </h2>
          <p className="text-xl text-custom-light/80 mb-10 max-w-2xl mx-auto">
            Let's discuss how our team can help you validate your idea and build a successful
            product.
          </p>
          <Link to="/contact">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg">
              Schedule a Consultation <ArrowRight className="ml-2 h-5 w-5" />
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

export default Team;
