import React from "react";
import type { AspectRatio } from "../assets/assets";
import {
  Loader2Icon,
  Download as DownloadIcon,
  ImageIcon,
} from "lucide-react";

type IThumbnail = {
  title: string;
  imageUrl?: string;
};

type Props = {
  thumbnail: IThumbnail | null;
  isLoading: boolean;
  aspectRatio: AspectRatio;
};

const aspectClasses: Record<AspectRatio, string> = {
  "16:9": "aspect-video",
  "9:16": "aspect-[9/16]",
  "1:1": "aspect-square",
};

const PreviewPanel = ({ thumbnail, isLoading, aspectRatio }: Props) => {
  const hasThumbnail = Boolean(thumbnail?.imageUrl);

  const onDownload = () => {
    if (!thumbnail?.imageUrl) return;
    const link = document.createElement("a");
    link.href = thumbnail.imageUrl.replace("/upload", "/upload/f1_attachment");
    link.download = `${thumbnail.title || "thumbnail"}.png`;
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const showImage = !isLoading && hasThumbnail;
  const showPlaceholder = !isLoading && !hasThumbnail;

  return (
    <div className="relative w-full mx-auto max-w-2xl">
      <div
        aria-busy={isLoading}
        className={`relative overflow-hidden  ${aspectClasses[aspectRatio]}`}
      >
        {/* 🔄 Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 bg-black/50 backdrop-blur-sm">
            <Loader2Icon className="size-8 animate-spin text-zinc-200" />
            <div className="text-center">
              <p className="text-sm font-medium text-zinc-200">
                AI is creating your thumbnail
              </p>
              <p className="mt-1 text-xs text-zinc-400">
                This may take 10–20 seconds
              </p>
            </div>
          </div>
        )}

        {/* 🖼️ Generated Thumbnail */}
        {showImage && thumbnail && (
          <div className="group relative h-full w-full">
            <img
              src={thumbnail.imageUrl}
              alt={thumbnail.title || "Generated thumbnail"}
              className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
              loading="lazy"
            />

            <button
              onClick={onDownload}
              type="button"
              aria-label="Download generated thumbnail"
              className="absolute inset-0 flex items-center justify-center 
                         bg-gradient-to-t from-black/70 via-black/50 to-black/30
                         opacity-0 group-hover:opacity-100
                         transition-opacity duration-300
                         text-white font-medium backdrop-blur-[2px]"
            >
              <DownloadIcon className="size-4 mr-2" />
              Download Thumbnail
            </button>
          </div>
        )}

        {/* 🧩 Placeholder State */}
        {showPlaceholder && (
          <div className="absolute inset-0 m-4 flex flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-white/15 bg-black/20">
            <div className="hidden sm:flex size-20 items-center justify-center rounded-full bg-white/10 backdrop-blur-md">
              <ImageIcon className="size-10 text-white/50" />
            </div>

            <div className="px-4 text-center">
              <p className="text-sm font-medium text-zinc-200">
                Generate your first thumbnail
              </p>
              <p className="mt-1 text-xs text-zinc-400">
                Fill out the form and click Generate
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviewPanel;