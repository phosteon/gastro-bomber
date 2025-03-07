
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Calendar, Check, Star } from 'lucide-react';
import PackageCard from '@/components/PackageCard';
import CalendarBooking from '@/components/CalendarBooking';
import { Button } from '@/components/ui/button';
import { Coach } from '@/types/coach';

const coaches: Coach[] = [
  {
    name: "Jan Herwig Haubrich",
    subtitle: "Männercoach & Abnehmexperte",
    assistantId: "agent_4b42e7910546b5b0973ecf64cb",
    agent_id: "agent_4b42e7910546b5b0973ecf64cb",
    avatarUrl: "/lovable-uploads/19226ee2-e8c4-471d-8544-d569bb3ab21e.png",
    packages: {
      community: {
        name: "Community-Mitgliedschaft",
        price: 99,
        period: "pro Monat",
        description: "Gemeinsam zum Erfolg mit unserer Community.",
        features: [
          "Austausch mit Gleichgesinnten",
          "Fokus auf Gruppenunterstützung",
          "Monatliche Q&A-Sessions"
        ]
      },
      premium: {
        name: "Premium Coaching",
        price: 999,
        period: "für 3 Monate",
        description: "Intensive Betreuung für maximale Ergebnisse.",
        features: [
          "Inklusive Community-Mitgliedschaft",
          "Persönliche 1:1 Betreuung",
          "Individueller Stoffwechselplan",
          "Wöchentliche Check-ins"
        ],
        highlighted: true
      }
    }
  }
];

const AfterCallPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  
  // Default to the first coach for now, in a real app this would come from state/params
  const coach = coaches[0];

  useEffect(() => {
    // Trigger entrance animations
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const handlePackageSelect = (packageType: string) => {
    setSelectedPackage(packageType);
    setTimeout(() => {
      setCalendarVisible(true);
      document.getElementById('calendar-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  const handleBackToHome = () => {
    setIsVisible(false);
    setTimeout(() => navigate('/'), 500);
  };

  return (
    <div className="min-h-screen bg-[#171923] relative overflow-x-hidden">
      {/* Enhanced background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-5%] right-[-5%] w-2/5 h-2/5 bg-[#22C55E]/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-5%] left-[-5%] w-2/5 h-2/5 bg-[#22C55E]/10 rounded-full blur-[100px]"></div>
        <div className="absolute top-[40%] left-[20%] w-1/4 h-1/4 bg-purple-500/5 rounded-full blur-[80px]"></div>
      </div>

      <div className="container mx-auto px-4 py-6 md:py-12 relative z-10">
        {/* Back button */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            className="group transition-all duration-300 text-gray-300 hover:bg-white/5"
            onClick={handleBackToHome}
          >
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Zurück zum Start
          </Button>
        </div>

        {/* Hero section with coach profile */}
        <div 
          className={`mb-16 transition-all duration-700 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="flex flex-col md:flex-row items-center gap-8 bg-black/20 p-8 rounded-2xl backdrop-blur-sm border border-white/5">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-[#22C55E]/20 flex-shrink-0">
              <img 
                src={coach.avatarUrl} 
                alt={coach.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-bold mb-2 text-white bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Das nächste Level mit {coach.name}
              </h1>
              <p className="text-lg text-gray-300 mb-4 font-light">
                {coach.subtitle}
              </p>
              <p className="text-gray-400 max-w-2xl leading-relaxed">
                Vielen Dank für unser Gespräch! Entdecken Sie jetzt meine maßgeschneiderten Coaching-Angebote und sichern Sie sich Ihre persönliche Betreuung für maximale Ergebnisse.
              </p>
            </div>
          </div>
        </div>

        {/* Packages section with modernized style */}
        <div className="mb-16">
          <div className="flex items-center justify-center gap-2 mb-8">
            <Star className="h-5 w-5 text-[#22C55E]" />
            <h2 className="text-2xl font-bold text-white">Wählen Sie Ihr Paket</h2>
            <Star className="h-5 w-5 text-[#22C55E]" />
          </div>
          
          <div 
            className={`grid grid-cols-1 md:grid-cols-2 gap-8 transition-all duration-700 delay-100 transform ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <PackageCard 
              package={coach.packages.community}
              onSelect={() => handlePackageSelect('community')}
              animationDelay={200}
              isVisible={isVisible}
            />
            <PackageCard 
              package={coach.packages.premium}
              onSelect={() => handlePackageSelect('premium')}
              animationDelay={400}
              isVisible={isVisible}
            />
          </div>
        </div>

        {/* Calendar section with improved styling */}
        <div 
          id="calendar-section"
          className={`transition-all duration-700 delay-300 transform ${
            calendarVisible ? 'opacity-100 translate-y-0 mb-16' : 'opacity-0 translate-y-10 h-0 overflow-hidden'
          }`}
        >
          {selectedPackage && (
            <div className="bg-black/30 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/10">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center p-3 bg-[#22C55E]/20 rounded-full mb-4">
                  <Calendar className="h-6 w-6 text-[#22C55E]" />
                </div>
                <h2 className="text-2xl font-bold mb-2 text-white">Vereinbaren Sie Ihr Erstgespräch</h2>
                <p className="text-gray-400 max-w-md mx-auto">
                  {selectedPackage === 'premium' 
                    ? 'Wählen Sie einen Termin für Ihr Premium-Erstgespräch' 
                    : 'Wählen Sie einen Termin für Ihr Community-Onboarding'}
                </p>
              </div>

              <CalendarBooking packageType={selectedPackage} coachName={coach.name} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AfterCallPage;
