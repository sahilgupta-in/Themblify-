import mongoose, { Schema, Document, Model } from "mongoose";

export interface IThumbnail extends Document {
    userId: mongoose.Types.ObjectId;
    title: string;
    description?: string;
    style: "Bold & Graphic" | "Tech/Futuristic" | "Minimalist" | "Photorealistic" | "Illustrated";
    aspect_ratio?: "16:9" | "1:1" | "9:16";
    color_scheme?: "vibrant" | "sunset" | "forest" | "neon" | "purple" | "monochrome" | "ocean" | "pastel";
    text_overlay?: boolean;
    image_url?: string;
    prompt_used?: string;
    user_prompt?: string;
    isGenerating?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

const ThumbnailSchema: Schema<IThumbnail> = new Schema(
  {
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    style: {
        type: String,
        enum: ["Bold & Graphic", "Tech/Futuristic", "Minimalist", "Photorealistic", "Illustrated"],
        required: true
    },
    aspect_ratio: {
        type: String,
        enum: ["16:9", "1:1", "9:16"]
    },
    color_scheme: {
        type: String,
        enum: ["vibrant", "sunset", "forest", "neon", "purple", "monochrome", "ocean", "pastel"]
    },
    text_overlay: {
        type: Boolean
    },
    image_url: {
        type: String
    },
    prompt_used: {
        type: String
    },
    user_prompt: {
        type: String
    },
    isGenerating: {
        type: Boolean,
        default: false
    }
  },
  {
    timestamps: true,
  }
);

const Thumbnail: Model<IThumbnail> =
  mongoose.models.Thumbnail ||
  mongoose.model<IThumbnail>("Thumbnail", ThumbnailSchema);

export default Thumbnail;
