
// Handler para buscar projetos da Vercel

export async function fetchVercelProjects() {
  try {
    const VERCEL_TOKEN = 'jzprp7RQAOHCJR7IR6Gez3uf'; // Normalmente seria process.env.VERCEL_TOKEN
    
    const response = await fetch('https://api.vercel.com/v6/projects', {
      headers: {
        'Authorization': `Bearer ${VERCEL_TOKEN}`,
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error(`Erro ao buscar projetos da Vercel: ${response.status}`);
    }

    const data = await response.json();
    return data.projects || [];
  } catch (error) {
    console.error('Erro na API:', error);
    throw new Error('Failed to fetch Vercel projects');
  }
}
