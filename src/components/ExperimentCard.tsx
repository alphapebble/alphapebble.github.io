
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
    <Card className="p-4 bg-transparent border-custom-light/10 hover:border-custom-light/20 transition-all duration-300">
      <div className="text-2xl mb-2 opacity-70">{icon}</div>
      <h3 className="text-lg font-medium text-custom-light mb-1">{title}</h3>
      <p className="text-custom-light/60 text-sm mb-2">{description}</p>
      {caption && (
        <p className="text-xs text-custom-light/40 italic mb-3">{caption}</p>
      )}
      <Button 
        variant="outline" 
        className="w-full text-custom-light/70 border-custom-light/20 hover:bg-custom-light/10 hover:text-custom-light"
      >
        Explore
      </Button>
    </Card>
  );
};

export default ExperimentCard;
