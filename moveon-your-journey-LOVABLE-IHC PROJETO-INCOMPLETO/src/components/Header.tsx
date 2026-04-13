import { Car, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Car className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold">
              <span className="text-gradient">MoveOn</span> Cars
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#veiculos" className="text-foreground hover:text-accent transition-colors">
              Veículos
            </a>
            <a href="#vip" className="text-foreground hover:text-secondary transition-colors">
              Área VIP
            </a>
            <a href="#sobre" className="text-foreground hover:text-accent transition-colors">
              Sobre
            </a>
            <a href="#depoimentos" className="text-foreground hover:text-accent transition-colors">
              Depoimentos
            </a>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" className="hover:text-accent">
              Entrar
            </Button>
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
              Cadastrar
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 flex flex-col gap-4 animate-fade-in">
            <a
              href="#veiculos"
              className="text-foreground hover:text-accent transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Veículos
            </a>
            <a
              href="#vip"
              className="text-foreground hover:text-secondary transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Área VIP
            </a>
            <a
              href="#sobre"
              className="text-foreground hover:text-accent transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Sobre
            </a>
            <a
              href="#depoimentos"
              className="text-foreground hover:text-accent transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Depoimentos
            </a>
            <div className="flex flex-col gap-2 mt-4">
              <Button variant="ghost" className="w-full">
                Entrar
              </Button>
              <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                Cadastrar
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
