import { useState, useRef, useEffect } from 'react';
import { Camera, Video, Monitor, Mic, Volume2, VolumeX } from 'lucide-react';
import { useAudio } from '../context/AudioContext';

const ProjectCard = ({ type, title, subtitle, aspect = "aspect-[4/5]", image, video, preload = "none" }: any) => {
    const [isMuted, setIsMuted] = useState(true);
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const { setExternalAudioPlaying } = useAudio();

    // Optimize video playback: Only play when visible
    useEffect(() => {
        if (!video) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const vid = videoRef.current;
                    if (vid) {
                        if (entry.isIntersecting) {
                            const playPromise = vid.play();
                            if (playPromise !== undefined) {
                                playPromise.catch(() => {
                                    // Auto-play was prevented
                                    // logic to handle if needed
                                    // console.log("Auto-play prevented:", e);
                                });
                            }
                        } else {
                            if (!vid.paused) {
                                vid.pause();
                            }
                        }
                    }
                });
            },
            { threshold: 0.4 } // Increased to 40% to prevent accidental playback on scroll
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            if (containerRef.current) {
                observer.unobserve(containerRef.current);
            }
        };
    }, [video]);

    const toggleMute = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        if (videoRef.current) {
            const newMutedState = !isMuted;
            videoRef.current.muted = newMutedState;
            setIsMuted(newMutedState);

            // If we just UNMUTED (newMutedState is false), background should mute (external is playing = true)
            // If we just MUTED (newMutedState is true), background should unmute (external is playing = false)
            setExternalAudioPlaying(!newMutedState);
        }
    };

    // Safety cleanup: if this card is unmounted while playing audio, restore background music
    useEffect(() => {
        return () => {
            if (!isMuted) {
                setExternalAudioPlaying(false);
            }
        };
    }, [isMuted, setExternalAudioPlaying]);

    return (
        <div ref={containerRef} className="group relative overflow-hidden rounded-sm bg-rich-black/60 backdrop-blur-md border border-royal-gold/20 hover:border-royal-gold/60 transition-all duration-500">
            <div className={`${aspect} bg-transparent relative transform-gpu`}>
                {/* Video Background */}
                {video && (
                    <>
                        <video
                            ref={videoRef}
                            src={video}
                            loop
                            muted={isMuted}
                            playsInline
                            webkit-playsinline="true"
                            controls={false}
                            preload={preload}
                            className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 will-change-[transform,opacity] backface-hidden"
                        />
                        {/* Mute Toggle Button */}
                        <button
                            onClick={toggleMute}
                            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 text-royal-gold border border-royal-gold/30 hover:bg-royal-gold hover:text-black transition-all opacity-0 group-hover:opacity-100"
                        >
                            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                        </button>
                    </>
                )}

                {/* Image Background */}
                {!video && image && (
                    <img
                        src={image}
                        alt={title}
                        className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                    />
                )}

                {/* Ornate Corner Accents */}
                <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-royal-gold/50 z-10 transition-all group-hover:w-8 group-hover:h-8"></div>
                <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-royal-gold/50 z-10 transition-all group-hover:w-8 group-hover:h-8"></div>
                <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-royal-gold/50 z-10 transition-all group-hover:w-8 group-hover:h-8"></div>
                <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-royal-gold/50 z-10 transition-all group-hover:w-8 group-hover:h-8"></div>

                {/* Placeholder Icon (Only if no video and no image) */}
                {!image && !video && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center p-6">
                            <div className="mb-4 text-royal-gold opacity-50 group-hover:opacity-100 transition-opacity">
                                <Video size={32} strokeWidth={1} />
                            </div>
                        </div>
                    </div>
                )}

                {/* Hover overlay with gradient */}
                <div className={`absolute inset-0 bg-gradient-to-t from-velvet-red/90 via-black/50 to-transparent ${(image || video) ? 'opacity-0 group-hover:opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity duration-500 flex flex-col justify-end p-8 pointer-events-none`}>
                    <span className="text-royal-gold text-xs tracking-[0.2em] uppercase mb-2">{type}</span>
                    <h3 className="text-2xl font-serif text-white mb-1">{title}</h3>
                    <p className="text-gray-300 text-sm font-light italic">{subtitle}</p>
                </div>
            </div>
        </div>
    );
};


const EquipmentIcon = ({ icon: Icon, label, desc }: any) => (
    <div className="flex flex-col items-center text-center p-8 border border-royal-gold/20 bg-rich-black/40 backdrop-blur-md hover:border-royal-gold hover:bg-rich-black/80 transition-all duration-500 group">
        <div className="w-16 h-16 rounded-full border border-royal-gold/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(212,175,55,0.1)]">
            <Icon size={24} className="text-royal-gold" />
        </div>
        <h4 className="text-lg font-serif text-off-white mb-2 tracking-wide">{label}</h4>
        <p className="text-xs text-gray-500 uppercase tracking-widest">{desc}</p>
    </div>
);

