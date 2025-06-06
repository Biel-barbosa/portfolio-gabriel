import { Project, VercelProject } from '../types';
import { fetchVercelProjects as fetchVercelProjectsApi } from '../api/vercel-projects';

// Projetos em destaque para mostrar na página inicial
export const featuredProjects: Project[] = [
  {
    id: '1',
    name: 'E-commerce React',
    description: 'Plataforma completa de e-commerce desenvolvida com React, TypeScript, e TailwindCSS. Inclui autenticação de usuários, carrinho de compras, e integração com API de pagamentos.',
    imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
    githubUrl: 'https://github.com/Biel-barbosa/ecommerce-react',
    deployUrl: 'https://ecommerce-react-vercel.app',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Redux'],
    featured: true
  },
  {
    id: '2',
    name: 'CMS Dashboard',
    description: 'Sistema de gerenciamento de conteúdo com painel administrativo intuitivo. Permite gerenciar posts, usuários e estatísticas em tempo real.',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
    githubUrl: 'https://github.com/Biel-barbosa/cms-dashboard',
    deployUrl: 'https://cms-dashboard-vercel.app',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Prisma', 'MongoDB'],
    featured: true
  },
  {
    id: '3',
    name: 'App de Tarefas',
    description: 'Aplicativo de gerenciamento de tarefas com funcionalidades de arrastar e soltar, categorização e lembretes por email.',
    imageUrl: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d',
    githubUrl: 'https://github.com/Biel-barbosa/task-app',
    deployUrl: 'https://task-app-vercel.app',
    technologies: ['Vue.js', 'JavaScript', 'CSS', 'Firebase'],
    featured: true
  }
];

// Tecnologias comuns para atribuir a projetos com base no nome/framework
const getTechnologiesForProject = (project: VercelProject) => {
  const name = project.name.toLowerCase();
  const framework = project.framework?.toLowerCase() || '';
  
  // Base technologies based on the Vercel framework
  const baseTechs = [];
  
  if (framework.includes('next')) {
    baseTechs.push('Next.js', 'React');
  } else if (framework.includes('react')) {
    baseTechs.push('React');
  } else if (framework.includes('vue')) {
    baseTechs.push('Vue.js');
  } else if (framework.includes('angular')) {
    baseTechs.push('Angular');
  } else if (framework.includes('svelte')) {
    baseTechs.push('Svelte');
  } else {
    baseTechs.push('JavaScript');
  }
  
  // Add additional technologies based on project name
  if (name.includes('dashboard') || name.includes('admin')) {
    baseTechs.push('ChartJS', 'Tailwind CSS', 'ShadcnUI');
  } else if (name.includes('ecommerce') || name.includes('loja')) {
    baseTechs.push('Redux', 'Stripe', 'Tailwind CSS');
  } else if (name.includes('blog')) {
    baseTechs.push('Markdown', 'CMS', 'Tailwind CSS');
  } else if (name.includes('api') || name.includes('backend')) {
    baseTechs.push('Node.js', 'Express', 'MongoDB');
  } else if (name.includes('app') || name.includes('aplicativo')) {
    baseTechs.push('Tailwind CSS', 'React Query', 'Zod');
  } else if (name.includes('portfolio') || name.includes('site')) {
    baseTechs.push('Tailwind CSS', 'Framer Motion', 'TypeScript');
  } else {
    baseTechs.push('Tailwind CSS', 'TypeScript');
  }
  
  return [...new Set(baseTechs)]; // Remove duplicates
};

