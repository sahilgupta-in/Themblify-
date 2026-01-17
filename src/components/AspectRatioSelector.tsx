import { RectangleHorizontal, RectangleVertical, Square } from "lucide-react"
import { aspectRatios, type AspectRatio } from "../assets/assets"
import type React from "react"

const AspectRatioSelector = ({value, onChange}: {value: AspectRatio; onChange: (ratio: AspectRatio) => void}) => {

    const iconMap = {
        "16:9": <RectangleHorizontal className="size-6" />,
        "9:16": <RectangleVertical className="size-6"/>,
        "1:1": <Square className="size-6" />,
    } as Record<AspectRatio, React.ReactNode>


  return (
    <div className='space-y-3'>
      <label className='block text-sm font-medium text-zinc-200'>Aspect Ratio</label>
      <div className="flex flex-wrap gap-2">
        {aspectRatios.map((ratio: AspectRatio) => (
          <button 
            key={ratio}
            onClick={() => onChange(ratio)}
            className={`flex items-center justify-center p-2 rounded-md border ${
              value === ratio ? "border-blue-500 bg-blue-500 text-white" : "border-zinc-700 bg-zinc-800 text-zinc-200"
            }`}
          >
            {iconMap[ratio]}
          </button>
        ))}
      </div>
    </div>
  )
}

export default AspectRatioSelector