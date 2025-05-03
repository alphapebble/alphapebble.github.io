import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Github as GithubIcon, ExternalLink } from 'lucide-react';
import Image from './ui/image';
import { Project, categoryLabels } from '@/data/projects';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <Card className="h-full flex flex-col overflow-hidden border-gray-800 bg-custom-dark/50">
      {project.imageUrl && (
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover"
            fallbackSrc="/images/placeholder-project.jpg"
          />
          {project.featured && (
            <Badge className="absolute top-2 right-2 bg-gray-700">
              Featured
            </Badge>
          )}
        </div>
      )}
      <CardHeader>
        <CardTitle className="text-custom-light">{project.title}</CardTitle>
        <div className="flex flex-wrap gap-2 mt-2">
          {project.categories.map((category) => (
            <Badge key={category} variant="outline" className="text-custom-light/70 border-gray-700">
              {categoryLabels[category]}
            </Badge>
          ))}
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription className="text-custom-light/70 mb-4">
          {project.description}
        </CardDescription>
        <div className="flex flex-wrap gap-2 mt-4">
          {project.technologies.slice(0, 5).map((tech) => (
            <Badge key={tech} variant="secondary" className="bg-gray-800 text-custom-light/60">
              {tech}
            </Badge>
          ))}
          {project.technologies.length > 5 && (
            <Badge variant="secondary" className="bg-gray-800 text-custom-light/60">
              +{project.technologies.length - 5} more
            </Badge>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex gap-2 pt-2">
        {project.githubUrl && (
          <Button
            variant="outline"
            size="sm"
            className="flex-1 text-custom-light/70 border-gray-700 hover:bg-gray-800"
            asChild
          >
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              <GithubIcon className="mr-2 h-4 w-4" />
              Code
            </a>
          </Button>
        )}
        {project.liveUrl && (
          <Button
            variant="outline"
            size="sm"
            className="flex-1 text-custom-light/70 border-gray-700 hover:bg-gray-800"
            asChild
          >
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" />
              Demo
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
