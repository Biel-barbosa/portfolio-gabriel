
import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">Entre em Contato</h1>
            <p className="text-lg text-muted-foreground">
              Obrigado por visitar meu portfólio! Estou sempre aberto para novas oportunidades,
              colaborações ou simplesmente para trocar ideias sobre desenvolvimento front-end.
              Sinta-se à vontade para entrar em contato comigo através de um dos canais abaixo.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-secondary rounded-lg p-6 flex flex-col items-center text-center animate-scale-in">
              <Linkedin className="h-12 w-12 text-primary mb-4" />
              <h2 className="text-xl font-semibold mb-2">LinkedIn</h2>
              <p className="text-muted-foreground mb-4">
                Vamos nos conectar! Siga-me para atualizações profissionais e discussões sobre desenvolvimento front-end.
              </p>
              <Button className="w-full md:w-auto" size="lg" asChild>
                <a 
                  href="https://www.linkedin.com/in/gabriel-a-barbosa/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Conectar no LinkedIn
                </a>
              </Button>
            </div>
            
            <div className="bg-secondary rounded-lg p-6 flex flex-col items-center text-center animate-scale-in" style={{ animationDelay: '0.1s' }}>
              <Github className="h-12 w-12 text-primary mb-4" />
              <h2 className="text-xl font-semibold mb-2">GitHub</h2>
              <p className="text-muted-foreground mb-4">
                Explore meus repositórios e acompanhe meus projetos open-source e estudos de tecnologia.
              </p>
              <Button className="w-full md:w-auto" size="lg" asChild>
                <a 
                  href="https://github.com/Biel-barbosa" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Ver GitHub
                </a>
              </Button>
            </div>
            
            <div className="bg-secondary rounded-lg p-6 flex flex-col items-center text-center animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <Mail className="h-12 w-12 text-primary mb-4" />
              <h2 className="text-xl font-semibold mb-2">Email</h2>
              <p className="text-muted-foreground mb-4">
                Prefere o contato direto? Envie-me um email e responderei o mais breve possível.
              </p>
              <Button className="w-full md:w-auto" size="lg" asChild>
                <a href="mailto:gabriellbarbosaads@gmail.com">
                  Enviar Email
                </a>
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
