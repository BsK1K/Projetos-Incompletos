import { Fuel, Users, Settings } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";

interface VehicleCardProps {
  name: string;
  category: string;
  image: string;
  price: number;
  fuel: string;
  passengers: number;
  transmission: string;
  features?: string[];
}

const VehicleCard = ({
  name,
  category,
  image,
  price,
  fuel,
  passengers,
  transmission,
  features = [],
}: VehicleCardProps) => {
  return (
    <Card className="hover-lift group overflow-hidden border-border/50">
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-accent text-accent-foreground text-xs font-semibold rounded-full">
            {category}
          </span>
        </div>
      </div>

      <CardContent className="p-6">
        <h3 className="text-xl font-bold mb-4">{name}</h3>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="flex flex-col items-center gap-1 text-sm">
            <Fuel className="w-5 h-5 text-muted-foreground" />
            <span className="text-muted-foreground">{fuel}</span>
          </div>
          <div className="flex flex-col items-center gap-1 text-sm">
            <Users className="w-5 h-5 text-muted-foreground" />
            <span className="text-muted-foreground">{passengers} pessoas</span>
          </div>
          <div className="flex flex-col items-center gap-1 text-sm">
            <Settings className="w-5 h-5 text-muted-foreground" />
            <span className="text-muted-foreground">{transmission}</span>
          </div>
        </div>

        {features.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {features.map((feature, index) => (
              <span
                key={index}
                className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded"
              >
                {feature}
              </span>
            ))}
          </div>
        )}
      </CardContent>

      <CardFooter className="p-6 pt-0 flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">A partir de</p>
          <p className="text-2xl font-bold">
            R$ {price}
            <span className="text-sm text-muted-foreground font-normal">/dia</span>
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">Ver Detalhes</Button>
      </CardFooter>
    </Card>
  );
};

export default VehicleCard;
