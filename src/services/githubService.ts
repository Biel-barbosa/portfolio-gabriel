
import { useState, useEffect } from 'react';

export interface GithubRepo {
  id: number;
  name: string;
  description: string;
  language: string;
  html_url: string;
  updated_at: string;
  homepage: string | null;
}

// Função para buscar repositórios do GitHub
export const fetchGitHubRepos = async (): Promise<GithubRepo[]> => {
  try {
    const response = await fetch('https://api.github.com/users/Biel-barbosa/repos');
    
    if (!response.ok) {
      throw new Error('Falha ao buscar repositórios do GitHub');
    }
    
    const data = await response.json();
    
    // Ordenar por data de atualização (mais recentes primeiro)
    return data.sort((a: GithubRepo, b: GithubRepo) => 
      new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
    );
  } catch (error) {
    console.error('Erro ao buscar repositórios do GitHub:', error);
    return [];
  }
};

// Hook customizado para facilitar o uso nos componentes
export const useGithubRepos = () => {
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadRepos = async () => {
      try {
        setIsLoading(true);
        const data = await fetchGitHubRepos();
        setRepos(data);
      } catch (err) {
        setError('Falha ao carregar repositórios. Por favor, tente novamente mais tarde.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadRepos();
  }, []);

  return { repos, isLoading, error };
};
