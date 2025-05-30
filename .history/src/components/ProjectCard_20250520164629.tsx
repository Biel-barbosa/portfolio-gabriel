
import React from 'react';
import { Link } from 'react-router-dom';
import { Project } from '../types';
import { ArrowRight, Github, Globe, Code, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, featured = false }) => {
  // Fallback images for projects without specific images
  const fallbackImages = [
    'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
    'https://images.unsplash.com/photo-1518770660439-4636190af475',
    'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
    'https://images.unsplash.com/photo-1531297484001-80022131f5a1',
    'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7'
  ];

  // Select a fallback image based on project ID (for consistency)
  const imageIndex = parseInt(project.id.replace(/\D/g, '0'), 10) % fallbackImages.length;
  const projectImage = project.imageUrl || fallbackImages[imageIndex];

  return (
    <Card className={`overflow-hidden flex flex-col bg-white border-white text-black hover:border-primary transition-all duration-300 ${featured ? 'border-l-4 border-l-primary' : ''}`}>
      <div className="h-52 overflow-hidden">
        <img 
          src={projectImage} 
          alt={project.name} 
          className="w-full h-full object-cover transition-transform hover:scale-105" 
        />
      </div>
      
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold">{project.name}</CardTitle>
          <div className="flex items-center gap-2">
            {project.githubUrl && <Github className="h-5 w-5" />}
            {project.source === 'vercel' && <Globe className="h-5 w-5 text-blue-400" />}
          </div>
        </div>
        <CardDescription className="line-clamp-2 text-gray-300">{project.description}</CardDescription>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies && project.technologies.map((tech, index) => (
            <Badge key={index} variant="secondary" className="bg-slate-800 hover:bg-slate-700 text-gray-200 mb-1">
              {tech}
            </Badge>
          ))}
        </div>
        
        {project.deployedAt && (
          <p className="text-xs text-gray-400 mb-2">
            Atualizado em {new Date(project.deployedAt).toLocaleDateString('pt-BR')}
          </p>
        )}
      </CardContent>
      
      <CardFooter className="flex gap-2 pt-0">
        <Button 
          variant="outline" 
          className="w-1/2 justify-between group border-slate-700 bg-slate-800 hover:bg-slate-700 text-white"
          asChild
        >
          <Link to={`/projetos/${project.id}`}>
            Detalhes
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
        
        {project.deployUrl && (
          <Button 
            variant="secondary" 
            className="w-1/2 justify-between group bg-primary hover:bg-primary/80 text-white"
            asChild
          >
            <a href={project.deployUrl} target="_blank" rel="noopener noreferrer">
              Demo
              <ExternalLink className="h-4 w-4 ml-1" />
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