export default function DigitalMarketing() {
    return (
        <section className="relative z-10 min-h-screen bg-transparent text-white py-16 md:py-24">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-royal-gold/30 to-transparent"></div>

            <div className="container mx-auto px-6">
                <div className="text-center mb-16 md:mb-24">
                    <h2 className="text-4xl md:text-7xl font-serif text-transparent bg-clip-text bg-gradient-to-br from-royal-gold to-bronze mb-4 md:mb-6">Royal Archives</h2>
                    <p className="text-lg md:text-xl text-gray-400 font-light tracking-widest uppercase">Evidence of our dominion</p>
                </div>

                {/* POST SAMPLES (2 Portrait, 2 Landscape) */}
                <div className="mb-32">
                    <div className="flex items-center gap-4 mb-12">
                        <div className="h-[1px] bg-royal-gold w-12"></div>
                        <h3 className="text-3xl font-serif text-deep-saffron">Visual Chronicles</h3>
                        <div className="h-[1px] flex-1 bg-royal-gold/20"></div>
                    </div>
                    {/* Grid: 2 Columns. Row 1: Portrait, Row 2: Landscape */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <ProjectCard type="Post Sample" title="Portrait I" subtitle="Vertical Composition" aspect="aspect-[3/4]" image={`${import.meta.env.BASE_URL}assets/images/post1.jpeg`} />
                        <ProjectCard type="Post Sample" title="Portrait II" subtitle="Vertical Composition" aspect="aspect-[3/4]" image={`${import.meta.env.BASE_URL}assets/images/post2.jpeg`} />

                        <ProjectCard type="Post Sample" title="Landscape I" subtitle="Horizontal Flow" aspect="aspect-video" image={`${import.meta.env.BASE_URL}assets/images/pp2.jpeg`} />
                        <ProjectCard type="Post Sample" title="Landscape II" subtitle="Horizontal Flow" aspect="aspect-video" image={`${import.meta.env.BASE_URL}assets/images/pp1.jpeg`} />

                    </div>
                </div>

                {/* SHOTS/REELS (2 Portrait Videos, 2 Reel Thumbnails) */}
                <div className="mb-32">
                    <div className="flex items-center gap-4 mb-12">
                        <div className="h-[1px] bg-royal-gold w-12"></div>
                        <h3 className="text-3xl font-serif text-deep-saffron">Kinetic Masterpieces</h3>
                        <div className="h-[1px] flex-1 bg-royal-gold/20"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        <ProjectCard type="Short" title="Next Masterpiece" subtitle="Coming Soon" aspect="aspect-[9/16]" video={`${import.meta.env.BASE_URL}assets/videos/lp3.mp4`} />

                        <ProjectCard type="Short" title="Vertical Video II" subtitle="Viral Hook" aspect="aspect-[9/16]" video={`${import.meta.env.BASE_URL}assets/images/rr2.mp4`} />
                        <ProjectCard type="Reel Cover" title="Thumbnail I" subtitle="Click Optimization" aspect="aspect-[9/16]" image={`${import.meta.env.BASE_URL}assets/images/lo6.jpg`} />
                        <ProjectCard type="Reel Cover" title="Thumbnail II" subtitle="Click Optimization" aspect="aspect-[9/16]" image={`${import.meta.env.BASE_URL}assets/images/thy2.jpeg`} />
                    </div>
                </div>

                {/* POSTERS (2 Portrait, 2 Landscape) */}
                <div className="mb-32">
                    <div className="flex items-center gap-4 mb-12">
                        <div className="h-[1px] bg-royal-gold w-12"></div>
                        <h3 className="text-3xl font-serif text-deep-saffron">Posters</h3>
                        <div className="h-[1px] flex-1 bg-royal-gold/20"></div>
                    </div>
                    {/* Grid: 2 Columns. Row 1: Portrait, Row 2: Landscape */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <ProjectCard type="Poster" title="Portrait I" subtitle="Event Design" aspect="aspect-[3/4]" image={`${import.meta.env.BASE_URL}assets/images/ppst1.png`} />
                        <ProjectCard type="Poster" title="Portrait II" subtitle="Campaign Art" aspect="aspect-[3/4]" image={`${import.meta.env.BASE_URL}assets/images/ppst2.png`} />

                        <ProjectCard type="Poster" title="Landscape I" subtitle="Billboard Style" aspect="aspect-[3/2]" image={`${import.meta.env.BASE_URL}assets/images/pst1.png`} />
                        <ProjectCard type="Poster" title="Landscape II" subtitle="Wide Format" aspect="aspect-[3/2]" image={`${import.meta.env.BASE_URL}assets/images/pst2.png`} />
                    </div>
                </div>

                {/* LOGO (2 Items) */}
                <div className="mb-32">
                    <div className="flex items-center gap-4 mb-12">
                        <div className="h-[1px] bg-royal-gold w-12"></div>
                        <h3 className="text-3xl font-serif text-deep-saffron">Identity</h3>
                        <div className="h-[1px] flex-1 bg-royal-gold/20"></div>
                    </div>
                    {/* Grid: 2 Columns Centered */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        <ProjectCard type="Logo" title="Brand Mark I" subtitle="Vector Precision" aspect="aspect-square" image={`${import.meta.env.BASE_URL}assets/images/oo1.png`} />
                        <ProjectCard type="Logo" title="Brand Mark II" subtitle="Typography" aspect="aspect-square" image={`${import.meta.env.BASE_URL}assets/images/plo1.png`} />
                    </div>
                </div>

                {/* LOGO INTRO (2 Portrait, 2 Landscape) */}
                <div className="mb-32">
                    <div className="flex items-center gap-4 mb-12">
                        <div className="h-[1px] bg-royal-gold w-12"></div>
                        <h3 className="text-3xl font-serif text-deep-saffron">Brand Motion</h3>
                        <div className="h-[1px] flex-1 bg-royal-gold/20"></div>
                    </div>
                    {/* Grid: 2 Columns. Row 1: Portrait, Row 2: Landscape */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <ProjectCard type="Intro" title="Mobile Intro I" subtitle="Story Format" aspect="aspect-[9/16]" video={`${import.meta.env.BASE_URL}assets/videos/hp1.mp4`} preload="metadata" />
                        <ProjectCard type="Intro" title="Mobile Intro II" subtitle="Story Format" aspect="aspect-[9/16]" video={`${import.meta.env.BASE_URL}assets/videos/0215_2.mp4`} preload="metadata" />
                        <div className="md:col-span-2 flex justify-center">
                            <div className="w-full max-w-2xl">
                                <ProjectCard type="Intro" title="Desktop Intro I" subtitle="Widescreen" aspect="aspect-video" video={`${import.meta.env.BASE_URL}assets/videos/hpl1.mp4`} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* YOUTUBE THUMBNAIL (2 Landscape) */}
                <div className="mb-32">
                    <div className="flex items-center gap-4 mb-12">
                        <div className="h-[1px] bg-royal-gold w-12"></div>
                        <h3 className="text-3xl font-serif text-deep-saffron">The Click</h3>
                        <div className="h-[1px] flex-1 bg-royal-gold/20"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <ProjectCard type="Thumbnail" title="Click-Through 01" subtitle="Psychology Driven" aspect="aspect-video" image={`${import.meta.env.BASE_URL}assets/images/th1.png`} />
                        <ProjectCard type="Thumbnail" title="Click-Through 02" subtitle="High Contrast" aspect="aspect-video" image={`${import.meta.env.BASE_URL}assets/images/th2.png`} />
                    </div>
                </div>

                {/* YOUTUBE VIDEO (2 Items) */}
                <div className="mb-32">
                    <div className="flex items-center gap-4 mb-12">
                        <div className="h-[1px] bg-royal-gold w-12"></div>
                        <h3 className="text-3xl font-serif text-deep-saffron">The Broadcast</h3>
                        <div className="h-[1px] flex-1 bg-royal-gold/20"></div>
                    </div>
                    <div className="grid grid-cols-1 gap-8 max-w-4xl mx-auto">
                        <ProjectCard type="Broadcast" title="Main Feature" subtitle="Long Form Content" aspect="aspect-video" video={`${import.meta.env.BASE_URL}assets/videos/kk1.mp4`} />
                    </div>
                </div>




                {/* ARSENAL */}
                <div className="bg-gradient-to-b from-rich-black/80 to-midnight-blue/20 p-8 md:p-12 lg:p-24 border border-royal-gold/10 relative overflow-hidden backdrop-blur-sm">
                    {/* Decorative corners - adjusted size for mobile */}
                    <div className="absolute top-0 left-0 w-12 h-12 md:w-32 md:h-32 border-t-2 md:border-t-4 border-l-2 md:border-l-4 border-royal-gold/20"></div>
                    <div className="absolute bottom-0 right-0 w-12 h-12 md:w-32 md:h-32 border-b-2 md:border-b-4 border-r-2 md:border-r-4 border-royal-gold/20"></div>

                    <h2 className="text-3xl md:text-5xl font-serif text-center text-off-white mb-10 md:mb-20 relative z-10 px-4">Our Arsenal</h2>

                    {/* Grid wrapper with added padding to prevent edge clipping */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 relative z-10 px-2">
                        <EquipmentIcon icon={Camera} label="Cinema Line" desc="Sony FX3 / A7SIII" />
                        <EquipmentIcon icon={Monitor} label="Sonic Fidelity" desc="Rode NTG3 / Shure SM7B" />
                        <EquipmentIcon icon={Video} label="Illumination" desc="Aputure 600d / Amaran" />
                        <EquipmentIcon icon={Mic} label="Post-Processing" desc="DaVinci Resolve Studio" />
                    </div>
                </div>
            </div>
        </section>
    );
}
