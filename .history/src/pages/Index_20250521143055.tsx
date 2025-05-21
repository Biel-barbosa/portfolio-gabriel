
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Code, LayoutGrid } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { featuredProjects } from '../services/projectService';
import ProjectCard from '../components/ProjectCard';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Project } from '../types';

const Index = () => {
  const technologies = [
    'React', 'Next.js', 'Vue.js', 'Angular', 'TypeScript', 'JavaScript',
    'Tailwind CSS', 'Styled Components', 'HTML5', 'CSS3', 'Git', 'GitHub',
    'Figma', 'Jest', 'Node.js', 'Express'
  ];

  const projetosManuais: Project[] = [
  {
    id: "dpl_BLck3WDrNZhwkVc49xajeQAu69cC",
    name: "Dashboard Analytics",
    description: "Loja virtual com filtros, carrinho e página de checkout.",
    imageUrl: "/imgdashbord.png",
    githubUrl: "https://github.com/seuusuario/capputeeno",
    deployUrl: "https://capputeeno.vercel.app",
    source: "vercel",
    deployedAt: "2024-04-10",
    technologies: ["Next.js", "TypeScript", "Styled-components"],
  },
  {
    id: "dpl_3w2TfSdH7DXGqBCjULvTJUUgPTSY",
    name: "Gestor de Eventos",
    description: "Aplicação simples de lista de tarefas feita em Vue.",
    imageUrl: "/imggestoreventos.png",
    deployUrl: "https://todo-vue.vercel.app",
    source: "vercel",
    deployedAt: "2024-02-15",
    technologies: ["Vue.js", "JavaScript", "HTML", "CSS"],
  },
  {
    id: "dpl_6ryxnKfQpEAB3DwHvLLtUHP2mrNX",
    name: "Quadro de tarefas",
    description: "Sistema de tarefas com drag and drop, filtros e localStorage.",
    imageUrl: "/imgquadrotarefas.png",
    deployUrl: "https://taskboard.vercel.app",
    source: "vercel",
    deployedAt: "2024-05-01",
    technologies: ["Vue 3", "TypeScript", "Pinia", "vuedraggable"],
  }
];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section className="py-20 md:py-32 px-4 bg-gradient-to-b from-secondary to-background">
          <div className="container mx-auto">
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Olá, eu sou <span className="text-primary">Gabriel Barbosa</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8">
                Desenvolvedor front-end júnior apaixonado por tecnologia, em transição de carreira,
                com grande vontade de aprender e evoluir. Acredito na força do código para transformar
                ideias em experiências incríveis e funcionais.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="rounded-full" asChild>
                  <Link to="/projetos">
                    Ver Projetos <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="rounded-full" asChild>
                  <Link to="/contato">
                    Entrar em Contato
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-16 md:py-24 px-4">
          <div className="container mx-auto">
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-4 flex items-center">
                <Code className="mr-2 h-6 w-6" /> Sobre Mim
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Minhas tecnologias e ferramentas favoritas que uso para construir experiências web modernas e responsivas.
              </p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 max-w-4xl mx-auto">
              {technologies.map((tech, index) => (
                <div 
                  key={index}
                  className="bg-secondary rounded-lg py-3 px-4 text-center tech-tag card-hover"
                >
                  {tech}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Projects Section */}
        <section className="py-16 md:py-24 px-4 bg-secondary/50">
          <div className="container mx-auto">
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-4 flex items-center">
                <LayoutGrid className="mr-2 h-6 w-6" /> Projetos em Destaque
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Alguns dos meus trabalhos recentes que demonstram minhas habilidades e paixão pelo desenvolvimento front-end.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projetosManuais.map((project) => (
                <ProjectCard key={project.id} project={project} featured />
              ))}
            </div>
            
            <div className="flex justify-center mt-12">
              <Button variant="outline" size="lg" className="rounded-full" asChild>
                <Link to="/projetos">
                  Ver Todos os Projetos <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
