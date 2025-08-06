import Navbar from '@/components/Navbar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from '@/components/ui/image';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

// Define case study types
type CaseStudyCategory = 'ai-ml' | 'fullstack' | 'data-engineering' | 'microservices';
type CaseStudyIndustry = 'fintech' | 'healthtech' | 'ecommerce' | 'saas' | 'other';

interface CaseStudy {
  id: string;
  title: string;
  description: string;
  challenge: string;
  solution: string;
  results: string[];
  category: CaseStudyCategory;
  industry: CaseStudyIndustry;
  imageUrl: string;
  featured?: boolean;
}

const categoryLabels: Record<CaseStudyCategory, string> = {
  'ai-ml': 'AI/ML',
  fullstack: 'Full Stack',
  'data-engineering': 'Data Engineering',
  microservices: 'Microservices',
};

const industryLabels: Record<CaseStudyIndustry, string> = {
  fintech: 'Fintech',
  healthtech: 'Healthtech',
  ecommerce: 'E-commerce',
  saas: 'SaaS',
  other: 'Other',
};

// Sample case studies data
const caseStudies: CaseStudy[] = [
  {
    id: 'cs-1',
    title: 'AI-Powered Customer Support Chatbot',
    description:
      'Helping a SaaS startup reduce support costs with an intelligent chatbot that handles 70% of customer inquiries.',
    challenge:
      'The client was struggling with scaling their customer support team as their user base grew rapidly. They needed a solution to handle common inquiries without increasing headcount.',
    solution:
      'We developed an AI-powered chatbot that could understand customer questions and provide accurate responses. The system was integrated with their knowledge base and could escalate complex issues to human agents.',
    results: [
      'Reduced support ticket volume by 70%',
      'Improved first response time from 4 hours to 2 minutes',
      'Saved $150,000 annually in support costs',
      'Increased customer satisfaction scores by 15%',
    ],
    category: 'ai-ml',
    industry: 'saas',
    imageUrl: '/images/placeholder-project.jpg',
    featured: true,
  },
  {
    id: 'cs-2',
    title: 'Real-time Payment Processing System',
    description:
      'Building a scalable microservices architecture for a fintech startup to process thousands of transactions per second.',
    challenge:
      'The client needed a highly reliable and scalable payment processing system that could handle peak loads during special events and promotions.',
    solution:
      'We designed and implemented a microservices architecture using event-driven patterns to ensure high throughput and fault tolerance. The system was deployed on Kubernetes for easy scaling.',
    results: [
      'Achieved processing capacity of 3,000 transactions per second',
      'Reduced system downtime to less than 0.1%',
      'Cut infrastructure costs by 40% through efficient resource utilization',
      'Enabled rapid feature deployment with CI/CD pipeline',
    ],
    category: 'microservices',
    industry: 'fintech',
    imageUrl: '/images/placeholder-project.jpg',
    featured: true,
  },
  {
    id: 'cs-3',
    title: 'Healthcare Data Analytics Platform',
    description:
      'Creating a HIPAA-compliant data pipeline and analytics dashboard for a healthtech startup.',
    challenge:
      'The client had valuable healthcare data but lacked the infrastructure to process it securely and extract meaningful insights for their customers.',
    solution:
      'We built a secure data ingestion pipeline with proper encryption and anonymization, followed by an analytics platform that generated actionable insights from the processed data.',
    results: [
      'Processed over 10 million patient records securely',
      'Reduced data processing time from days to hours',
      'Enabled new revenue stream through insights-as-a-service',
      'Achieved full HIPAA compliance with audit trails',
    ],
    category: 'data-engineering',
    industry: 'healthtech',
    imageUrl: '/images/placeholder-project.jpg',
  },
  {
    id: 'cs-4',
    title: 'E-commerce Recommendation Engine',
    description:
      'Developing a personalized product recommendation system that increased average order value by 23%.',
    challenge:
      "The client's e-commerce platform had a large product catalog but struggled with helping customers discover relevant products, resulting in low conversion rates.",
    solution:
      'We implemented a machine learning recommendation engine that analyzed user behavior, purchase history, and product attributes to suggest relevant items to each customer.',
    results: [
      'Increased average order value by 23%',
      'Improved conversion rate by 15%',
      'Reduced bounce rate by 30%',
      'Generated $1.2M in additional annual revenue',
    ],
    category: 'ai-ml',
    industry: 'ecommerce',
    imageUrl: '/images/placeholder-project.jpg',
  },
  {
    id: 'cs-5',
    title: 'Mobile Banking App Redesign',
    description:
      'Reimagining the user experience for a mobile banking application to improve engagement and feature adoption.',
    challenge:
      "The client's existing mobile app had poor user engagement and low feature adoption despite offering valuable banking services.",
    solution:
      'We conducted user research to identify pain points and redesigned the app with a focus on intuitive navigation and streamlined workflows. We also implemented a new frontend using React Native.',
    results: [
      'Increased daily active users by 45%',
      'Improved app store rating from 3.2 to 4.7',
      'Increased feature adoption by 60%',
      'Reduced customer support calls by 25%',
    ],
    category: 'fullstack',
    industry: 'fintech',
    imageUrl: '/images/placeholder-project.jpg',
  },
  {
    id: 'cs-6',
    title: 'Telemedicine Platform',
    description:
      'Building a secure, HIPAA-compliant video consultation platform for healthcare providers.',
    challenge:
      'The client needed a reliable and secure platform for doctors to conduct virtual consultations with patients, with specific requirements for scheduling, payment processing, and medical record integration.',
    solution:
      'We developed a full-stack telemedicine platform with video conferencing, appointment scheduling, secure messaging, and electronic health record integration.',
    results: [
      'Enabled 10,000+ virtual consultations per month',
      'Reduced no-show rate by 35% with automated reminders',
      'Achieved 99.9% uptime for critical services',
      'Integrated with major EHR systems for seamless workflow',
    ],
    category: 'fullstack',
    industry: 'healthtech',
    imageUrl: '/images/placeholder-project.jpg',
  },
];

