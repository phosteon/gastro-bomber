
import React, { useEffect, useState } from 'react';
import Vapi from '@vapi-ai/web';
import CallControls from './CallControls';
import { toast } from 'sonner';
import { Phone, ChevronLeft, ChevronRight } from 'lucide-react';
import { Coach } from '../types/coach';

const VAPI_PUBLIC_KEY = "e2452687-e6ef-4c5a-88a0-c537b81a3abf";

const coaches: Coach[] = [
  {
    name: "Sophia Thiel",
    subtitle: "Fitness Coach",
    assistantId: "23096253-2223-4723-932d-a4b4fa5cfae8",
    avatarUrl: "/lovable-uploads/296717bc-3a34-4c30-9b20-273a7d0d12ec.png"
  },
  {
    name: "Thomas Kehl",
    subtitle: "Finanzexperte",
    assistantId: "a6aa0d50-6a91-44e1-8706-bd41fe605725",
    avatarUrl: "/lovable-uploads/0bef14fa-d470-4d33-9537-c0cf95b9b2fc.png"
  },
  {
    name: "Jan Herwig Haubrich",
    subtitle: "Männercoach & Abnehmexperte",
    assistantId: "a296c6d2-9718-413a-9792-52efb21197cb",
    avatarUrl: "/lovable-uploads/19226ee2-e8c4-471d-8544-d569bb3ab21e.png"
  },
  {
    name: "Jan Herwig Haubrich v 0.2",
    subtitle: "Männercoach & Abnehmexperte",
    assistantId: "ff89b66d-db91-4fc9-aa7a-9009fa5c1fe8",
    avatarUrl: "/lovable-uploads/19226ee2-e8c4-471d-8544-d569bb3ab21e.png"
  }
];

const AudioCall: React.FC = () => {
  const [vapi, setVapi] = useState<any>(null);
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentCoachIndex, setCurrentCoachIndex] = useState(2); // Setze Jan Herwig Haubrich als Standard (Index 2)

  const currentCoach = coaches[currentCoachIndex];

  useEffect(() => {
    const vapiInstance = new Vapi(VAPI_PUBLIC_KEY);
    setVapi(vapiInstance);

    vapiInstance.on("speech-start", () => {
      setIsSpeaking(true);
    });

    vapiInstance.on("speech-end", () => {
      setIsSpeaking(false);
    });

    vapiInstance.on("volume-level", (vol: number) => {
      setVolume(vol);
    });

    vapiInstance.on("call-end", () => {
      setIsCallActive(false);
      setDuration(0);
      toast.info("Call ended");
    });

    vapiInstance.on("error", (error: Error) => {
      console.error("Vapi error:", error);
      toast.error("An error occurred during the call");
    });

    return () => {
      if (vapiInstance) {
        vapiInstance.stop();
      }
    };
  }, []);

  // Call duration timer
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
      await vapi.start(currentCoach.assistantId);
      setIsCallActive(true);
      setDuration(0);
      toast.success("Call started");
    } catch (error) {
      console.error("Error starting call:", error);
      toast.error("Failed to start call");
    }
  };

  const endCall = () => {
    if (vapi) {
      vapi.stop();
      setIsCallActive(false);
      setDuration(0);
      toast.info("Call ended");
    }
  };

  const toggleMute = () => {
    if (vapi) {
      const newMuteState = !isMuted;
      vapi.setMuted(newMuteState);
      setIsMuted(newMuteState);
      toast.info(newMuteState ? "Microphone muted" : "Microphone unmuted");
    }
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const navigateCoach = (direction: 'prev' | 'next') => {
    if (isCallActive) {
      toast.error("Please end the current call before switching coaches");
      return;
    }
    
    setCurrentCoachIndex(prevIndex => {
      if (direction === 'prev') {
        return prevIndex > 0 ? prevIndex - 1 : coaches.length - 1;
      } else {
        return prevIndex < coaches.length - 1 ? prevIndex + 1 : 0;
      }
    });
  };

  const pulseScale = 1 + (volume * 0.5);

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-elegant-background">
      <div className="bg-dark-elegant-surface p-8 rounded-3xl shadow-2xl max-w-md w-full border border-dark-elegant-accent/30 backdrop-blur-lg">
        <div className="flex flex-col items-center space-y-8">
          {/* Avatar Circle with Navigation Arrows */}
          <div className="relative flex items-center justify-center w-full">
            <button
              onClick={() => navigateCoach('prev')}
              className="absolute left-0 p-2 text-dark-elegant-text hover:text-white transition-colors disabled:opacity-50"
              disabled={isCallActive}
            >
              <ChevronLeft size={24} />
            </button>
            
            <div className="relative">
              {/* Pulsing Ring */}
              {isCallActive && isSpeaking && (
                <div 
                  className="absolute inset-0 rounded-full bg-blue-500/20 transition-transform duration-200"
                  style={{ 
                    transform: `scale(${pulseScale})`,
                  }}
                />
              )}
              {/* Avatar Circle with Animation */}
              <div 
                className="w-24 h-24 rounded-full relative z-10 shadow-lg overflow-hidden transition-transform duration-300 transform"
              >
                <img 
                  src={currentCoach.avatarUrl}
                  alt={`${currentCoach.name} Avatar`}
                  className="w-full h-full object-cover transition-opacity duration-300 animate-fade-in"
                  key={currentCoach.assistantId} // This forces a re-render and animation
                />
              </div>
            </div>

            <button
              onClick={() => navigateCoach('next')}
              className="absolute right-0 p-2 text-dark-elegant-text hover:text-white transition-colors disabled:opacity-50"
              disabled={isCallActive}
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Coach Info with Animation */}
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

          {/* Call Controls with Transition */}
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
                {/* Radial Pulse Effect */}
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
