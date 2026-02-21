import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import SoftBackdrop from "../components/SoftBackdrop";
import AspectRatioSelector from "../components/AspectRatioSelector";
import { colorSchemes, type AspectRatio, type ThumbnailStyle } from "../assets/assets";
import StyleSelector from "../components/StyleSelector";
import ColorSchemeSelector from "../components/ColorSchemeSelector";
import PreviewPanel from "../components/PreviewPanel";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import api from "../configs/api";

type IThumbnail = {
  title: string;
  imageUrl?: string;
};

const Generate = () => {
  const { id } = useParams();
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { isLoggedIn } = useAuth()
  const [title, setTitle] = useState("");
  const [additionalDetails, setAdditionalDetails] = useState("");
  const [thumbnail, setThumbnail] = useState<IThumbnail | null>(null);
  const [loading, setLoading] = useState(false);
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>("16:9");
  const [colorSchemeId, setColorSchemeId] = useState<string>(colorSchemes[0].id);
  const [style, setStyle] = useState<ThumbnailStyle>("Bold & Graphic");
  const [styleDropdownOpen, setStyleDropdownOpen] = useState(false);

  const handleGenerate = async () => {
    if (!isLoggedIn) return toast.error('Please login to Generate thumbnails')
    if (!title.trim()) return toast.error('Title is Required')
    setLoading(true)

    const api_payload = {
      title,
      prompt: additionalDetails,
      style,
      aspectRatio: aspectRatio,
      colorScheme: colorSchemeId,
      text_overlay: true,
    }
    const { data } = await api.post('/api/thumbnail/generate', api_payload);
    if (data.thumbnail) {
      navigate('/generate/' + data.thumbnail._id);
      toast.success(data.message)
    }
  }

  const fetchThumbnail = async () => {
    try {
      const { data } = await api.get(`/api/thumbnail/${id}`);
      setThumbnail(data?.thumbnail as IThumbnail);
      setLoading(!data?.thumbnail?.image_url);
      setAdditionalDetails(data?.thumbnail?.user_prompt)
      setTitle(data?.thumbnail?.title)
      setColorSchemeId(data?.thumbnail?.color_scheme)
      setAspectRatio(data?.thumbnail?.aspect_ratio)
      setStyle(data?.thumbnail?.style)
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.message || error.message)

    }
  }

  useEffect(() => {
    if (isLoggedIn && id) {
      fetchThumbnail()
    }
    if (id && loading && isLoggedIn) {
      const interval = setInterval(() => {
        fetchThumbnail()
      }, 5000);
      return () => clearInterval(interval)
    }
  }, [id, loading, isLoggedIn])

  useEffect(() => {
    if (!id && thumbnail) {
      setThumbnail(null)
    }

  }, [pathname])

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
                    <label className="block text-sm font-medium ">
                      Title or Topic
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      maxLength={100}
                      className="w-full px-4 py-3  border border-white/12 bg-black/20 rounded-lg text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                      placeholder="eg: How to grow your YouTube channel"
                    />
                    <div className="flex justify-end">
                      <span className="text-xs text-zinc-400">{title.length}/100</span>
                    </div>
                  </div>

                  {/* Aspect Ratio Selector */}
                  <AspectRatioSelector value={aspectRatio} onChange={setAspectRatio} />
                  {/* StyleSelector */}
                  <StyleSelector value={style} onChange={setStyle} isOpen={styleDropdownOpen} setIsOpen={setStyleDropdownOpen} />
                  {/* ColorSchemeSelector */}
                  <ColorSchemeSelector value={colorSchemeId} onChange={setColorSchemeId} />

                  {/* Additional Details Input */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium">
                      Additional Prompts  <span className="text-zinc-400 text-xs">(optional)</span>
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
                      onClick={handleGenerate}
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
                <h2 className="text-lg font-semibold text-zinc-100 mb-4">Preview</h2>
                <PreviewPanel thumbnail={thumbnail} isLoading={loading} aspectRatio={aspectRatio} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Generate;
