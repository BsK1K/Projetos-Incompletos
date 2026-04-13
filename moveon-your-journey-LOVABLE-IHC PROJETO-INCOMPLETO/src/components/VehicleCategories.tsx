import VehicleCard from "./VehicleCard";
import popularCarsImage from "@/assets/popular-cars.jpg";
import suvCarsImage from "@/assets/suv-cars.jpg";

const popularCars = [
  {
    name: "Chevrolet Onix",
    category: "Popular",
    image: popularCarsImage,
    price: 89,
    fuel: "Flex",
    passengers: 5,
    transmission: "Manual",
    features: ["Ar-condicionado", "Direção elétrica", "Bluetooth"],
  },
  {
    name: "Hyundai HB20",
    category: "Popular",
    image: popularCarsImage,
    price: 95,
    fuel: "Flex",
    passengers: 5,
    transmission: "Manual",
    features: ["Ar-condicionado", "Direção elétrica", "USB"],
  },
  {
    name: "Fiat Argo",
    category: "Popular",
    image: popularCarsImage,
    price: 92,
    fuel: "Flex",
    passengers: 5,
    transmission: "Manual",
    features: ["Ar-condicionado", "Direção hidráulica"],
  },
];

const sedans = [
  {
    name: "Toyota Corolla",
    category: "Sedã",
    image: popularCarsImage,
    price: 180,
    fuel: "Flex",
    passengers: 5,
    transmission: "Automático",
    features: ["Ar Digital", "Couro", "Central Multimídia"],
  },
  {
    name: "Honda Civic",
    category: "Sedã",
    image: popularCarsImage,
    price: 190,
    fuel: "Flex",
    passengers: 5,
    transmission: "CVT",
    features: ["Câmera de ré", "Sensores", "Bancos em couro"],
  },
  {
    name: "VW Virtus",
    category: "Sedã",
    image: popularCarsImage,
    price: 150,
    fuel: "Flex",
    passengers: 5,
    transmission: "Automático",
    features: ["Multimídia", "Ar Digital", "Piloto automático"],
  },
];

const suvs = [
  {
    name: "Jeep Compass",
    category: "SUV",
    image: suvCarsImage,
    price: 220,
    fuel: "Flex",
    passengers: 5,
    transmission: "Automático",
    features: ["4x4", "Teto panorâmico", "Bancos em couro"],
  },
  {
    name: "Hyundai Creta",
    category: "SUV",
    image: suvCarsImage,
    price: 195,
    fuel: "Flex",
    passengers: 5,
    transmission: "Automático",
    features: ["Multimídia 10'", "Câmera 360°", "Ar Digital"],
  },
  {
    name: "VW T-Cross",
    category: "SUV",
    image: suvCarsImage,
    price: 185,
    fuel: "Flex",
    passengers: 5,
    transmission: "Automático",
    features: ["Active Info Display", "Keyless", "Assistente de estacionamento"],
  },
];

const VehicleCategories = () => {
  return (
    <section id="veiculos" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Popular Cars */}
        <div className="mb-20">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="mb-4">Carros Populares</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Econômicos, confiáveis e perfeitos para o dia a dia na cidade. Baixo custo de
              combustível e manutenção acessível.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularCars.map((car, index) => (
              <div key={index} className="animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                <VehicleCard {...car} />
              </div>
            ))}
          </div>
        </div>

        {/* Sedans */}
        <div className="mb-20">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="mb-4">Sedãs Executivos</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Conforto premium para viagens longas. Porta-malas amplo, suspensão refinada e recursos
              tecnológicos avançados.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sedans.map((car, index) => (
              <div key={index} className="animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                <VehicleCard {...car} />
              </div>
            ))}
          </div>
        </div>

        {/* SUVs */}
        <div>
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="mb-4">SUVs Aventura</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Altura elevada e segurança extra. Ideal para famílias e aventuras, com tecnologias de
              assistência ao motorista.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {suvs.map((car, index) => (
              <div key={index} className="animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                <VehicleCard {...car} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VehicleCategories;
