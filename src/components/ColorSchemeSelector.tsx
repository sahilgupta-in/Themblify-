import React from "react";
import { colorSchemes } from "../assets/assets";

type Props = {
  value: string;
  onChange: (color: string) => void;
};

const ColorSchemeSelector = ({ value, onChange }: Props) => {
  const selectedScheme = colorSchemes.find((scheme) => scheme.id === value);

  return (
    <div className="space-y-4">
      {/* Title */}
      <label className="block text-base font-semibold text-zinc-100">
        Color Scheme
      </label>

      {/* Grid */}
      <div className="grid grid-cols-6 gap-4">
        {colorSchemes.map((scheme) => {
          const isSelected = value === scheme.id;

          return (
            <button
              key={scheme.id}
              type="button"
              onClick={() => onChange(scheme.id)}
              title={scheme.name}
              className={`
                w-14 h-12 rounded-xl overflow-hidden border border-zinc-700/60
                transition-all duration-200
                hover:scale-105 hover:border-zinc-500/70
                focus:outline-none focus:ring-2 focus:ring-pink-500
                ${isSelected ? "ring-2 ring-pink-500 border-transparent" : ""}
              `}
            >
              <div
                className="w-full h-full"
                style={{
                  background: `linear-gradient(90deg, ${scheme.colors.join(", ")})`,
                }}
              />
            </button>
          );
        })}
      </div>

      {/* Selected */}
      <p className="text-sm text-zinc-500">
        Selected:{" "}
        <span className="text-zinc-300 font-medium">
          {selectedScheme?.name || "None"}
        </span>
      </p>
    </div>
  );
};

export default ColorSchemeSelector;
