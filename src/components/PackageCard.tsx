
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
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-700 delay-${animationDelay} transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } ${pkg.highlighted ? 'ring-2 ring-purple-500 dark:ring-purple-400' : 'border border-gray-200 dark:border-gray-700'}`}
    >
      {pkg.highlighted && (
        <div className="bg-gradient-to-r from-purple-600 to-purple-400 dark:from-purple-500 dark:to-purple-300 text-white text-center text-sm py-1 font-medium">
          Empfohlen
        </div>
      )}
      
      <div className="p-6">
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
          <div className="flex items-center justify-center">
            <span className="text-3xl font-bold">{pkg.price}€</span>
            <span className="text-gray-500 dark:text-gray-400 ml-1">{pkg.period}</span>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mt-2">{pkg.description}</p>
        </div>
        
        <div className="space-y-3 mb-6">
          {pkg.features.map((feature, index) => (
            <div key={index} className="flex items-start">
              <div className="flex-shrink-0 mt-0.5">
                <Check className="h-5 w-5 text-green-500 dark:text-green-400" />
              </div>
              <p className="ml-3 text-gray-600 dark:text-gray-300">{feature}</p>
            </div>
          ))}
        </div>
        
        <Button 
          onClick={onSelect}
          className={`w-full transition-all duration-300 ${
            pkg.highlighted
              ? 'bg-gradient-to-r from-purple-600 to-purple-400 hover:from-purple-700 hover:to-purple-500'
              : 'bg-gray-800 hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600'
          }`}
        >
          Auswählen
        </Button>
      </div>
    </div>
  );
};

export default PackageCard;
