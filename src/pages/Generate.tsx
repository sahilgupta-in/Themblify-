import { useState } from "react";
import { useParams } from "react-router-dom";
import SoftBackdrop from "../components/SoftBackdrop";
import AspectRatioSelector from "../components/AspectRatioSelector";
import { colorSchemes, type AspectRatio, type ThumbnailStyle } from "../assets/assets";
import StyleSelector from "../components/StyleSelector";
import ColorSchemeSelector from "../components/ColorSchemeSelector";
import PreviewPanel from "../components/PreviewPanel";

type IThumbnail = {
  title: string;
  imageUrl?: string;
};

const Generate = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [additionalDetails, setAdditionalDetails] = useState("");
  const [thumbnail, setThumbnail] = useState<IThumbnail | null>(null);
  const [loading, setLoading] = useState(false);
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>("16:9");
  const [colorSchemeId, setColorSchemeId] = useState<string>(colorSchemes[0].id);
  const [style, setStyle] = useState<ThumbnailStyle>("Bold & Graphic");
  const [styleDropdownOpen, setStyleDropdownOpen] = useState(false);
  
  return (
    <>
      <SoftBackdrop />
      <div className="pt-24 min-h-screen">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[400px_1fr] gap-8">
            {/* Left Column */}
            <div className={`space-y-6 ${id && "pointer-events-none"}`}>
              <div className="p-6 rounded-2xl bg-white/8 border border-white/12 shadow-xl space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-zinc-100 mb-1">
                    Create Your Thumbnail
                  </h2>
                  <p className="text-sm text-zinc-400">
                    Describe your vision and let AI bring it to life
                  </p>
                </div>
                <div className="space-y-5">
                  {/* Title Input */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-zinc-300 mb-2">
                      Title or Topic
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      maxLength={100}
                      className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
                      placeholder="eg: How to grow your YouTube channel"
                    />
                    <div className="flex justify-end">
                        <span className="text-xs text-zinc-400">{title.length}/100</span>
                    </div>
                  </div>

                  {/* Aspect Ratio Selector */}
                  <AspectRatioSelector  value={aspectRatio} onChange={setAspectRatio} />
                 {/* StyleSelector */}
                    <StyleSelector value={style} onChange={setStyle} isOpen={styleDropdownOpen} setIsOpen={setStyleDropdownOpen} />
                 {/* ColorSchemeSelector */}
                 <ColorSchemeSelector value={colorSchemeId} onChange={setColorSchemeId} />

                  {/* Additional Details Input */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium">
                      Additional Prompts  <span className="text-zinc-500">(optional)</span>
                    </label>
                    <textarea
                      value={additionalDetails}
                      onChange={(e) => setAdditionalDetails(e.target.value)}
                      className="w-full px-4 py-3 resize-none  border border-white/10 bg-white/6  rounded-lg text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                      placeholder="Describe your vision in more detail..."
                      rows={3}
                    />
                  </div>
                </div>
                {/* Button */}
                {!id && (
                  <div>
                    <button
                      disabled={loading}
                      className="w-full h-12 bg-pink-600 hover:bg-pink-500 text-white rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >
                      {loading ? "Generating..." : "Generate Thumbnail"}
                    </button>
                  </div>
                )}
                <div></div>
              </div>
            </div>

            {/* Right Column */}
            <div>
              <div className="p-6 rounded-2xl bg-white/8 border border-white/10 shadow-xl">
                <h2 className="text-lg font-semibold text-zinc-400 mb-4">Preview</h2>
                <PreviewPanel thumbnail={thumbnail} isLoading={loading} aspectRatio={aspectRatio}/>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Generate;
