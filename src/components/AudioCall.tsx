
import React, { useEffect, useState, useRef } from 'react';
import { RetellWebClient } from "retell-client-js-sdk";
import CallControls from './CallControls';
import { toast } from 'sonner';
import { Phone } from 'lucide-react';
import { Coach } from '../types/coach';
import { createWebCall } from '../services/retellService';

const coaches: Coach[] = [
  {
    name: "Jan Herwig Haubrich",
    subtitle: "Männercoach & Abnehmexperte",
    assistantId: "agent_4b42e7910546b5b0973ecf64cb",
    agent_id: "agent_4b42e7910546b5b0973ecf64cb",
    avatarUrl: "/lovable-uploads/19226ee2-e8c4-471d-8544-d569bb3ab21e.png"
  }
];

const AudioCall: React.FC = () => {
  const retellClientRef = useRef<RetellWebClient | null>(null);
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentCoachIndex, setCurrentCoachIndex] = useState(0);
  const [isCallStarting, setIsCallStarting] = useState(false);

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

    retellClient.on("update", (update) => {
      if (isSpeaking) {
        setVolume(0.3 + Math.random() * 0.4);
      } else {
        setVolume(0);
      }
    });

    retellClient.on("call_ended", () => {
      setIsCallActive(false);
      setDuration(0);
      toast.info("Call ended");
    });

    retellClient.on("error", (error) => {
      console.error("RetellAI error:", error);
      toast.error("An error occurred during the call");
      setIsCallActive(false);
    });

    return () => {
      if (retellClientRef.current) {
        retellClientRef.current.stopCall();
      }
    };
  }, []);

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
        accessToken: createCallResponse.access_token,
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
      toast.info("Call ended");
    }
  };

  const toggleMute = () => {
    if (retellClientRef.current) {
      try {
        // Erst die tatsächliche Mikrofon-Stummschaltung über die SDK durchführen
        const newMuteState = !isMuted;
        retellClientRef.current.setMicrophoneMuted(newMuteState);
        
        // Dann den UI-Zustand aktualisieren
        setIsMuted(newMuteState);
        
        // Feedback an den Benutzer geben
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

  const pulseScale = 1 + (volume * 0.5);

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-elegant-background">
      <div className="bg-dark-elegant-surface p-8 rounded-3xl shadow-2xl max-w-md w-full border border-dark-elegant-accent/30 backdrop-blur-lg">
        <div className="flex flex-col items-center space-y-8">
          <div className="relative flex items-center justify-center w-full">
            <div className="relative">
              {isCallActive && isSpeaking && (
                <div 
                  className="absolute inset-0 rounded-full bg-blue-500/20 transition-transform duration-200"
                  style={{ 
                    transform: `scale(${pulseScale})`,
                  }}
                />
              )}
              <div 
                className="w-24 h-24 rounded-full relative z-10 shadow-lg overflow-hidden transition-transform duration-300 transform"
              >
                <img 
                  src={currentCoach.avatarUrl}
                  alt={`${currentCoach.name} Avatar`}
                  className="w-full h-full object-cover transition-opacity duration-300 animate-fade-in"
                  key={currentCoach.assistantId}
                />
              </div>
            </div>
          </div>

          <div className="text-center transition-all duration-300 animate-fade-in" key={currentCoach.assistantId}>
            <h2 className="text-xl font-semibold text-dark-elegant-text mb-1">
              {currentCoach.name}
            </h2>
            <p className="text-sm text-dark-elegant-muted">
              {currentCoach.subtitle}
            </p>
            {isCallActive && (
              <p className="text-sm text-dark-elegant-muted font-mono">
                {formatDuration(duration)}
              </p>
            )}
          </div>

          <div className="relative h-20 w-full flex items-center justify-center">
            <div className={`absolute transition-all duration-500 transform ${isCallActive ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
              <CallControls
                isMuted={isMuted}
                onToggleMute={toggleMute}
                onEndCall={endCall}
              />
            </div>
            <div className={`absolute transition-all duration-500 transform ${!isCallActive ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
              <div className="relative">
                <div className="absolute -inset-4 rounded-full animate-pulse bg-gradient-to-r from-green-500/20 to-green-600/20" />
                <div className="absolute -inset-2 rounded-full animate-pulse delay-75 bg-gradient-to-r from-green-500/30 to-green-600/30" />
                <button
                  onClick={startCall}
                  className="relative px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-green-500/25 font-medium flex items-center gap-2 z-10"
                >
                  <Phone size={24} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioCall;
