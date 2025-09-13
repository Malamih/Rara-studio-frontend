"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface SimpleVimeoPlayerProps {
  videoUrl: string;
  open: boolean; // control visibility
  onClose?: () => void; // callback when closed
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
  width?: number;
  height?: number;
  className?: string;
}

export const SimpleVimeoPlayer: React.FC<SimpleVimeoPlayerProps> = ({
  videoUrl,
  open,
  onClose,
  autoplay = false,
  loop = false,
  muted = false,
  controls = true,
  width = 640,
  height = 360,
  className,
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Build Vimeo embed URL with parameters
  const getEmbedUrl = () => {
    const params = new URLSearchParams({
      autoplay: autoplay ? "1" : "0",
      loop: loop ? "1" : "0",
      muted: muted ? "1" : "0",
      controls: controls ? "1" : "0",
    });

    const idMatch = videoUrl.match(/vimeo\.com\/(\d+)/);
    const videoId = idMatch ? idMatch[1] : null;

    if (!videoId) return videoUrl;
    return `https://player.vimeo.com/video/${videoId}?${params.toString()}`;
  };

  const handleIframeLoad = () => setIsLoading(false);
  const handleIframeError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  // Close when clicking outside the iframe
  const handleClickOutside = (e: MouseEvent) => {
    if (overlayRef.current && e.target === overlayRef.current) {
      onClose?.();
    }
  };

  useEffect(() => {
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      setIsLoading(true);
      setHasError(false);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  if (!open) return null;

  if (hasError) {
    return (
      <div
        ref={overlayRef}
        className="fixed inset-0 flex items-center justify-center bg-black/80 z-50"
      >
        <p className="text-white">Failed to load video.</p>
      </div>
    );
  }

  return (
    <div
      ref={overlayRef}
      className={cn(
        "fixed inset-0 flex items-center justify-center bg-black/80 z-50",
        className
      )}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-white"></div>
        </div>
      )}

      <iframe
        ref={iframeRef}
        src={getEmbedUrl()}
        width={width}
        height={height}
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        className="rounded-lg shadow-lg z-10"
        onLoad={handleIframeLoad}
        onError={handleIframeError}
      />
    </div>
  );
};
