import { Calendar, MapPin, Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import heroImage from "@/assets/hero-car.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Carro moderno em cidade"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 z-10 pt-20">
        <div className="max-w-3xl animate-fade-in-up">
          <h1 className="text-white mb-6 leading-tight">
            Encontre o carro perfeito para cada momento
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8">
            Do popular ao super luxo. Alugue em minutos com total segurança.
          </p>

          {/* Search Form */}
          <div className="glass-dark rounded-2xl p-6 md:p-8 mb-6">
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              {/* Location */}
              <div className="space-y-2">
                <label className="text-sm text-white/80 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Local de Retirada
                </label>
                <Input
                  placeholder="Digite a cidade"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                />
              </div>

              {/* Pickup Date */}
              <div className="space-y-2">
                <label className="text-sm text-white/80 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Data de Retirada
                </label>
                <Input
                  type="datetime-local"
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>

              {/* Return Date */}
              <div className="space-y-2">
                <label className="text-sm text-white/80 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Data de Devolução
                </label>
                <Input
                  type="datetime-local"
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
            </div>

            <Button
              size="lg"
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground group"
            >
              <Search className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Buscar Veículos
            </Button>
          </div>

          {/* VIP CTA */}
          <div className="flex items-center gap-4 text-white/90">
            <span className="text-sm">Procurando algo exclusivo?</span>
            <a
              href="#vip"
              className="text-secondary hover:text-secondary/80 font-semibold underline underline-offset-4 transition-colors"
            >
              Conheça nossa Área VIP
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-10">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-white/50 rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
