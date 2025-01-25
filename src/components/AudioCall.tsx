import React, { useEffect, useState } from 'react';
import Vapi from '@vapi-ai/web';
import CallControls from './CallControls';
import { toast } from 'sonner';
import { Phone } from 'lucide-react';

const VAPI_PUBLIC_KEY = "e2452687-e6ef-4c5a-88a0-c537b81a3abf";
const ASSISTANT_ID = "23096253-2223-4723-932d-a4b4fa5cfae8";

const AudioCall: React.FC = () => {
  const [vapi, setVapi] = useState<any>(null);
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [duration, setDuration] = useState(0);

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
      await vapi.start(ASSISTANT_ID);
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

  const pulseScale = 1 + (volume * 0.5);

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-elegant-background">
      <div className="bg-dark-elegant-surface p-8 rounded-3xl shadow-2xl max-w-md w-full border border-dark-elegant-accent/30 backdrop-blur-lg">
        <div className="flex flex-col items-center space-y-8">
          {/* Avatar Circle with Pulsing Ring */}
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
            {/* Avatar Circle */}
            <div 
              className="w-24 h-24 rounded-full relative z-10 shadow-lg overflow-hidden"
            >
              <img 
                src="/lovable-uploads/296717bc-3a34-4c30-9b20-273a7d0d12ec.png"
                alt="Assistant Avatar"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Call Duration */}
          <div className="text-center">
            <h2 className="text-xl font-semibold text-dark-elegant-text mb-1">
              Sophia Thiel
            </h2>
            <p className="text-sm text-dark-elegant-muted">
              Fitness Coach
            </p>
            {isCallActive && (
              <p className="text-sm text-dark-elegant-muted font-mono">
                {formatDuration(duration)}
              </p>
            )}
          </div>

          {/* Call Controls */}
          {isCallActive ? (
            <CallControls
              isMuted={isMuted}
              onToggleMute={toggleMute}
              onEndCall={endCall}
            />
          ) : (
            <button
              onClick={startCall}
              className="px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-green-500/25 font-medium flex items-center gap-2 animate-pulse"
            >
              <Phone size={24} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AudioCall;