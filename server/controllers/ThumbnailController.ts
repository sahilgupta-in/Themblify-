import { Request, Response } from "express";
import Thumbnail from "../models/Thumbnail.js";

export const generateThumbnail = async (req: Request, res: Response) => {
  try {
    const { title, prompt: user_prompt, style, aspectRatio, imageUrl, color_scheme, text_overlay } = req.body;

    // Get userId from session
    const userId = (req.session as any).userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Not authenticated",
      });
    }

    const thumbnail = await Thumbnail.create({
      userId,
      title,
      user_prompt,
      style,
      aspect_ratio: aspectRatio,
      image_url: imageUrl,
      color_scheme,
      text_overlay,
      isGenerating: true,
    });

    return res.status(201).json({
      success: true,
      message: "Thumbnail generation started",
      data: thumbnail,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};