// Função para criar uma descrição melhor para os projetos da Vercel
const generateProjectDescription = (project: VercelProject) => {
  const name = project.name.toLowerCase();
  
  if (name.includes('dashboard')) {
    return `Painel administrativo ${project.name} desenvolvido com ${project.framework || 'tecnologias modernas'} para visualização de dados e gerenciamento de recursos. Inclui gráficos interativos, tabelas dinâmicas e controle de acesso.`;
  } else if (name.includes('ecommerce') || name.includes('loja')) {
    return `Plataforma de e-commerce ${project.name} com catálogo de produtos, carrinho de compras e checkout seguro. Integração com sistemas de pagamento e gerenciamento de estoque.`;
  } else if (name.includes('landing') || name.includes('page')) {
    return `Landing page moderna e responsiva para ${project.name}, otimizada para conversão e experiência do usuário. Design clean com animações suaves e formulários de contato.`;
  } else if (name.includes('blog')) {
    return `Blog ${project.name} com sistema de gerenciamento de conteúdo, categorias e comentários. Interface amigável para criação e edição de posts com suporte a Markdown.`;
  } else if (name.includes('app') || name.includes('aplicativo')) {
    return `Aplicativo web ${project.name} com interface responsiva e experiência de usuário aprimorada. Recursos de autenticação, persistência de dados e navegação intuitiva.`;
  } else if (name.includes('portfolio') || name.includes('site')) {
    return `Site de portfólio ${project.name} com design moderno e responsivo. Apresentação de projetos, habilidades e informações profissionais de maneira interativa e visualmente atraente.`;
  } else {
    return `Aplicação web ${project.name} desenvolvida com ${project.framework || 'tecnologias modernas'} para oferecer uma experiência de usuário excepcional. Solução eficiente e escalável para os desafios propostos.`;
  }
};

// Função para buscar projetos da API da Vercel
export const fetchVercelProjects = async (): Promise<Project[]> => {
  try {
    // Buscar projetos da Vercel utilizando nossa função de API
    const data = await fetchVercelProjectsApi();
    
    // Converter os dados da API da Vercel para o formato do nosso app
    const projects: Project[] = data.map((project: VercelProject) => {
      // Pegar o último deploy, se existir
      const latestDeployment = project.latestDeployments && project.latestDeployments.length > 0
        ? project.latestDeployments[0]
        : null;
      
      const technologies = getTechnologiesForProject(project);
      const description = generateProjectDescription(project);
      
      // Selecionar uma imagem baseada no nome do projeto
      let imageUrl;
      const projectName = project.name.toLowerCase();
      
      if (projectName.includes('dashboard')) {
        imageUrl = 'https://images.unsplash.com/photo-1531297484001-80022131f5a1';
      } else if (projectName.includes('ecommerce')) {
        imageUrl = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f';
      } else if (projectName.includes('blog')) {
        imageUrl = 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d';
      } else if (projectName.includes('api')) {
        imageUrl = 'https://images.unsplash.com/photo-1518770660439-4636190af475';
      } else if (projectName.includes('portfolio') || projectName.includes('site')) {
        imageUrl = 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0';
      } else if (projectName.includes('app') || projectName.includes('aplicativo')) {
        imageUrl = 'https://images.unsplash.com/photo-1551650975-87deedd944c3';
      } else {
        imageUrl = 'https://images.unsplash.com/photo-1498050108023-c5249f4df085';
      }
      
      return {
        id: project.id,
        name: project.name,
        description: description,
        imageUrl: imageUrl,
        deployUrl: latestDeployment?.url?.includes('vercel.app')
          ? `https://${project.name.toLowerCase().replace(/\s+/g, '-')}.vercel.app`
          : '',
        githubUrl: `https://github.com/Biel-barbosa/${project.name.toLowerCase().replace(/\s+/g, '-')}`,
        technologies: technologies,
        deployedAt: latestDeployment?.createdAt,
        source: 'vercel'
      };
    });
    
    return [...projects, ...featuredProjects];
  } catch (error) {
    console.error('Erro ao buscar projetos:', error);
    // Se houver erro, retorna pelo menos os projetos em destaque
    return featuredProjects;
  }
};

// Função para obter um projeto por ID
export const getProjectById = async (id: string): Promise<Project | null> => {
  try {
    // Em um cenário real, você buscaria o projeto específico da API
    // Como estamos usando dados mockados, vamos filtrar do array
    const allProjects = await fetchVercelProjects();
    const project = allProjects.find(p => p.id === id);
    
    return project || null;
  } catch (error) {
    console.error('Erro ao buscar projeto por ID:', error);
    return null;
  }
};
