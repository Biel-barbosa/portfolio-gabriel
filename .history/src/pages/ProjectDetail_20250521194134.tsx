import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft, Calendar, Github, Globe,
  Code, FileText, ExternalLink, Image, Folder
} from 'lucide-react';
import { getProjectById } from '../services/projectService';
import { Project } from '../types';
import { Button } from '@/components/ui/button';
import Header from '../components/Header';
import Footer from '../components/Footer';

const imagensManuais: Record<string, string> = {
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

const fallbackImages = [
  'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
  'https://images.unsplash.com/photo-1518770660439-4636190af475',
  'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
  'https://images.unsplash.com/photo-1531297484001-80022131f5a1',
  'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7'
];

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProject = async () => {
      if (!id) return;

      try {
        setIsLoading(true);
        const data = await getProjectById(id);

        if (!data) {
          setError('Projeto não encontrado.');
          return;
        }

        setProject(data);
      } catch (err) {
        setError('Falha ao carregar detalhes do projeto.');
        console.error('Erro ao carregar detalhes do projeto:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadProject();
  }, [id]);

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Data não disponível';

    return new Date(dateString).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getProjectImage = (project: Project): string => {
    if (!project) return fallbackImages[0];
    const fallbackIndex = parseInt(project.id.replace(/\D/g, '0'), 10) % fallbackImages.length;
    return imagensManuais[project.id] || project.imageUrl || fallbackImages[fallbackIndex];
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      <Header />

      <main className="flex-grow pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <Link
            to="/projetos"
            className="inline-flex items-center text-sm text-black hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para Projetos
          </Link>

          {isLoading && (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          )}

          {error && (
            <div className="text-center py-20">
              <p className="text-destructive">{error}</p>
              <Link
                to="/projetos"
                className="mt-4 inline-block text-primary hover:underline"
              >
                Voltar para lista de projetos
              </Link>
            </div>
          )}

          {!isLoading && project && (
            <div className="animate-fade-in">
              <div className="mb-8">
                <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                  <Folder className="h-4 w-4" />
                  <span>Projetos</span>
                  <span>/</span>
                  <span className="text-primary">{project.name}</span>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold mb-4">{project.name}</h1>

                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-6">
                  {project.deployedAt && (
                    <div className="flex items-center">
                      <Calendar className="mr-1 h-4 w-4" />
                      <span>Atualizado em {formatDate(project.deployedAt)}</span>
                    </div>
                  )}

                  <div className="flex items-center gap-3">
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center hover:underline">
                        <Github className="mr-1 h-4 w-4" />
                        GitHub
                      </a>
                    )}

                    {project.deployUrl && (
                      <a href={project.deployUrl} target="_blank" rel="noopener noreferrer" className="flex items-center hover:underline">
                        <Globe className="mr-1 h-4 w-4 text-blue-400" />
                        Vercel
                      </a>
                    )}
                  </div>
                </div>
              </div>

              <div className="rounded-lg overflow-hidden mb-10 h-[400px] border border-gray-200 bg-white">
                <img
                  src={getProjectImage(project)}
                  alt={project.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="grid md:grid-cols-3 gap-10">
                <div className="md:col-span-2">
                  <div className="bg-white border border-gray-200 rounded-lg p-8 mb-8">
                    <h2 className="text-xl font-semibold mb-4 flex items-center">
                      <FileText className="mr-2 h-5 w-5 text-primary" />
                      Sobre o Projeto
                    </h2>
                    <p className="text-lg text-[#4f4f4f] leading-relaxed mb-6">
                      {project.description}
                    </p>

                    <div className="prose prose-invert max-w-none">
                      <p>Este projeto representa uma solução moderna e eficiente para os desafios específicos que aborda, demonstrando boas práticas de desenvolvimento e uma arquitetura bem planejada.</p>
                      <p>A interface foi desenvolvida com foco na experiência do usuário, garantindo uma navegação intuitiva e responsiva em diferentes dispositivos.</p>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-8">
                    <h2 className="text-xl font-semibold mb-6 flex items-center">
                      <Code className="mr-2 h-5 w-5 text-primary" />
                      Tecnologias Utilizadas
                    </h2>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                      {project.technologies && project.technologies.map((tech, index) => (
                        <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex items-center gap-3">
                          <span className="h-3 w-3 rounded-full bg-primary"></span>
                          <span className="font-medium text-gray-800">{tech}</span>
                        </div>
                      ))}
                    </div>

                    {project.deployUrl && (
                      <Button variant="default" asChild>
                        <a href={project.deployUrl} target="_blank" rel="noopener noreferrer">
                          Acessar Projeto <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProjectDetail;
