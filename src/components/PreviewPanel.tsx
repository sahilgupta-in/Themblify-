import React from "react";
import type { AspectRatio } from "../assets/assets";
import { Loader2Icon, Download as DownloadIcon, ImageIcon } from "lucide-react";

// ✅ Make sure your thumbnail type matches the API shape
type IThumbnail = {
  title: string;
  imageUrl?: string; // ✅ use only ONE key
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
  const onDownload = () => {
    if (!thumbnail?.imageUrl) return;
    window.open(thumbnail.imageUrl, "_blank");
  };

  const hasThumbnail = !!thumbnail?.imageUrl;

  return (
    <div className="relative w-full mx-auto max-w-2xl">
      <div
        className={`relative overflow-hidden rounded-xl border border-zinc-700/60 bg-zinc-950 ${aspectClasses[aspectRatio]}`}
      >
        {/* ✅ Loading State */}
        {isLoading && (
          <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center gap-3 z-10">
            <Loader2Icon className="size-8 animate-spin text-zinc-300" />
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

        {/* ✅ Thumbnail Image */}
        {!isLoading && hasThumbnail && thumbnail && (
          <div className="group relative h-full w-full">
            <img
              src={thumbnail.imageUrl}
              alt={thumbnail.title || "Generated thumbnail"}
              className="w-full h-full object-cover"
            />

            <button
              onClick={onDownload}
              type="button"
              className="absolute inset-0 flex items-center justify-center bg-black/55 opacity-0 group-hover:opacity-100 transition-opacity text-white font-medium"
            >
              <DownloadIcon className="size-4 mr-2" />
              Download Thumbnail
            </button>
          </div>
        )}

        {/* ✅ Placeholder */}
        {!isLoading && !hasThumbnail && (
          <div className="absolute inset-0 m-3 bg-black/20 flex flex-col gap-4 rounded-lg border-2 border-dashed border-white/15 items-center justify-center">
            <div className="max-sm:hidden flex size-20 items-center justify-center rounded-full bg-white/10">
              <ImageIcon className="size-10 text-white/50" />
            </div>

            <div className="px-4 text-center">
              <p className="text-sm font-medium text-zinc-200">
                Generate your first thumbnail
              </p>
              <p className="mt-1 text-xs text-zinc-400">
                Fill out the form and then click Generate
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviewPanel;
