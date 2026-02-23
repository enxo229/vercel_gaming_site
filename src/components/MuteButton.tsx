import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useAudio } from '../contexts/AudioContext';

export const MuteButton: React.FC = () => {
    const { isMuted, toggleMute } = useAudio();

    return (
        <button
            onClick={toggleMute}
            className="fixed top-4 right-4 z-[100] bg-[#f8f0e3] border-4 border-[#2d1b00] p-2 md:p-3 shadow-[4px_4px_0px_#2d1b00] hover:translate-y-1 hover:translate-x-1 hover:shadow-none transition-all active:bg-gray-200 cursor-pointer"
            aria-label={isMuted ? "Unmute sound" : "Mute sound"}
        >
            {isMuted ? (
                <VolumeX className="w-4 h-4 md:w-6 md:h-6 text-[#dc2626]" strokeWidth={3} />
            ) : (
                <Volume2 className="w-4 h-4 md:w-6 md:h-6 text-[#2d1b00]" strokeWidth={3} />
            )}
        </button>
    );
};
