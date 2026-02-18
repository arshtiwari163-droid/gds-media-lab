import { createContext, useContext, useRef, useState, type ReactNode } from 'react';

interface AudioContextType {
    analyser: AnalyserNode | null;
    initAudio: () => void;
    connectSource: (element: HTMLMediaElement) => void;
    dataArray: Uint8Array;
    isExternalAudioPlaying: boolean;
    setExternalAudioPlaying: (playing: boolean) => void;
}

const AudioContext = createContext<AudioContextType | null>(null);

export const useAudio = () => {
    const context = useContext(AudioContext);
    if (!context) {
        throw new Error("useAudio must be used within an AudioProvider");
    }
    return context;
};

export const AudioProvider = ({ children }: { children: ReactNode }) => {
    const audioContextRef = useRef<AudioContext | null>(null);
    // Use state for analyser to trigger context updates for consumers
    const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
    const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
    // Create dataArray once to avoid garbage collection in loop
    const dataArrayRef = useRef<Uint8Array>(new Uint8Array(0));
    const [isExternalAudioPlaying, setExternalAudioPlaying] = useState(false);

    const initAudio = () => {
        if (!audioContextRef.current) {
            const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
            if (!AudioContextClass) return; // Silent fail if not supported

            audioContextRef.current = new AudioContextClass();

            const newAnalyser = audioContextRef.current.createAnalyser();
            newAnalyser.fftSize = 256; // Smaller FFT size for performance (128 frequency bins)

            // Set state to update consumers
            setAnalyser(newAnalyser);
            dataArrayRef.current = new Uint8Array(newAnalyser.frequencyBinCount);
        }

        // Resume context if suspended (browser autoplay policy)
        // Resume context if suspended (browser autoplay policy)
        if (audioContextRef.current?.state === 'suspended') {
            audioContextRef.current.resume().catch(() => {
                // Ignore errors: if called without gesture, it stays suspended.
            });
        }
    };

    const connectSource = (element: HTMLMediaElement) => {
        // If audio context or analyser is not initialized, try to initialize it.
        // Note: setAnalyser is async, so 'analyser' state might not be updated immediately.
        // However, subsequent renders will have the updated state.
        if (!audioContextRef.current) {
            initAudio();
        }

        // Proceed only if audio context and analyser are available and source is not yet connected
        if (audioContextRef.current && analyser && !sourceRef.current) {
            try {
                // Connect the media element to the audio context
                const source = audioContextRef.current.createMediaElementSource(element);
                source.connect(analyser);
                analyser.connect(audioContextRef.current.destination);
                sourceRef.current = source;
            } catch (e) {
                console.warn("Audio source already connected or failed to connect:", e);
            }
        }
    };

    return (
        <AudioContext.Provider value={{
            analyser: analyser,
            initAudio,
            connectSource,
            dataArray: dataArrayRef.current, // Exposed for reference, but best to access directly via analyser if needed
            isExternalAudioPlaying,
            setExternalAudioPlaying
        }}>
            {children}
        </AudioContext.Provider>
    );
};
