
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const BenefitsBox = () => {
  return (
    <div className="w-full max-w-md mx-auto my-8 p-6 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 shadow-lg animate-fade-in">
      <h2 className="text-xl font-semibold mb-4 text-center">Benefits eines persönlichen Erstgesprächs</h2>
      
      <div className="space-y-3">
        <div className="flex items-start">
          <Check className="h-5 w-5 text-[#22C55E] mr-2 mt-0.5 flex-shrink-0" />
          <p>Eine klare Roadmap für deine Ziele definieren</p>
        </div>
        
        <div className="flex items-start">
          <Check className="h-5 w-5 text-[#22C55E] mr-2 mt-0.5 flex-shrink-0" />
          <p>Individuelle Hinweise erhalten, wie du deine Ziele erreichen kannst</p>
        </div>
      </div>
    </div>
  );
};

export default BenefitsBox;
