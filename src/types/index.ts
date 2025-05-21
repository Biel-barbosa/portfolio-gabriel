
export interface Project {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  githubUrl?: string;
  deployUrl?: string;
  technologies: string[];
  featured?: boolean;
  deployedAt?: string;
  source?: 'github' | 'vercel' | 'featured';
}

export interface VercelProject {
  id: string;
  name: string;
  framework: string;
  latestDeployments: {
    alias: string[];
    meta: {
      githubCommitAuthorName: string;
    };
    state: string;
    createdAt: string;
    url: string;
  }[];
}

export interface GithubRepo {
  id: number;
  name: string;
  description: string;
  language: string;
  html_url: string;
  updated_at: string;
  homepage: string | null;
}
