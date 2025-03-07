
import React from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CoachPackage } from '@/types/coach';
import { cn } from '@/lib/utils';

interface PackageCardProps {
  package: CoachPackage;
  onSelect: () => void;
  animationDelay: number;
  isVisible: boolean;
}

const PackageCard: React.FC<PackageCardProps> = ({ 
  package: pkg, 
  onSelect,
  animationDelay,
  isVisible
}) => {
  return (
    <div 
      className={`transition-all duration-700 transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } h-full`}
      style={{ transitionDelay: `${animationDelay}ms` }}
    >
      <div className={cn(
        "h-full flex flex-col relative backdrop-blur-md rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:translate-y-[-4px]",
        pkg.highlighted 
          ? "bg-gradient-to-b from-[#1c2b1e] to-[#1a1f2c] border border-[#22C55E]/20" 
          : "bg-black/20 border border-white/5"
      )}>
        {pkg.highlighted && (
          <div className="absolute top-0 left-0 right-0">
            <div className="bg-gradient-to-r from-[#22C55E]/80 via-[#22C55E] to-[#22C55E]/80 text-white text-center text-sm py-1.5 font-medium">
              Empfohlen
            </div>
          </div>
        )}
        
        <div className="p-6 pt-8 flex-grow flex flex-col">
          <div className="text-center mb-6 flex-grow-0">
            <h3 className={cn(
              "text-xl font-bold mb-2",
              pkg.highlighted ? "text-[#22C55E]" : "text-white"
            )}>
              {pkg.name}
            </h3>
            <div className="flex items-center justify-center mb-2">
              <span className="text-4xl font-bold text-white">{pkg.price}€</span>
              <span className="text-gray-400 ml-2 text-sm">{pkg.period}</span>
            </div>
            <p className="text-gray-400 mt-2 font-light">{pkg.description}</p>
          </div>
          
          <div className="space-y-4 mb-6 flex-grow">
            {pkg.features.map((feature, index) => (
              <div key={index} className="flex items-start">
                <div className={cn(
                  "flex-shrink-0 p-1 rounded-full mt-0.5",
                  pkg.highlighted ? "bg-[#22C55E]/20" : "bg-white/5"
                )}>
                  <Check className={cn(
                    "h-3.5 w-3.5", 
                    pkg.highlighted ? "text-[#22C55E]" : "text-gray-300"
                  )} />
                </div>
                <p className="ml-3 text-gray-300 text-sm">{feature}</p>
              </div>
            ))}
          </div>
          
          <Button 
            onClick={onSelect}
            className={cn(
              "w-full py-6 transition-all duration-300 flex-shrink-0 font-medium",
              pkg.highlighted
                ? "bg-[#22C55E] hover:bg-[#1ea34d] text-white shadow-lg shadow-[#22C55E]/20"
                : "bg-white/10 hover:bg-white/15 text-white border border-white/10"
            )}
          >
            Auswählen
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;
