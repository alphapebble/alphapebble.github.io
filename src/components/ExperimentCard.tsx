
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Experiment, categoryLabels, statusLabels } from '@/data/experiments';
import { Beaker, Clock, CheckCircle } from 'lucide-react';

interface ExperimentCardProps {
  experiment: Experiment;
}

const ExperimentCard = ({ experiment }: ExperimentCardProps) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'concept':
        return <Beaker className="h-4 w-4 mr-1" />;
      case 'in-progress':
        return <Clock className="h-4 w-4 mr-1" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 mr-1" />;
      default:
        return null;
    }
  };

  return (
    <Card className="h-full flex flex-col border-gray-800 bg-custom-dark/50">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-custom-light">{experiment.title}</CardTitle>
          <Badge className="bg-gray-700 text-custom-light">
            {categoryLabels[experiment.category]}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription className="text-custom-light/70 mb-4">
          {experiment.description}
        </CardDescription>
        <div className="flex items-center mt-4">
          <Badge variant="outline" className="flex items-center border-gray-700 text-custom-light/70">
            {getStatusIcon(experiment.status)}
            {statusLabels[experiment.status]}
          </Badge>
          {experiment.comingSoon && (
            <Badge className="ml-2 bg-gray-800 text-custom-light/60">
              Coming Soon
            </Badge>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button
          variant="outline"
          className="w-full text-custom-light/70 border-gray-700 hover:bg-gray-800"
          disabled={experiment.comingSoon}
        >
          {experiment.comingSoon ? 'Coming Soon' : 'Explore Experiment'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ExperimentCard;
