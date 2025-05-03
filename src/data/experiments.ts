export interface Experiment {
  id: string;
  title: string;
  description: string;
  status: ExperimentStatus;
  category: ExperimentCategory;
  comingSoon?: boolean;
}

export type ExperimentStatus = 'concept' | 'in-progress' | 'completed';
export type ExperimentCategory = 'ai-ml' | 'fullstack' | 'data-engineering' | 'microservices';

export const categoryLabels: Record<ExperimentCategory, string> = {
  'ai-ml': 'AI/ML',
  'fullstack': 'Full Stack',
  'data-engineering': 'Data Engineering',
  'microservices': 'Microservices'
};

export const statusLabels: Record<ExperimentStatus, string> = {
  'concept': 'Concept',
  'in-progress': 'In Progress',
  'completed': 'Completed'
};

export const experiments: Experiment[] = [
  {
    id: 'exp-1',
    title: 'Sentiment Analysis Tool',
    description: 'A simple tool to analyze sentiment in text using natural language processing techniques.',
    status: 'concept',
    category: 'ai-ml'
  },
  {
    id: 'exp-2',
    title: 'Microservice Communication Pattern',
    description: 'Exploring different patterns for communication between microservices.',
    status: 'concept',
    category: 'microservices'
  },
  {
    id: 'exp-3',
    title: 'Data Transformation Pipeline',
    description: 'A small pipeline for transforming and cleaning data for analysis.',
    status: 'in-progress',
    category: 'data-engineering'
  },
  {
    id: 'exp-4',
    title: 'React Component Library',
    description: 'Building a reusable component library with React and TypeScript.',
    status: 'in-progress',
    category: 'fullstack'
  },
  {
    id: 'exp-5',
    title: 'Image Classification Model',
    description: 'Training a simple image classification model using TensorFlow.',
    status: 'concept',
    category: 'ai-ml'
  },
  {
    id: 'exp-6',
    title: 'API Gateway Implementation',
    description: 'Implementing an API gateway for routing requests to different microservices.',
    status: 'concept',
    category: 'microservices',
    comingSoon: true
  },
  {
    id: 'exp-7',
    title: 'Real-time Dashboard',
    description: 'Creating a real-time dashboard for monitoring system metrics.',
    status: 'concept',
    category: 'fullstack',
    comingSoon: true
  },
  {
    id: 'exp-8',
    title: 'ETL Process Optimization',
    description: 'Optimizing extract, transform, load processes for better performance.',
    status: 'concept',
    category: 'data-engineering',
    comingSoon: true
  }
];
