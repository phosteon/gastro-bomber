
import { Calendar, ShoppingCart, Utensils, Clipboard } from "lucide-react";
import { cn } from "@/lib/utils";

const FutureFeatures = () => {
  const features = [
    {
      icon: <Clipboard className="h-6 w-6" />,
      title: "Trainingsplanung",
      description: "Personalisierte Trainingsroutinen basierend auf deinen Zielen und Zeitplan"
    },
    {
      icon: <ShoppingCart className="h-6 w-6" />,
      title: "Supermarkt-Unterstützung",
      description: "Hilfe bei der Auswahl gesunder Produkte beim Einkaufen"
    },
    {
      icon: <Utensils className="h-6 w-6" />,
      title: "Restaurant-Guide",
      description: "Tipps für gesunde Optionen beim Essen gehen"
    },
    {
      icon: <Calendar className="h-6 w-6" />,
      title: "Ernährungsplanung",
      description: "Alltagstaugliche Ernährungspläne für deine individuellen Bedürfnisse"
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto my-12 px-4">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Das volle Paket bei Harvey Cowbrich</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Entdecke alle Funktionen, die dir im vollen Paket zur Verfügung stehen werden
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {features.map((feature, index) => (
          <div 
            key={index} 
            className="flex flex-col p-6 bg-dark-elegant-surface/40 backdrop-blur-sm rounded-lg border border-white/10 hover:border-white/20 transition-all"
          >
            <div className="bg-dark-elegant-accent/40 p-3 rounded-full w-fit mb-4">
              {feature.icon}
            </div>
            <h3 className="text-lg font-medium mb-2">{feature.title}</h3>
            <p className="text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FutureFeatures;
