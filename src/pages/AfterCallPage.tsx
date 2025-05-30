import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Sparkle } from 'lucide-react';
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
  
  const coach = coaches[0];

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  useEffect(() => {
    // Calendly Script laden
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup: Script entfernen wenn Komponente unmounted wird
      document.body.removeChild(script);
    };
  }, []);

  const handleBackToHome = () => {
    setIsVisible(false);
    setTimeout(() => navigate('/'), 500);
  };

  const handleGoToWebsite = () => {
    window.open('http://gastro-voice.de', '_blank');
  };

  return (
    <div className="min-h-screen bg-[#171923] relative overflow-x-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-5%] right-[-5%] w-2/5 h-2/5 bg-[#22C55E]/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-5%] left-[-5%] w-2/5 h-2/5 bg-[#22C55E]/10 rounded-full blur-[100px]"></div>
        <div className="absolute top-[40%] left-[20%] w-1/4 h-1/4 bg-purple-500/5 rounded-full blur-[80px]"></div>
      </div>

      <div className="container mx-auto px-4 py-6 md:py-12 relative z-10">
        <div className="mb-8">
          <Button 
            onClick={handleBackToHome}
            className="w-full sm:w-auto bg-white/10 hover:bg-white/15 text-white border border-white/10 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Zurück zur Startseite
          </Button>
        </div>

        <div 
          className={`transition-all duration-700 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="flex flex-col md:flex-row items-center gap-8 bg-black/20 p-8 rounded-2xl backdrop-blur-sm border border-white/5">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-[#22C55E]/20 flex-shrink-0">
              <img 
                src="/images/gastro-voice-profile.png"
                alt="Jan Herwig Haubrich"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-bold mb-2 text-white bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Auf den Geschmack gekommen?
              </h1>
              <p className="text-lg text-gray-300 mb-4 font-light">
                Erfahren Sie in unserem kostenlosen 15-Minuten-Introcall, wie GastroVoice Sie im Alltag spürbar entlastet und gleichzeitig Ihren Umsatz ankurbeln kann.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-16">
          
          {/* Calendly Inline-Widget Beginn */}
          <div 
            className={`transition-all duration-700 delay-100 transform ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="bg-black/20 backdrop-blur-md rounded-2xl shadow-2xl p-4 border border-white/10">
              <div className="calendly-inline-widget" 
                   data-url="https://calendly.com/julien-phosteon/inro-call" 
                   style={{minWidth: '320px', height: '700px'}}></div>
            </div>
          </div>
          {/* Calendly Inline-Widget Ende */}
          
          {/* Website Button */}
          <div 
            className={`transition-all duration-700 delay-200 transform mt-8 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="text-center mb-4">
              <h3 className="text-xl md:text-2xl font-bold mb-2 text-white bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Mehr Infos?</h3>
            </div>
            <div className="flex justify-center">
              <Button 
                onClick={handleGoToWebsite}
                className="w-full sm:w-auto bg-white/10 hover:bg-white/15 text-white border border-white/10 transition-all duration-300 flex items-center justify-center gap-2"
              >
                Zur GastroVoice Website
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AfterCallPage;
