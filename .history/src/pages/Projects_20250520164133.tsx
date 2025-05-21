
import React, { useState, useEffect } from 'react';
import { fetchVercelProjects } from '../services/projectService';
import { Project } from '../types';
import ProjectCard from '../components/ProjectCard';
import { LayoutGrid, Filter, Globe } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setIsLoading(true);
        const data = await fetchVercelProjects();
        setProjects(data);
      } catch (err) {
        setError('Falha ao carregar projetos. Por favor, tente novamente mais tarde.');
        toast({
          variant: "destructive",
          title: "Erro ao carregar projetos",
          description: "Não foi possível carregar os projetos da Vercel.",
        });
        console.error('Erro ao carregar projetos:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadProjects();
  }, [toast]);
  
  const vercelProjects = projects.filter(project => 
    project.source === 'vercel' || project.featured === true
  );

  return (
    <div className="min-h-screen flex flex-col bg-##fcfcfc">
      <Header />
      
      <main className="flex-grow pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 flex items-center text-color-#64748b">
              <LayoutGrid className="mr-2 h-6 w-6" /> Meus Projetos
            </h1>
            <p className="text-lg text-black">
              Explore minha coleção de projetos, desenvolvidos com diversas tecnologias e solucionando diferentes problemas. 
              Cada projeto representa um desafio único e uma oportunidade de aprendizado.
            </p>
          </div>
          
          <div className="flex justify-center mb-8">
            <Tabs 
              defaultValue="all" 
              className="w-full max-w-md"
            >
              <TabsList className="grid w-full grid-cols-1">
                <TabsTrigger value="all" className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  <span>Todos os Projetos</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          {isLoading && (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          )}
          
          {!isLoading && error && (
            <div className="text-center py-8 mb-8 text-gray-300">
              <p className="text-destructive">{error}</p>
              <p className="mt-2">Exibindo projetos disponíveis.</p>
            </div>
          )}
          
          {!isLoading && (
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {vercelProjects.map((project) => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  featured={project.featured}
                />
              ))}
            </div>
          )}
          
          {!isLoading && vercelProjects.length === 0 && (
            <div className="text-center py-20 text-gray-300">
              <p>Nenhum projeto encontrado.</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => window.location.reload()}
              >
                Tentar novamente
              </Button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Projects;
