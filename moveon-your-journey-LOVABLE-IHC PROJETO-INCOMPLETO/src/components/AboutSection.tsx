import { Award, Clock, Shield, Users } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Segurança Garantida",
    description: "Frota revisada mensalmente e seguro completo incluído em todas as locações",
  },
  {
    icon: Clock,
    title: "Suporte 24/7",
    description: "Assistência completa 24 horas por dia, 7 dias por semana, onde você estiver",
  },
  {
    icon: Award,
    title: "Qualidade Premium",
    description: "Carros seminovos e bem mantidos, sempre limpos e revisados",
  },
  {
    icon: Users,
    title: "10+ Anos no Mercado",
    description: "Experiência e confiabilidade comprovadas por milhares de clientes",
  },
];

const AboutSection = () => {
  return (
    <section id="sobre" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="mb-6">Sobre a MoveOn Cars</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Há mais de 10 anos, conectamos pessoas aos melhores veículos do mercado. Nossa missão é
              oferecer mobilidade com segurança, praticidade e preços justos. Do carro popular ao luxo
              premium, temos a solução perfeita para cada necessidade.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex gap-4 p-6 bg-background rounded-xl hover-lift animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-8 bg-gradient-to-br from-accent/5 to-accent/10 rounded-2xl animate-fade-in-up">
              <p className="text-4xl font-bold text-accent mb-2">200+</p>
              <p className="text-muted-foreground">Veículos Disponíveis</p>
            </div>
            <div className="p-8 bg-gradient-to-br from-secondary/5 to-secondary/10 rounded-2xl animate-fade-in-up" style={{ animationDelay: "100ms" }}>
              <p className="text-4xl font-bold text-secondary mb-2">50+</p>
              <p className="text-muted-foreground">Cidades Atendidas</p>
            </div>
            <div className="p-8 bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl animate-fade-in-up" style={{ animationDelay: "200ms" }}>
              <p className="text-4xl font-bold text-primary mb-2">99%</p>
              <p className="text-muted-foreground">Satisfação</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
