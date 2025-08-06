import { useState } from 'react';
import { projects, ProjectCategory, categoryLabels } from '@/data/projects';
import ProjectCard from '@/components/ProjectCard';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';

const Projects = () => {
  const [selectedCategories, setSelectedCategories] = useState<ProjectCategory[]>([]);

  const toggleCategory = (category: ProjectCategory) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const filteredProjects =
    selectedCategories.length === 0
      ? projects
      : projects.filter(project =>
          project.categories.some(category => selectedCategories.includes(category))
        );

  return (
    <div className="min-h-screen bg-custom-dark">
      <Navbar />
      <div className="container mx-auto px-4 py-24">
        <h1 className="text-4xl font-medium text-custom-light mb-8 text-center">Projects</h1>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {(Object.entries(categoryLabels) as [ProjectCategory, string][]).map(
            ([category, label]) => (
              <Button
                key={category}
                variant={
                  selectedCategories.includes(category as ProjectCategory) ? 'default' : 'outline'
                }
                className={
                  selectedCategories.includes(category as ProjectCategory)
                    ? 'bg-gray-700 hover:bg-gray-800 text-white'
                    : 'text-custom-light/70 border-gray-700 hover:bg-gray-800'
                }
                onClick={() => toggleCategory(category as ProjectCategory)}>
                {label}
              </Button>
            )
          )}
          {selectedCategories.length > 0 && (
            <Button
              variant="ghost"
              className="text-custom-light/70 hover:text-gray-400"
              onClick={() => setSelectedCategories([])}>
              Clear Filters
            </Button>
          )}
        </div>

        {filteredProjects.length === 0 ? (
          <div className="text-center text-custom-light/70 py-12">
            <p className="text-xl">No projects found with the selected filters.</p>
            <Button
              className="mt-4 text-custom-light/70 hover:text-gray-400"
              variant="ghost"
              onClick={() => setSelectedCategories([])}>
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
      <footer className="py-8 text-center text-custom-light/60">
        <p>© 2024 alphapebble. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Projects;
