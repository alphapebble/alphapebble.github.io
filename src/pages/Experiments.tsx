import { useState } from 'react';
import { experiments, ExperimentCategory, categoryLabels, ExperimentStatus, statusLabels } from '@/data/experiments';
import ExperimentCard from '@/components/ExperimentCard';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Experiments = () => {
  const [selectedCategory, setSelectedCategory] = useState<ExperimentCategory | 'all'>('all');
  const [selectedStatus, setSelectedStatus] = useState<ExperimentStatus | 'all'>('all');

  const filteredExperiments = experiments.filter(experiment => {
    if (selectedCategory !== 'all' && experiment.category !== selectedCategory) {
      return false;
    }
    if (selectedStatus !== 'all' && experiment.status !== selectedStatus) {
      return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-custom-dark">
      <Navbar />
      <div className="container mx-auto px-4 py-24">
        <h1 className="text-4xl font-medium text-custom-light mb-8 text-center">Tiny Experiments</h1>
        
        <div className="mb-8">
          <Tabs defaultValue="all" className="w-full">
            <div className="mb-4">
              <h2 className="text-custom-light/70 mb-2 text-sm">Filter by Category:</h2>
              <TabsList className="w-full bg-gray-800">
                <TabsTrigger 
                  value="all" 
                  onClick={() => setSelectedCategory('all')}
                  className="flex-1"
                >
                  All Categories
                </TabsTrigger>
                {(Object.entries(categoryLabels) as [ExperimentCategory, string][]).map(([category, label]) => (
                  <TabsTrigger 
                    key={category} 
                    value={category}
                    onClick={() => setSelectedCategory(category as ExperimentCategory)}
                    className="flex-1"
                  >
                    {label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            
            <div className="mb-8">
              <h2 className="text-custom-light/70 mb-2 text-sm">Filter by Status:</h2>
              <TabsList className="w-full bg-gray-800">
                <TabsTrigger 
                  value="all" 
                  onClick={() => setSelectedStatus('all')}
                  className="flex-1"
                >
                  All Statuses
                </TabsTrigger>
                {(Object.entries(statusLabels) as [ExperimentStatus, string][]).map(([status, label]) => (
                  <TabsTrigger 
                    key={status} 
                    value={status}
                    onClick={() => setSelectedStatus(status as ExperimentStatus)}
                    className="flex-1"
                  >
                    {label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
          </Tabs>
        </div>

        {filteredExperiments.length === 0 ? (
          <div className="text-center text-custom-light/70 py-12">
            <p className="text-xl">No experiments found with the selected filters.</p>
            <Button 
              className="mt-4 text-custom-light/70 hover:text-gray-400"
              variant="ghost"
              onClick={() => {
                setSelectedCategory('all');
                setSelectedStatus('all');
              }}
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExperiments.map(experiment => (
              <ExperimentCard key={experiment.id} experiment={experiment} />
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

export default Experiments;
