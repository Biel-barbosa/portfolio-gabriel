
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Github, Globe, Code, FileText, ExternalLink, Image, Folder } from 'lucide-react';
import { getProjectById } from '../services/projectService';
import { Project } from '../types';
import { Button } from '@/components/ui/button';
import Header from '../components/Header';
import Footer from '../components/Footer';

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
                      <div className="flex items-center">
                        <Github className="mr-1 h-4 w-4" />
                        <span>GitHub</span>
                      </div>
                    )}
                    
                    {project.deployUrl && (
                      <div className="flex items-center">
                        <Globe className="mr-1 h-4 w-4 text-blue-400" />
                        <span>Vercel</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg overflow-hidden mb-10 h-[400px] bg-white-800 border border-white-700">
                {project.imageUrl ? (
                  <img 
                    src={project.imageUrl} 
                    alt={project.name}
                    className="w-full h-full object-cover" 
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-slate-500">
                    <Image className="h-16 w-16" />
                  </div>
                )}
              </div>
              
              <div className="grid md:grid-cols-3 gap-10">
                <div className="md:col-span-2">
                  <div className="bg-white border border-white-800 rounded-lg p-8 mb-8">
                    <h2 className="text-xl font-semibold mb-4 flex items-center">
                      <FileText className="mr-2 h-5 w-5 text-primary" /> 
                      Sobre o Projeto
                    </h2>
                    <p className="text-lg text-gray-300 leading-relaxed mb-6">
                      {project.description}
                    </p>
                    
                    <div className="prose prose-invert max-w-none">
                      <p>Este projeto representa uma solução moderna e eficiente para os desafios específicos que aborda, demonstrando boas práticas de desenvolvimento e uma arquitetura bem planejada.</p>
                      
                      <p>A interface foi desenvolvida com foco na experiência do usuário, garantindo uma navegação intuitiva e responsiva em diferentes dispositivos.</p>
                    </div>
                  </div>
                  
                  <div className="bg-white border border-white-800 rounded-lg p-8">
                    <h2 className="text-xl font-semibold mb-6 flex items-center">
                      <Code className="mr-2 h-5 w-5 text-primary" /> 
                      Tecnologias Utilizadas
                    </h2>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                      {project.technologies && project.technologies.map((tech, index) => (
                        <div key={index} className="bg-white border border-white-700 rounded-lg p-4 flex items-center gap-3">
                          <span className="h-3 w-3 rounded-full bg-primary"></span>
                          <span className="font-medium">{tech}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-8">
                      <h3 className="text-lg font-medium mb-4">Funcionalidades Principais</h3>
                      <ul className="space-y-3 text-gray-300">
                        <li className="flex items-start gap-2">
                          <span className="mt-1 h-2 w-2 rounded-full bg-primary shrink-0"></span>
                          <span>Interface responsiva adaptada para dispositivos móveis e desktop</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="mt-1 h-2 w-2 rounded-full bg-primary shrink-0"></span>
                          <span>Design moderno com animações e transições suaves</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="mt-1 h-2 w-2 rounded-full bg-primary shrink-0"></span>
                          <span>Performance otimizada para carregamento rápido</span>
                        </li>
                        {project.name.toLowerCase().includes('dashboard') && (
                          <>
                            <li className="flex items-start gap-2">
                              <span className="mt-1 h-2 w-2 rounded-full bg-primary shrink-0"></span>
                              <span>Painéis interativos com visualizações de dados em tempo real</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="mt-1 h-2 w-2 rounded-full bg-primary shrink-0"></span>
                              <span>Sistema de autenticação e controle de acesso</span>
                            </li>
                          </>
                        )}
                        {project.name.toLowerCase().includes('ecommerce') && (
                          <>
                            <li className="flex items-start gap-2">
                              <span className="mt-1 h-2 w-2 rounded-full bg-primary shrink-0"></span>
                              <span>Catálogo de produtos com filtragem avançada</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="mt-1 h-2 w-2 rounded-full bg-primary shrink-0"></span>
                              <span>Sistema de carrinho e checkout seguro</span>
                            </li>
                          </>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4">Links do Projeto</h2>
                    
                    <div className="flex flex-col space-y-4">
                      {project.githubUrl && (
                        <Button variant="outline" className="w-full justify-start border-slate-700 hover:bg-slate-800" asChild>
                          <a 
                            href={project.githubUrl}
                            target="_blank" 
                            rel="noopener noreferrer"
                          >
                            <Github className="mr-2 h-5 w-5" />
                            Ver no GitHub
                          </a>
                        </Button>
                      )}
                      
                      {project.deployUrl && (
                        <Button variant="default" className="w-full justify-start bg-primary hover:bg-primary/80" asChild>
                          <a 
                            href={project.deployUrl}
                            target="_blank" 
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="mr-2 h-5 w-5" />
                            Ver Demonstração
                          </a>
                        </Button>
                      )}
                    </div>
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
