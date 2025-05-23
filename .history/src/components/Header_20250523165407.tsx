
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <header className="fixed w-full bg-background/80 backdrop-blur-sm z-50 border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-primary">
          Gabriel<span className="text-foreground">.dev</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-foreground hover:text-primary transition-colors">
            Início
          </Link>
          <Link to="/projetos" className="text-foreground hover:text-primary transition-colors">
            Projetos
          </Link>
          <Link to="/contato" className="text-foreground hover:text-primary transition-colors">
            Contato
          </Link>
        </nav>
        
        {/* Mobile Menu Button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>
      
      {/* Mobile Navigation */}
      <div 
        className={cn(
          "fixed inset-0 top-[60px] bg-slate-900/95 backdrop-blur-md z-40 flex flex-col items-center h-[200px] pt-8 md:hidden",
          isMenuOpen ? "animate-fade-in" : "hidden"
        )}
      >
        <nav className="flex flex-col items-center space-y-6 text-lg">
          <Link 
            to="/" 
            className="text-white hover:text-primary transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Início
          </Link>
          <Link 
            to="/projetos" 
            className="text-white hover:text-primary transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Projetos
          </Link>
          <Link 
            to="/contato" 
            className="text-white hover:text-primary transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Contato
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
