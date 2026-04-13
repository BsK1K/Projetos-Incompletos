import { Star } from "lucide-react";
import { Card, CardContent } from "./ui/card";

const testimonials = [
  {
    name: "Mariana Silva",
    role: "Empresária",
    rating: 5,
    comment:
      "Excelente serviço! Aluguei um Corolla para uma viagem de negócios e foi perfeito. Carro impecável e processo super rápido.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
  },
  {
    name: "Carlos Eduardo",
    role: "Designer",
    rating: 5,
    comment:
      "A Área VIP é incrível! Aluguei uma BMW Série 5 para um evento especial. Atendimento excepcional e carro impecável.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
  },
  {
    name: "Ana Paula",
    role: "Gerente de Projetos",
    rating: 5,
    comment:
      "Sempre alugo para viagens em família. Carros sempre limpos e revisados. Já indiquei para vários amigos!",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
  },
  {
    name: "Roberto Mendes",
    role: "Consultor",
    rating: 5,
    comment:
      "Processo de reserva muito simples. O HB20 que aluguei estava novinho e super econômico. Recomendo!",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
  },
];

const Testimonials = () => {
  return (
    <section id="depoimentos" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="mb-4">O que nossos clientes dizem</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Mais de 10.000 clientes satisfeitos em todo o Brasil
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="hover-lift animate-fade-in-up border-border/50"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-bold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>

                <div className="flex gap-1 mb-3">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  "{testimonial.comment}"
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-8 px-8 py-4 bg-muted rounded-full">
            <div className="text-center">
              <p className="text-3xl font-bold text-accent">4.9</p>
              <p className="text-sm text-muted-foreground">Avaliação Média</p>
            </div>
            <div className="w-px h-12 bg-border" />
            <div className="text-center">
              <p className="text-3xl font-bold text-accent">10k+</p>
              <p className="text-sm text-muted-foreground">Clientes</p>
            </div>
            <div className="w-px h-12 bg-border" />
            <div className="text-center">
              <p className="text-3xl font-bold text-accent">50+</p>
              <p className="text-sm text-muted-foreground">Cidades</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
