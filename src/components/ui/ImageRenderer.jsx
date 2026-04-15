import { useState, useEffect, useRef } from 'react';
import heic2any from 'heic2any';

/**
 * ImageRenderer — A shared component to handle standard and HEIC images with loading/error states.
 */
export default function ImageRenderer({ src, alt, className = "", style = {}, loading = "lazy" }) {
    const [displaySrc, setDisplaySrc] = useState(null);
    const [status, setStatus] = useState('idle'); // idle | loading | loaded | error
    const objectUrlRef = useRef(null);

    useEffect(() => {
        let isMounted = true;

        if (!src) {
            setDisplaySrc(null);
            setStatus('idle');
            return;
        }

        const isHeic = /\.(heic|HEIC)(\?.*)?$/.test(src);
        setStatus('loading');

        if (isHeic) {
            const cached = sessionStorage.getItem(`heic_${src}`);
            if (cached) {
                if (isMounted) {
                    setDisplaySrc(cached);
                    setStatus('loaded');
                }
            } else {
                fetch(src)
                    .then(res => {
                        if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
                        return res.blob();
                    })
                    .then(blob => {
                        if (blob.size === 0) throw new Error("Empty blob received");
                        return heic2any({
                            blob,
                            toType: 'image/jpeg',
                            quality: 0.7
                        });
                    })
                    .then(converted => {
                        const blob = Array.isArray(converted) ? converted[0] : converted;
                        const url = URL.createObjectURL(blob);
                        objectUrlRef.current = url;
                        sessionStorage.setItem(`heic_${src}`, url);
                        if (isMounted) {
                            setDisplaySrc(url);
                            setStatus('loaded');
                        }
                    })
                    .catch(err => {
                        console.error("[HEIC Decode] Failure:", src, err);
                        if (isMounted) setStatus('error');
                    });
            }
        } else {
            setDisplaySrc(src);
            // Non-HEIC images will trigger onLoad or onError on the img element
        }

        return () => {
            isMounted = false;
        };
    }, [src]);

    const handleLoad = () => setStatus('loaded');
    const handleError = () => {
        if (status === 'error') return;
        setStatus('error');
    };

    const finalSrc = status === 'error' 
        ? 'https://via.placeholder.com/800x600/f1f5f9/94a3b8?text=Image+Preview+Unavailable' 
        : displaySrc;

    return (
        <div className={`relative w-full h-full overflow-hidden ${className}`} style={style}>
            {/* Shimmer / Loading State */}
            {(status === 'loading' || status === 'idle') && (
                <div className="absolute inset-0 z-10 overflow-hidden bg-slate-100 dark:bg-slate-800">
                    <div className="absolute inset-0 -translate-x-full animate-shimmer-sweep bg-gradient-to-r from-transparent via-slate-200/20 to-transparent" />
                </div>
            )}

            {/* Error Overlay */}
            {status === 'error' && (
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-4 text-center bg-slate-50">
                    <span className="text-2xl mb-2">⚠️</span>
                    <p className="text-[10px] text-red-500 uppercase font-bold">Preview Unavailable</p>
                </div>
            )}

            {src && (
                <img
                    key={src}
                    src={finalSrc}
                    alt={alt || "Image"}
                    onLoad={handleLoad}
                    onError={handleError}
                    loading={loading}
                    className={`w-full h-full object-cover object-center transition-opacity duration-500 ${(status === 'loaded' || status === 'error') ? 'opacity-100' : 'opacity-0'}`}
                />
            )}
        </div>
    );
}
