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
    <div className="flex items-center justify-center gap-4">
      <button
        onClick={onToggleMute}
        className={`p-4 rounded-full transition-all ${
          isMuted
            ? 'bg-google-gray text-white'
            : 'bg-google-light-gray text-google-gray hover:bg-gray-200'
        }`}
      >
        {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
      </button>
      <button
        onClick={onEndCall}
        className="p-4 rounded-full bg-red-500 text-white hover:bg-red-600 transition-all"
      >
        <PhoneOff size={24} />
      </button>
    </div>
  );
};

export default CallControls;