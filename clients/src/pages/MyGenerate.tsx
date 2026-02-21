import { useState, useEffect } from "react"
import SoftBackdrop from "../components/SoftBackdrop"
import { dummyThumbnails, type IThumbnail } from "../assets/assets"

const MyGenerate = () => {

  const [thumbnails, setThumbnails] = useState<IThumbnail[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchThumbnail = async () => {
      setLoading(true)
      setThumbnails(dummyThumbnails)
      setLoading(false)
    }

    fetchThumbnail()
  }, [])

  const handleDownload = (image_url: string) => {
    window.open(image_url, "_blank")
  }

  const handleDelete = (id: string) => {
    setThumbnails(prev => prev.filter(thumb => thumb._id !== id))
  }

  return (
    <>
      <SoftBackdrop />
      <div className="mt-32 h-screen px-6 md:px-16 lg:px-24 xl:px-32">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-zinc-200">
            My Generations
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            View and manage all your AI-generated thumbnails
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="rounded-2xl bg-white/6 border border-white/10 animate-pulse h-[260px]"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {thumbnails.map((thumb) => (
              <div
                key={thumb._id}
                className="rounded-2xl bg-white/6 border border-white/10 p-4"
              >
                <img
                  src={thumb.image_url}
                  alt={thumb.title}
                  className="rounded-xl mb-4"
                />
                <div className="flex justify-between">
                  <button
                    onClick={() => handleDownload(thumb.image_url)}
                    className="text-sm text-blue-400"
                  >
                    Download
                  </button>
                  <button
                    onClick={() => handleDelete(thumb._id)}
                    className="text-sm text-red-400"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default MyGenerate