import { Crown, Shield, Sparkles, Zap } from "lucide-react";
import { Button } from "./ui/button";
import vipImage from "@/assets/vip-car.jpg";

const luxuryCars = [
  { name: "BMW Série 5", price: 450 },
  { name: "Audi Q5", price: 420 },
  { name: "Mercedes C200", price: 480 },
  { name: "Porsche Macan", price: 650 },
  { name: "Volvo XC60", price: 490 },
  { name: "Land Rover Discovery", price: 580 },
];

const vipFeatures = [
  {
    icon: Crown,
    title: "Luxo Premium",
    description: "Interior em couro legítimo e acabamento sofisticado",
  },
  {
    icon: Zap,
    title: "Alta Performance",
    description: "Motores potentes e tecnologia de ponta",
  },
  {
    icon: Shield,
    title: "Segurança Máxima",
    description: "Sistemas autônomos e assistência avançada",
  },
  {
    icon: Sparkles,
    title: "Experiência Única",
    description: "Atendimento VIP e entrega personalizada",
  },
];

const VIPSection = () => {
  return (
    <section id="vip" className="py-20 bg-gradient-to-br from-secondary via-primary to-purple-gray text-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full mb-4 backdrop-blur-sm">
            <Crown className="w-5 h-5 text-secondary" />
            <span className="text-sm font-semibold">ÁREA EXCLUSIVA VIP</span>
          </div>
          <h2 className="mb-6">Experiência de Luxo Premium</h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Descubra nossa coleção exclusiva de veículos de luxo. Do sedã executivo ao SUV premium,
            oferecemos experiências de condução incomparáveis.
          </p>
        </div>

        {/* VIP Image */}
        <div className="mb-16 animate-scale-in">
          <div className="relative rounded-3xl overflow-hidden max-w-4xl mx-auto shadow-2xl">
            <img src={vipImage} alt="Carro de luxo" className="w-full h-auto" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
              <p className="text-3xl font-bold mb-2">BMW Série 5</p>
              <p className="text-white/80">Tecnologia, conforto e performance reunidos</p>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {vipFeatures.map((feature, index) => (
            <div
              key={index}
              className="text-center animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <feature.icon className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
              <p className="text-white/80 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Luxury Cars List */}
        <div className="max-w-4xl mx-auto mb-12">
          <h3 className="text-2xl font-bold text-center mb-8">Veículos Disponíveis</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {luxuryCars.map((car, index) => (
              <div
                key={index}
                className="glass-dark rounded-xl p-6 hover-lift animate-fade-in-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-lg mb-1">{car.name}</p>
                    <p className="text-white/60 text-sm">Disponível para reserva</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">R$ {car.price}</p>
                    <p className="text-white/60 text-sm">/dia</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center animate-fade-in-up">
          <Button
            size="lg"
            className="bg-white text-primary hover:bg-white/90 font-bold text-lg px-8 py-6 h-auto animate-glow"
          >
            <Crown className="w-6 h-6 mr-2" />
            Entrar na Área VIP
          </Button>
          <p className="text-white/70 text-sm mt-4">
            Atendimento personalizado e entrega onde você estiver
          </p>
        </div>
      </div>
    </section>
  );
};

export default VIPSection;