const CaseStudies = () => {
  const [selectedCategory, setSelectedCategory] = useState<CaseStudyCategory | 'all'>('all');
  const [selectedIndustry, setSelectedIndustry] = useState<CaseStudyIndustry | 'all'>('all');

  const filteredCaseStudies = caseStudies.filter(caseStudy => {
    if (selectedCategory !== 'all' && caseStudy.category !== selectedCategory) {
      return false;
    }
    if (selectedIndustry !== 'all' && caseStudy.industry !== selectedIndustry) {
      return false;
    }
    return true;
  });

  const featuredCaseStudies = caseStudies.filter(caseStudy => caseStudy.featured);

  return (
    <div className="min-h-screen bg-custom-dark">
      <Navbar />

      {/* Hero Section */}
      <div className="pt-32 pb-20 bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-custom-light mb-6">Case Studies</h1>
          <p className="text-xl text-custom-light/80 mb-10 max-w-3xl mx-auto">
            Explore how we've helped startups validate ideas and build successful products through
            focused experiments.
          </p>
        </div>
      </div>

      {/* Featured Case Studies */}
      {featuredCaseStudies.length > 0 && (
        <div className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-custom-light mb-12 text-center">
              Featured Success Stories
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredCaseStudies.map(caseStudy => (
                <div
                  key={caseStudy.id}
                  className="bg-gray-800/30 rounded-lg border border-gray-700 overflow-hidden flex flex-col md:flex-row">
                  <div className="md:w-2/5">
                    <Image
                      src={caseStudy.imageUrl}
                      alt={caseStudy.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="md:w-3/5 p-6">
                    <Badge className="bg-blue-600 text-white mb-3">Featured</Badge>
                    <h3 className="text-2xl font-semibold text-custom-light mb-2">
                      {caseStudy.title}
                    </h3>
                    <p className="text-custom-light/70 mb-4">{caseStudy.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="outline" className="text-custom-light/70 border-gray-700">
                        {categoryLabels[caseStudy.category]}
                      </Badge>
                      <Badge variant="outline" className="text-custom-light/70 border-gray-700">
                        {industryLabels[caseStudy.industry]}
                      </Badge>
                    </div>
                    <Link to={`/case-studies/${caseStudy.id}`}>
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                        Read Case Study <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* All Case Studies */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-custom-light mb-8 text-center">
            All Case Studies
          </h2>

          <div className="mb-12">
            <Tabs defaultValue="all" className="w-full">
              <div className="mb-6">
                <h3 className="text-custom-light/70 mb-2 text-sm">Filter by Technology:</h3>
                <TabsList className="w-full bg-gray-800">
                  <TabsTrigger
                    value="all"
                    onClick={() => setSelectedCategory('all')}
                    className="flex-1">
                    All Technologies
                  </TabsTrigger>
                  {(Object.entries(categoryLabels) as [CaseStudyCategory, string][]).map(
                    ([category, label]) => (
                      <TabsTrigger
                        key={category}
                        value={category}
                        onClick={() => setSelectedCategory(category as CaseStudyCategory)}
                        className="flex-1">
                        {label}
                      </TabsTrigger>
                    )
                  )}
                </TabsList>
              </div>

              <div className="mb-8">
                <h3 className="text-custom-light/70 mb-2 text-sm">Filter by Industry:</h3>
                <TabsList className="w-full bg-gray-800">
                  <TabsTrigger
                    value="all"
                    onClick={() => setSelectedIndustry('all')}
                    className="flex-1">
                    All Industries
                  </TabsTrigger>
                  {(Object.entries(industryLabels) as [CaseStudyIndustry, string][]).map(
                    ([industry, label]) => (
                      <TabsTrigger
                        key={industry}
                        value={industry}
                        onClick={() => setSelectedIndustry(industry as CaseStudyIndustry)}
                        className="flex-1">
                        {label}
                      </TabsTrigger>
                    )
                  )}
                </TabsList>
              </div>
            </Tabs>
          </div>

          {filteredCaseStudies.length === 0 ? (
            <div className="text-center text-custom-light/70 py-12">
              <p className="text-xl">No case studies found with the selected filters.</p>
              <Button
                className="mt-4 text-custom-light/70 hover:text-gray-400"
                variant="ghost"
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedIndustry('all');
                }}>
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCaseStudies.map(caseStudy => (
                <Card
                  key={caseStudy.id}
                  className="h-full flex flex-col overflow-hidden border-gray-800 bg-custom-dark/50">
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={caseStudy.imageUrl}
                      alt={caseStudy.title}
                      className="w-full h-full object-cover"
                    />
                    {caseStudy.featured && (
                      <Badge className="absolute top-2 right-2 bg-blue-600">Featured</Badge>
                    )}
                  </div>
                  <CardHeader>
                    <CardTitle className="text-custom-light">{caseStudy.title}</CardTitle>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge variant="outline" className="text-custom-light/70 border-gray-700">
                        {categoryLabels[caseStudy.category]}
                      </Badge>
                      <Badge variant="outline" className="text-custom-light/70 border-gray-700">
                        {industryLabels[caseStudy.industry]}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <CardDescription className="text-custom-light/70 mb-4">
                      {caseStudy.description}
                    </CardDescription>
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-custom-light mb-2">Key Results:</h4>
                      <ul className="space-y-1">
                        {caseStudy.results.slice(0, 2).map((result, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-custom-light/70">{result}</span>
                          </li>
                        ))}
                        {caseStudy.results.length > 2 && (
                          <li className="text-sm text-blue-400">
                            + {caseStudy.results.length - 2} more results
                          </li>
                        )}
                      </ul>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link to={`/case-studies/${caseStudy.id}`} className="w-full">
                      <Button
                        variant="outline"
                        className="w-full text-custom-light border-gray-700 hover:bg-gray-800">
                        Read Case Study <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-900 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-custom-light mb-6">
            Ready to Create Your Success Story?
          </h2>
          <p className="text-xl text-custom-light/80 mb-10 max-w-2xl mx-auto">
            Let's discuss how we can help you validate your idea and build a successful product.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg">
                Schedule a Consultation
              </Button>
            </Link>
            <Link to="/services">
              <Button
                variant="outline"
                className="text-custom-light border-custom-light/20 hover:bg-custom-light/10 px-8 py-6 text-lg">
                Explore Our Services
              </Button>
            </Link>
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

export default CaseStudies;
