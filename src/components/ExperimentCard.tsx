
import { Card } from './ui/card';
import { Button } from './ui/button';

interface ExperimentCardProps {
  title: string;
  description: string;
  icon: string;
  caption?: string;
}

const ExperimentCard = ({ title, description, icon, caption }: ExperimentCardProps) => {
  return (
    <Card className="p-6 bg-custom-dark/50 border-custom-accent/20 hover:border-custom-accent/40 transition-all duration-300 backdrop-blur-sm">
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-custom-light mb-2">{title}</h3>
      <p className="text-custom-light/80 mb-4">{description}</p>
      {caption && (
        <p className="text-sm text-custom-light/60 italic mb-4">{caption}</p>
      )}
      <Button className="w-full bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end hover:opacity-90">
        Try it out
      </Button>
    </Card>
  );
};

export default ExperimentCard;
