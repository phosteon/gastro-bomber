import React from 'react';
import { Mic, MicOff, PhoneOff } from 'lucide-react';

interface CallControlsProps {
  isMuted: boolean;
  onToggleMute: () => void;
  onEndCall: () => void;
}

const CallControls: React.FC<CallControlsProps> = ({
  isMuted,
  onToggleMute,
  onEndCall,
}) => {
  return (
    <div className="flex items-center justify-center gap-6">
      <button
        onClick={onToggleMute}
        className={`p-4 rounded-full transition-all duration-300 shadow-lg ${
          isMuted
            ? 'bg-dark-elegant-accent text-dark-elegant-text shadow-black/20'
            : 'bg-dark-elegant-surface text-dark-elegant-text border border-dark-elegant-accent/30 hover:bg-dark-elegant-accent/50'
        }`}
      >
        {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
      </button>
      <button
        onClick={onEndCall}
        className="p-4 rounded-full bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-red-500/25"
      >
        <PhoneOff size={24} />
      </button>
    </div>
  );
};

export default CallControls;