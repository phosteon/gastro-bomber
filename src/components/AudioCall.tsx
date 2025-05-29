import React, { useEffect, useState, useRef } from 'react';
import { RetellWebClient } from "retell-client-js-sdk";
import { useNavigate } from 'react-router-dom';
import CallControls from './CallControls';
import { toast } from 'sonner';
import { Phone, Target, CheckCircle, ShoppingBag, Utensils, Dumbbell } from 'lucide-react';
import { Coach } from '../types/coach';
import { createWebCall } from '../services/retellService';

const coaches: Coach[] = [{
  name: "Alexandra",
  subtitle: "KI-Telefonassistent\nRestaurant Goldener Schnabel",
  assistantId: "agent_0edf41005a14388dcfd5820429",
  agent_id: "agent_0edf41005a14388dcfd5820429",
  avatarUrl: "/images/gastro-voice-profile.png",
  packages: {
    community: {
      name: "Community-Mitgliedschaft",
      price: 99,
      period: "pro Monat",
      description: "Gemeinsam zum Erfolg mit unserer Community.",
      features: ["Austausch mit Gleichgesinnten", "Fokus auf Gruppenunterstützung", "Monatliche Q&A-Sessions"]
    },
    premium: {
      name: "Premium Coaching",
      price: 999,
      period: "für 3 Monate",
      description: "Intensive Betreuung für maximale Ergebnisse.",
      features: ["Inklusive Community-Mitgliedschaft", "Persönliche 1:1 Betreuung", "Individueller Stoffwechselplan", "Wöchentliche Check-ins"],
      highlighted: true
    }
  }
}];

