import React from 'react';
import { Link } from 'react-router-dom';
import { Project } from '../types';
import { ArrowRight, Github, Globe, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, featured = false }) => {
  // Imagens fallback para projetos sem imagem específica
  const fallbackImages = [
    'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
    'https://images.unsplash.com/photo-1518770660439-4636190af475',
    'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
    'https://images.unsplash.com/photo-1531297484001-80022131f5a1',
    'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7'
  ];

  // Imagens manuais mapeadas por ID do projeto
  const imagensManuais = {
    "prj_Pr0xZXwfAseszat24qJTXfaJSCDy": "/imgportfolio.png",
    "prj_buli1iE1KRigxkza0rJDjiOqPFaw": "/imgdashbord.png",
    "prj_ZAvdhlgQcbjFwimLdKB6PVGIrI6b": "/imggestoreventos.png",
    "prj_452tuaXAnmwzZIO8FBailktjR66j": "/imgquadrotarefas.png",
    "prj_0aQfXZx5UjyqnHBEy1ZEOLjjlAFD": "/neuronai.png",
    "prj_bUEhDGnaC5k0Lz36KtwUkuy0Ai5P": "/capputeeno.png",
    "prj_rDnItujZWHUj5sgbPmWTuVBKIhDc": "/peetdev.png",
    "prj_ArKgGiYMCk78zaazxU0gDtgHlzeU": "/ebacjobs.png",
    "prj_XNhgBEj0dc0O8JtRJMLnDp8n1Pep": "/todo-list-basic.png",
    "prj_5Wabsb096RY1p3UpyYcSd5JGmvd0": "/vuecalculater.png",
    "prj_F8Z2Vs31TQ6a4G4PYTUTYfi47WHh": "/niver.png",
    "prj_FppfsdFZCxTDiZmVlzWETuWZ9Wg5": "/devoltafuturo.png",
    "prj_7JLQE92NccCjLHyTbEu4147BNxyq": "/eventebac.png",
    "prj_DZBGgFkUFFYNnqecxsqfCk6lmk7T": "/clonedisney.png",
    "prj_EsMKxYAalTW5XyPri7OQETyzLhfM": "/sorteador.png",
    "prj_Or1z9S74pwTpg3C8kIBnwRAikJxQ": "/culinariadigital.png",
    "prj_d0LzaenxgPwMImgOX7WQkdtTCClS": "/restaurante.png",
    "prj_XSwDIfMsfWThImUgKux34jl9yC4Z": "/tarefaboot.png",
    "prj_yiCG7LbVGnpAzsoKkoVj2J2SDEw1": "/cssresponsivo.png",
  };

  // URLs manuais mapeadas por ID do projeto
  const urlsManuais: Record<string, string> = {
    "prj_x3tH0lEdBLADpisfA7vr6atNTnwJ": "https://v0-react-contact-list-sigma.vercel.app/",
    "prj_Pr0xZXwfAseszat24qJTXfaJSCDy": "https://portfolio-gabriel-nu.vercel.app",
    "prj_buli1iE1KRigxkza0rJDjiOqPFaw": "https://dashbord-analytics.vercel.app",
    "prj_ZAvdhlgQcbjFwimLdKB6PVGIrI6b": "https://gestor-eventos.vercel.app",
    "prj_452tuaXAnmwzZIO8FBailktjR66j": "https://gerenciador-tarefas.vercel.app",
    "prj_0aQfXZx5UjyqnHBEy1ZEOLjjlAFD": "https://aurora-tech.vercel.app",
    "prj_bUEhDGnaC5k0Lz36KtwUkuy0Ai5P": "https://capputeeno.vercel.app",
    "prj_rDnItujZWHUj5sgbPmWTuVBKIhDc": "https://petdev.vercel.app",
    "prj_ArKgGiYMCk78zaazxU0gDtgHlzeU": "https://base-exercicio-css.vercel.app",
    "prj_XNhgBEj0dc0O8JtRJMLnDp8n1Pep": "https://todo-list-vuejs.vercel.app",
    "prj_5Wabsb096RY1p3UpyYcSd5JGmvd0": "https://calculadora.vercel.app",
    "prj_F8Z2Vs31TQ6a4G4PYTUTYfi47WHh": "https://aniversario.vercel.app",
    "prj_FppfsdFZCxTDiZmVlzWETuWZ9Wg5": "https://meu-filme-favorito.vercel.app",
    "prj_7JLQE92NccCjLHyTbEu4147BNxyq": "https://ebac-tech-talks.vercel.app",
    "prj_DZBGgFkUFFYNnqecxsqfCk6lmk7T": "https://clone-disneyplus.vercel.app",
    "prj_EsMKxYAalTW5XyPri7OQETyzLhfM": "https://sorteador.vercel.app",
    "prj_Or1z9S74pwTpg3C8kIBnwRAikJxQ": "https://culinaria-digital.vercel.app",
    "prj_d0LzaenxgPwMImgOX7WQkdtTCClS": "https://projeto-3-ebac.vercel.app",
    "prj_XSwDIfMsfWThImUgKux34jl9yC4Z": "https://tarefa-bootstrap.vercel.app",
    "prj_yiCG7LbVGnpAzsoKkoVj2J2SDEw1": "https://css-responsivo.vercel.app",
  };

  // Índice para fallback consistente baseado no ID do projeto
  const imageIndex = parseInt(project.id.replace(/\D/g, ''), 10) % fallbackImages.length;

  // Prioriza imagem manual, depois a do projeto, depois fallback
  const projectImage = imagensManuais[project.id]
    ? imagensManuais[project.id]
    : project.imageUrl
      ? project.imageUrl
      : fallbackImages[imageIndex];

  // Prioriza URL manual, depois a URL automática do projeto
  const projectUrl = urlsManuais[project.id] ? urlsManuais[project.id] : project.deployUrl;

  return (
    <Card className="overflow-hidden flex flex-col bg-white border-white text-black hover:border-primary transition-all duration-300 border-l-4 border-l-[#d1d1d1]">
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
        <CardDescription className="line-clamp-2 text-black">{project.description}</CardDescription>
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

        {projectUrl && (
          <Button
            variant="secondary"
            className="w-1/2 justify-between group bg-primary hover:bg-primary/80 text-white"
            asChild
          >
            <a href={projectUrl} target="_blank" rel="noopener noreferrer">
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
