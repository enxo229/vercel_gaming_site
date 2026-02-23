import React, { createContext, useContext, useRef, useState, useEffect, type ReactNode } from 'react';

type SFXType = 'hit' | 'correct' | 'click' | 'gameover' | 'victory' | 'leaderboard' | 'instructions';

interface AudioContextType {
    isMuted: boolean;
    toggleMute: () => void;
    playBGM: () => void;
    stopBGM: () => void;
    playSFX: (type: SFXType) => void;
    stopAllAudio: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isMuted, setIsMuted] = useState(false);

    // BGM Ref
    const bgmRef = useRef<HTMLAudioElement | null>(null);

    // Active SFX Ref (To stop previous long sounds)
    const activeSFXRef = useRef<HTMLAudioElement | null>(null);

    // SFX Refs mapping
    const sfxRefs = useRef<Record<SFXType, HTMLAudioElement | null>>({
        hit: null,
        correct: null,
        click: null,
        gameover: null,
        victory: null,
        leaderboard: null,
        instructions: null
    });

    useEffect(() => {
        // Inicializar audios solo en el cliente
        bgmRef.current = new Audio('/sfx/bgm.mp3');
        bgmRef.current.loop = true;
        bgmRef.current.volume = 0.1; // Reducido a un 10% para que sea suave de fondo

        const correctAudio = new Audio('/sfx/correct.mp3');
        correctAudio.volume = 0.6;

        sfxRefs.current = {
            hit: new Audio('/sfx/hit.mp3'),
            correct: correctAudio,
            click: new Audio('/sfx/click.wav'), // Kept as wav as fallback for UI clicks
            gameover: new Audio('/sfx/gameover.wav'),
            victory: new Audio('/sfx/win.mp3'),
            leaderboard: new Audio('/sfx/leaderboard.mp3'),
            instructions: new Audio('/sfx/instructions.mp3')
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
        if (activeSFXRef.current) {
            activeSFXRef.current.muted = isMuted;
        }
    }, [isMuted]);

    // Pausar todo el audio si el usuario cambia de pestaña/aplicación
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden) {
                if (bgmRef.current && !bgmRef.current.paused) {
                    bgmRef.current.pause();
                }
                if (activeSFXRef.current && !activeSFXRef.current.paused) {
                    activeSFXRef.current.pause();
                }
            } else {
                // Solo reanudamos si no está muteado explícitamente y SI estábamos en un estado que deba tener música (esto es un poco optimista, pero evita silencios)
                if (bgmRef.current && !isMuted && window.location.pathname !== '/leaderboard') {
                    // bgmRef.current.play().catch(e => console.warn(e)); // Podría fallar si requiere interacción nueva
                }
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);
        return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
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

    const stopAllAudio = () => {
        stopBGM();
        if (activeSFXRef.current) {
            activeSFXRef.current.pause();
            activeSFXRef.current.currentTime = 0;
            activeSFXRef.current = null;
        }
    }

    const playSFX = (type: SFXType) => {
        if (isMuted) return;

        // Detener calquier SFX anterior que esté sonando (para evitar solapamientos largos como victory o gameover)
        if (activeSFXRef.current) {
            activeSFXRef.current.pause();
            activeSFXRef.current.currentTime = 0;
        }

        const audio = sfxRefs.current[type];
        if (audio) {
            const clone = audio.cloneNode() as HTMLAudioElement;
            clone.volume = audio.volume;
            clone.muted = isMuted;
            activeSFXRef.current = clone; // Track active clone
            clone.play().catch(e => console.warn(`Error SFX ${type}:`, e));
        }
    };

    return (
        <AudioContext.Provider value={{ isMuted, toggleMute, playBGM, stopBGM, playSFX, stopAllAudio }}>
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