const AudioCall: React.FC = () => {
  const navigate = useNavigate();
  const retellClientRef = useRef<RetellWebClient | null>(null);
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentCoachIndex, setCurrentCoachIndex] = useState(0);
  const [isCallStarting, setIsCallStarting] = useState(false);
  const [isCallEnding, setIsCallEnding] = useState(false);
  const currentCoach = coaches[currentCoachIndex];

  useEffect(() => {
    const retellClient = new RetellWebClient();
    retellClientRef.current = retellClient;
    retellClient.on("agent_start_talking", () => {
      setIsSpeaking(true);
    });
    retellClient.on("agent_stop_talking", () => {
      setIsSpeaking(false);
    });
    retellClient.on("update", update => {
      if (isSpeaking) {
        setVolume(0.3 + Math.random() * 0.4);
      } else {
        setVolume(0);
      }
    });
    retellClient.on("call_ended", () => {
      setIsCallActive(false);
      setDuration(0);
      setIsCallEnding(true);
      toast.info("Anruf beendet");
      setTimeout(() => {
        navigate('/after-call');
      }, 1000);
    });
    retellClient.on("error", error => {
      console.error("RetellAI error:", error);
      toast.error("Während des Anrufs ist ein Fehler aufgetreten");
      setIsCallActive(false);
    });
    return () => {
      if (retellClientRef.current) {
        retellClientRef.current.stopCall();
      }
    };
  }, [navigate]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (isCallActive) {
      intervalId = setInterval(() => {
        setDuration(prev => prev + 1);
      }, 1000);
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isCallActive]);

  const startCall = async () => {
    try {
      if (isCallStarting) {
        return; // Prevent multiple clicks
      }
      setIsCallStarting(true);
      if (!retellClientRef.current) {
        toast.error("RetellAI client nicht initialisiert");
        setIsCallStarting(false);
        return;
      }
      toast.info("Verbindung wird hergestellt...");
      const createCallResponse = await createWebCall(currentCoach.agent_id);
      await retellClientRef.current.startCall({
        accessToken: createCallResponse.access_token
      });
      setIsCallActive(true);
      setDuration(0);
      toast.success("Anruf gestartet");
    } catch (error) {
      console.error("Error starting call:", error);
      toast.error(`Fehler beim Starten des Anrufs: ${error instanceof Error ? error.message : 'Unbekannter Fehler'}`);
    } finally {
      setIsCallStarting(false);
    }
  };

  const endCall = () => {
    if (retellClientRef.current) {
      retellClientRef.current.stopCall();
      setIsCallActive(false);
      setDuration(0);
      setIsCallEnding(true);
      setTimeout(() => {
        navigate('/after-call');
      }, 1000);
    }
  };

  const toggleMute = () => {
    if (retellClientRef.current) {
      try {
        const newMuteState = !isMuted;
        if (newMuteState) {
          retellClientRef.current.mute();
        } else {
          retellClientRef.current.unmute();
        }
        setIsMuted(newMuteState);
        toast.info(newMuteState ? "Mikrofon stumm geschaltet" : "Mikrofon aktiviert");
      } catch (error) {
        console.error("Fehler beim Umschalten der Stummschaltung:", error);
        toast.error("Fehler beim Umschalten der Stummschaltung");
      }
    }
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const pulseScale = 1 + volume * 0.5;

  return <div className={`min-h-screen flex items-center justify-center bg-dark-elegant-background transition-opacity duration-1000 ${isCallEnding ? 'opacity-0' : 'opacity-100'}`}>
      <div className="bg-dark-elegant-surface p-8 rounded-3xl shadow-2xl max-w-md w-full border border-dark-elegant-accent/30 backdrop-blur-lg">
        <div className="flex flex-col items-center space-y-8">
          <div className="relative flex items-center justify-center w-full">
            <div className="relative">
              {isCallActive && isSpeaking && <div className="absolute inset-0 rounded-full bg-blue-500/20 transition-transform duration-200" style={{
              transform: `scale(${pulseScale})`
            }} />}
              <div className="w-32 h-32 rounded-full relative z-10 shadow-lg overflow-hidden transition-transform duration-300 transform">
                <a href="https://www.gastro-voice.de" target="_blank" rel="noopener noreferrer">
                  <img src="/images/gastro-voice-profile.png" alt={`${currentCoach.name} Avatar`} className="w-full h-full object-cover transition-opacity duration-300 animate-fade-in" key={currentCoach.assistantId} />
                </a>
              </div>
            </div>
          </div>

          <div className="text-center transition-all duration-300 animate-fade-in" key={currentCoach.assistantId}>
            <h2 className="text-3xl font-semibold text-dark-elegant-text mb-1">
              {currentCoach.name}
            </h2>
            <p className="text-base text-dark-elegant-muted">
              {currentCoach.subtitle.split('\n').map((line, index, array) => (
                <React.Fragment key={index}>
                  {line}
                  {index < array.length - 1 && <br />}
                </React.Fragment>
              ))}
            </p>
            {isCallActive && <p className="text-sm text-dark-elegant-muted font-mono">
                {formatDuration(duration)}
              </p>}
          </div>

          <div className="relative h-20 w-full flex items-center justify-center">
            <div className={`absolute transition-all duration-500 transform ${isCallActive ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
              <CallControls isMuted={isMuted} onToggleMute={toggleMute} onEndCall={endCall} />
            </div>
            <div className={`absolute transition-all duration-500 transform ${!isCallActive ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
              <div className="relative">
                <div className="absolute -inset-4 rounded-full animate-pulse bg-gradient-to-r from-green-500/20 to-green-600/20" />
                <div className="absolute -inset-2 rounded-full animate-pulse delay-75 bg-gradient-to-r from-green-500/30 to-green-600/30" />
                <button onClick={startCall} className="relative p-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-green-500/25 flex items-center justify-center z-10">
                  <Phone size={24} />
                </button>
              </div>
            </div>
          </div>
          
          {/* Removed the conditional opacity/scale that was hiding the boxes during calls */}
          <div className="w-full transition-all duration-500 animate-fade-in">
            <div className="p-4 rounded-xl bg-gradient-to-r from-green-500/10 to-green-600/5 backdrop-blur-sm border border-green-500/20 shadow-lg mb-4">
              <div className="flex items-start space-x-3">
                <div className="mt-1 p-2 rounded-full bg-green-500/20 text-green-400">
                  <Target size={18} />
                </div>
                <div>
                  <h3 className="text-base font-medium text-dark-elegant-text mb-2">Weniger Stress, mehr Umsatz</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle size={14} className="text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-dark-elegant-muted leading-relaxed">Für Sie im Einsatz: nach Feierabend, zu Stosszeiten oder 24/7</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle size={14} className="text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-dark-elegant-muted leading-relaxed">
                        Beantwortet Reservierungen, Bestellungen und Kundenfragen 
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle size={14} className="text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-dark-elegant-muted leading-relaxed">
                        Leitet wichtige Anrufe an Ihr Team weiter
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};

export default AudioCall;
