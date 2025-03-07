
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Calendar, Check } from 'lucide-react';
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 relative overflow-x-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-1/3 h-1/3 bg-gradient-to-br from-purple-200/30 to-purple-400/30 dark:from-purple-900/20 dark:to-purple-700/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-1/3 h-1/3 bg-gradient-to-tr from-blue-200/30 to-blue-400/30 dark:from-blue-900/20 dark:to-blue-700/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Back button */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            className="group transition-all duration-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            onClick={handleBackToHome}
          >
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Zurück zum Start
          </Button>
        </div>

        {/* Header section */}
        <div 
          className={`text-center mb-16 transition-all duration-700 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-blue-500 dark:from-purple-400 dark:to-blue-300">
            Das nächste Level mit {coach.name}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Vielen Dank für unser Gespräch! Entdecken Sie jetzt unsere Angebote und sichern Sie sich Ihre persönliche Betreuung.
          </p>
        </div>

        {/* Packages section */}
        <div 
          className={`grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 transition-all duration-700 delay-100 transform ${
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

        {/* Calendar section */}
        <div 
          id="calendar-section"
          className={`transition-all duration-700 delay-300 transform ${
            calendarVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {selectedPackage && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center p-2 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-4">
                  <Calendar className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Vereinbaren Sie Ihr Erstgespräch</h2>
                <p className="text-gray-600 dark:text-gray-300">
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
