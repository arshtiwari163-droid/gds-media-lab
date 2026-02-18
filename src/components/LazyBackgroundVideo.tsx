import { useRef, useEffect, useState } from 'react';

interface LazyBackgroundVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
    src: string;
    type?: string;
    poster?: string;
}

export default function LazyBackgroundVideo({ src, type = "video/mp4", poster, className, ...props }: LazyBackgroundVideoProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isIntersecting, setIntersecting] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIntersecting(true);
                    observer.disconnect();
                }
            },
            { rootMargin: '200px' } // Load 200px before it comes into view
        );

        if (videoRef.current) {
            observer.observe(videoRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <video
            ref={videoRef}
            className={className}
            poster={poster}
            muted
            loop
            playsInline
            {...props}
        >
            {isIntersecting && <source src={src} type={type} />}
        </video>
    );
}
