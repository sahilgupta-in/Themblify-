import { Request, Response } from "express";
import Thumbnail from "../models/Thumbnail.js";
import ai from "../configs/ai.js";

export const getThumbnailById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req.session as any).userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Not authenticated",
      });
    }

    const thumbnail = await Thumbnail.findOne({ _id: id, userId });

    if (!thumbnail) {
      return res.status(404).json({
        success: false,
        message: "Thumbnail not found",
      });
    }

    return res.status(200).json({
      success: true,
      thumbnail,
    });

  } catch (error: any) {
    console.error("Error fetching thumbnail:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch thumbnail",
    });
  }
};

export const generateThumbnail = async (req: Request, res: Response) => {
  try {
    const { title, prompt: user_prompt, style, aspectRatio, colorScheme, imageUrl, color_scheme, text_overlay } = req.body;

    // Handle both camelCase and snake_case parameter names
    const finalAspectRatio = aspectRatio || req.body.aspect_ratio;
    const finalColorScheme = colorScheme || color_scheme;

    // Get userId from session
    const userId = (req.session as any).userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Not authenticated",
      });
    }

    // Create thumbnail record with isGenerating flag
    const thumbnail = await Thumbnail.create({
      userId,
      title,
      user_prompt,
      style,
      aspect_ratio: finalAspectRatio,
      image_url: imageUrl,
      color_scheme: finalColorScheme,
      text_overlay,
      isGenerating: true,
    });

    // Build a comprehensive prompt for the AI
    let prompt = `Generate a YouTube thumbnail for a video titled "${title}".`;
    
    if (user_prompt) {
      prompt += ` ${user_prompt}`;
    }
    
    if (style) {
      prompt += ` Use a ${style} style.`;
    }
    
    if (finalAspectRatio) {
      prompt += ` The aspect ratio should be ${finalAspectRatio}.`;
    }
    
    if (finalColorScheme) {
      prompt += ` Use a ${finalColorScheme} color scheme.`;
    }
    
    if (text_overlay) {
      prompt += ` Include text overlay on the thumbnail.`;
    }
    
    prompt += " Make it eye-catching, vibrant, and suitable for YouTube.";

    // Generate content using the AI model
    const model = 'gemini-2.0-flash-exp';
    const generationConfig = {
      maxOutputTokens: 32768,
      temperature: 1,
      topP: 0.95,
      responseModalities: ["image", "text"]
    } as any;

    const response = await ai.models.generateContent({
      model: model,
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      config: generationConfig,
    });

    // Extract the generated image URL from response
    let generatedImageUrl = '';
    let generatedPrompt = prompt;

    if (response.candidates && response.candidates.length > 0) {
      const candidate = response.candidates[0];
      if (candidate.content && candidate.content.parts) {
        for (const part of candidate.content.parts) {
          if (part.inlineData) {
            // Handle base64 image data
            const base64Data = part.inlineData.data;
            const mimeType = part.inlineData.mimeType;
            generatedImageUrl = `data:${mimeType};base64,${base64Data}`;
          } else if (part.text) {
            generatedPrompt = part.text;
          }
        }
      }
    }

    // Update thumbnail with the generated image URL and prompt used
    await Thumbnail.findByIdAndUpdate(thumbnail._id, {
      image_url: generatedImageUrl,
      prompt_used: generatedPrompt,
      isGenerating: false,
    });

    return res.status(201).json({
      success: true,
      message: "Thumbnail generated successfully",
      thumbnail: {
        _id: thumbnail._id,
        title: thumbnail.title,
        image_url: generatedImageUrl,
        style: thumbnail.style,
        aspect_ratio: thumbnail.aspect_ratio,
        isGenerating: false,
      },
    });

  } catch (error: any) {
    console.error("Error generating thumbnail:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to generate thumbnail",
    });
  }
};

export const getUserThumbnails = async (req: Request, res: Response) => {
  try {
    // Get userId from session
    const userId = (req.session as any).userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Not authenticated",
      });
    }

    // Get all thumbnails for the user, sorted by creation date (newest first)
    const thumbnails = await Thumbnail.find({ userId })
      .sort({ createdAt: -1 })
      .select('-prompt_used -user_prompt');

    return res.status(200).json({
      success: true,
      count: thumbnails.length,
      thumbnails,
    });

  } catch (error: any) {
    console.error("Error fetching thumbnails:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch thumbnails",
    });
  }
};
