
import React from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CoachPackage } from '@/types/coach';

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
      className={`bg-dark-elegant-surface rounded-xl shadow-lg overflow-hidden transition-all duration-700 delay-${animationDelay} transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } ${pkg.highlighted ? 'ring-1 ring-[#22C55E]/30' : 'border border-dark-elegant-accent/10'}`}
    >
      {pkg.highlighted && (
        <div className="bg-[#22C55E] text-white text-center text-sm py-1 font-medium">
          Empfohlen
        </div>
      )}
      
      <div className="p-6">
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold mb-2 text-dark-elegant-text">{pkg.name}</h3>
          <div className="flex items-center justify-center">
            <span className="text-3xl font-bold text-dark-elegant-text">{pkg.price}€</span>
            <span className="text-dark-elegant-muted ml-1">{pkg.period}</span>
          </div>
          <p className="text-dark-elegant-muted mt-2">{pkg.description}</p>
        </div>
        
        <div className="space-y-3 mb-6">
          {pkg.features.map((feature, index) => (
            <div key={index} className="flex items-start">
              <div className="flex-shrink-0 mt-0.5">
                <Check className="h-5 w-5 text-[#22C55E]" />
              </div>
              <p className="ml-3 text-dark-elegant-muted">{feature}</p>
            </div>
          ))}
        </div>
        
        <Button 
          onClick={onSelect}
          className={`w-full transition-all duration-300 ${
            pkg.highlighted
              ? 'bg-[#22C55E] hover:bg-[#1ea34d] text-white'
              : 'bg-dark-elegant-accent hover:bg-dark-elegant-accent/80 text-dark-elegant-text'
          }`}
        >
          Auswählen
        </Button>
      </div>
    </div>
  );
};

export default PackageCard;
