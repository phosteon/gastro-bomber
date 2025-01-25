import React from 'react';

interface VolumeIndicatorProps {
  volume: number;
}

const VolumeIndicator: React.FC<VolumeIndicatorProps> = ({ volume }) => {
  const bars = 5;
  const activeVolumeBars = Math.floor(volume * bars);

  return (
    <div className="flex items-center gap-0.5 h-4">
      {Array.from({ length: bars }).map((_, i) => (
        <div
          key={i}
          className={`w-1 rounded-full transition-all duration-150 ${
            i < activeVolumeBars
              ? 'bg-google-blue h-full'
              : 'bg-gray-300 h-1/2'
          }`}
        />
      ))}
    </div>
  );
};

export default VolumeIndicator;