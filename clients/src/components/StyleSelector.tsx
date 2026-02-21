import React from "react"
import type { ThumbnailStyle } from "../assets/assets"
import { thumbnailStyles } from "../assets/assets"
import {
  ChevronDownIcon,
  CpuIcon,
  ImageIcon,
  PenToolIcon,
  SparkleIcon,
  SquareIcon,
} from "lucide-react"

const styleDescriptions: Record<ThumbnailStyle, string> = {
  "Bold & Graphic": "High-contrast designs with striking visuals.",
  "Minimalist": "Clean and simple designs focusing on essentials.",
  "Photorealistic": "Lifelike images with detailed textures and lighting.",
  "Illustrated": "Hand-drawn or digitally illustrated styles.",
  "Tech/Futuristic": "Sleek designs with a modern, high-tech aesthetic.",
}

const styleIcons: Record<ThumbnailStyle, React.ReactNode> = {
  "Bold & Graphic": <SparkleIcon className="w-4 h-4" />,
  "Minimalist": <SquareIcon className="w-4 h-4" />,
  "Photorealistic": <ImageIcon className="w-4 h-4" />,
  "Illustrated": <PenToolIcon className="w-4 h-4" />,
  "Tech/Futuristic": <CpuIcon className="w-4 h-4" />,
}

const StyleSelector = ({
  value,
  onChange,
  isOpen,
  setIsOpen,
}: {
  value: ThumbnailStyle
  onChange: (style: ThumbnailStyle) => void
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}) => {
  return (
    <div className="space-y-3 relative">
      <label className="block text-sm font-medium text-zinc-200">
        Thumbnail Style
      </label>

      <div>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between p-3 bg-white/8 border border-white/10 rounded-md text-left text-zinc-200"
        >
          <div className="space-y-1">
            <div className="flex items-center">
              {styleIcons[value]}
              <span className="ml-2 font-medium">{value}</span>
            </div>

            <div className="text-xs text-zinc-400">
              {styleDescriptions[value]}
            </div>
          </div>

          <ChevronDownIcon
            className={`w-5 h-5 text-zinc-400 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isOpen && (
          <div className="absolute z-10 mt-1 w-full bg-zinc-900 border border-zinc-700 rounded-md shadow-lg max-h-60 overflow-y-auto">
            {thumbnailStyles.map((style) => (
              <div
                key={style}
                onClick={() => {
                  onChange(style)
                  setIsOpen(false)
                }}
                className="flex items-center p-3 hover:bg-zinc-800 cursor-pointer"
              >
                {styleIcons[style]}

                <div className="ml-2">
                  <div className="text-zinc-200 font-medium">{style}</div>
                  <div className="text-xs text-zinc-400">
                    {styleDescriptions[style]}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default StyleSelector