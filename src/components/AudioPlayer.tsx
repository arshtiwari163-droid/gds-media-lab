import { useEffect, useRef, useState } from 'react';
import { Settings, Volume2, VolumeX, Play, Pause, Volume1 } from 'lucide-react';
import { useAudio } from '../context/AudioContext';

export default function AudioPlayer() {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isMuted, setIsMuted] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);
    const [showControls, setShowControls] = useState(false);
    const [volume, setVolume] = useState(0.5);
    const { connectSource, initAudio, isExternalAudioPlaying } = useAudio();

    useEffect(() => {
        if (audioRef.current) {
            // Mute if user manually muted OR if external audio is playing
            audioRef.current.muted = isMuted || isExternalAudioPlaying;
        }
    }, [isMuted, isExternalAudioPlaying]);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        // Initialize AudioContext on first interaction (if not already)
        // Note: Browsers require user gesture to resume AudioContext

        // Start muted to bypass autoplay restrictions
        audio.muted = true;
        audio.volume = 0.5;

        // Connect to AudioContext for visualization
        // We used to defer this, but now we strictly wait for interaction to avoid "Context not allowed to start" warning.
        // connectSource(video); // REMOVED EARLY CONNECTION

        const attemptPlay = async () => {
            try {
                // Always start muted to satisfy browser policies
                audio.muted = true;
                await audio.play();
                setIsPlaying(true);
                console.log("Audio started (muted).");
            } catch (err: any) {
                if (err.name !== 'NotAllowedError') {
                    console.error("Autoplay failed:", err);
                } else {
                    console.debug("Autoplay prevented by browser policy (waiting for interaction).");
                }
                setIsPlaying(false);
            }
        };

        attemptPlay();

        const handleInteraction = async () => {
            console.log("User interaction detected.");

            // 1. Resume AudioContext (must be done exactly inside the event handler)
            initAudio();

            // 2. Unmute and Play
            if (audio) {
                audio.muted = false;
                audio.volume = 0.5;
                setIsMuted(false);
                setVolume(0.5);

                try {
                    await audio.play();
                    setIsPlaying(true);
                    console.log("Audio playing (unmuted) after interaction.");

                    // Connect analyser only after we are successfully playing/unmuted
                    connectSource(audio);
                } catch (e) {
                    // This catches "NotAllowedError" if the browser still thinks there's no gesture
                    console.warn("Play failed even after interaction event:", e);
                }
            }

            // Remove listeners immediately
            ['click', 'touchstart', 'keydown'].forEach(event =>
                document.removeEventListener(event, handleInteraction)
            );
        };

        // 'scroll' is often NOT considered a user gesture for audio permissions. 
        // We rely on click/touch/keydown.
        ['click', 'touchstart', 'keydown'].forEach(event =>
            document.addEventListener(event, handleInteraction, { once: true })
        );

        return () => {
            ['click', 'touchstart', 'keydown'].forEach(event =>
                document.removeEventListener(event, handleInteraction)
            );
        };
    }, []);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const toggleMute = () => {
        if (audioRef.current) {
            audioRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        if (audioRef.current) {
            audioRef.current.volume = newVolume;
            // Unmute if volume is increased
            if (newVolume > 0 && isMuted) {
                audioRef.current.muted = false;
                setIsMuted(false);
            }
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 pointer-events-auto">
            {/* Controls Menu */}
            <div className={`flex flex-col items-center gap-4 p-4 rounded-2xl bg-rich-black/90 backdrop-blur-xl border border-royal-gold/30 transition-all duration-300 origin-bottom-right ${showControls ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-4 pointer-events-none'}`}>

                {/* Volume Slider Container */}
                <div className="flex flex-col items-center gap-2 h-32">
                    <Volume1 size={16} className="text-royal-gold/70" />
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={volume}
                        onChange={handleVolumeChange}
                        className="flex-1 w-1 rounded-lg appearance-none cursor-pointer bg-white/10 accent-royal-gold hover:accent-royal-gold/80 [writing-mode:vertical-lr] direction-rtl"
                    />
                    <Volume2 size={16} className="text-royal-gold" />
                </div>

                <div className="w-full h-[1px] bg-royal-gold/20"></div>

                <div className="flex flex-col gap-3">
                    <button
                        onClick={toggleMute}
                        className="w-10 h-10 rounded-full bg-white/5 border border-royal-gold/20 text-royal-gold flex items-center justify-center hover:bg-royal-gold hover:text-rich-black transition-all duration-300"
                        title={isMuted ? "Unmute" : "Mute"}
                    >
                        {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                    </button>
                    <button
                        onClick={togglePlay}
                        className="w-10 h-10 rounded-full bg-white/5 border border-royal-gold/20 text-royal-gold flex items-center justify-center hover:bg-royal-gold hover:text-rich-black transition-all duration-300"
                        title={isPlaying ? "Pause" : "Play"}
                    >
                        {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                    </button>
                </div>
            </div>

            {/* Settings Toggle Button */}
            <button
                onClick={() => setShowControls(!showControls)}
                className={`w-14 h-14 rounded-full backdrop-blur-md border flex items-center justify-center transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.15)] z-50 group
                    ${showControls
                        ? 'bg-royal-gold text-rich-black border-royal-gold'
                        : 'bg-rich-black/80 text-royal-gold border-royal-gold/30 hover:bg-royal-gold hover:text-rich-black'
                    }`}
            >
                <Settings size={28} className={`transition-transform duration-500 ${showControls ? 'rotate-90' : 'group-hover:rotate-45'}`} />
            </button>

            <audio
                ref={audioRef}
                src={`${import.meta.env.BASE_URL}background.mp4`}
                loop
                className="hidden"
            />
        </div>
    );
}
