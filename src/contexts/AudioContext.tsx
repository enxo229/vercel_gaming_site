import React, { createContext, useContext, useRef, useState, useEffect, type ReactNode } from 'react';

type SFXType = 'hit' | 'correct' | 'click' | 'gameover' | 'victory';

interface AudioContextType {
    isMuted: boolean;
    toggleMute: () => void;
    playBGM: () => void;
    stopBGM: () => void;
    playSFX: (type: SFXType) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isMuted, setIsMuted] = useState(false);

    // BGM Ref
    const bgmRef = useRef<HTMLAudioElement | null>(null);

    // SFX Refs mapping
    const sfxRefs = useRef<Record<SFXType, HTMLAudioElement | null>>({
        hit: null,
        correct: null,
        click: null,
        gameover: null,
        victory: null
    });

    useEffect(() => {
        // Inicializar audios solo en el cliente
        bgmRef.current = new Audio('/sfx/bgm.wav');
        bgmRef.current.loop = true;

        sfxRefs.current = {
            hit: new Audio('/sfx/hit.wav'),
            correct: new Audio('/sfx/correct.wav'),
            click: new Audio('/sfx/click.wav'),
            gameover: new Audio('/sfx/gameover.wav'),
            victory: new Audio('/sfx/victory.wav')
        };
    }, []);

    // Sincronizar estado de Mute con los elementos de audio
    useEffect(() => {
        if (bgmRef.current) {
            bgmRef.current.muted = isMuted;
        }
        Object.values(sfxRefs.current).forEach(audio => {
            if (audio) audio.muted = isMuted;
        });
    }, [isMuted]);

    const toggleMute = () => setIsMuted(prev => !prev);

    const playBGM = () => {
        if (bgmRef.current && !isMuted) {
            bgmRef.current.play().catch(e => console.warn("Autoplay bloqueado:", e));
        }
    };

    const stopBGM = () => {
        if (bgmRef.current) {
            bgmRef.current.pause();
            bgmRef.current.currentTime = 0;
        }
    };

    const playSFX = (type: SFXType) => {
        if (isMuted) return;

        const audio = sfxRefs.current[type];
        if (audio) {
            // Clonar y reproducir para permitir sonidos superpuestos rápidos
            const clone = audio.cloneNode() as HTMLAudioElement;
            clone.volume = audio.volume;
            clone.muted = isMuted;
            clone.play().catch(e => console.warn(`Error SFX ${type}:`, e));
        }
    };

    return (
        <AudioContext.Provider value={{ isMuted, toggleMute, playBGM, stopBGM, playSFX }}>
            {children}
        </AudioContext.Provider>
    );
};

export const useAudio = () => {
    const context = useContext(AudioContext);
    if (context === undefined) {
        throw new Error('useAudio must be used within an AudioProvider');
    }
    return context;
};
