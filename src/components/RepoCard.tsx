
import React from 'react';
import { GithubRepo } from '../types';
import { Github, ArrowRight, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface RepoCardProps {
  repo: GithubRepo;
}

const RepoCard: React.FC<RepoCardProps> = ({ repo }) => {
  // Formatar a data de atualização
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Card className="overflow-hidden flex flex-col card-hover">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">{repo.name}</CardTitle>
          <Github className="h-5 w-5 text-muted-foreground" />
        </div>
        <CardDescription className="line-clamp-2">
          {repo.description || 'Sem descrição disponível'}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <div className="flex flex-wrap gap-2 mt-2">
          {repo.language && (
            <span className="tech-tag">
              {repo.language}
            </span>
          )}
        </div>
        
        <div className="flex items-center text-sm text-muted-foreground mt-4">
          <Calendar className="mr-1 h-4 w-4" />
          <span>Atualizado em {formatDate(repo.updated_at)}</span>
        </div>
      </CardContent>
      
      <CardFooter>
        <Button 
          variant="outline" 
          className="w-full justify-between group"
          asChild
        >
          <a 
            href={repo.html_url} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Ver no GitHub
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RepoCard;
