import { GoogleGenAI } from "@google/genai";

export async function moderateVehicleContent(vehicleData: any) {
  if (!process.env.GEMINI_API_KEY) {
    console.warn("GEMINI_API_KEY is not set. Skipping AI content moderation.");
    return { isAppropriate: true, reason: "" };
  }

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  let imagePart = null;
  if (vehicleData.imageUrl && vehicleData.imageUrl.startsWith("http")) {
    try {
      const imgRes = await fetch(vehicleData.imageUrl);
      if (imgRes.ok) {
        const arrayBuffer = await imgRes.arrayBuffer();
        const base64Data = Buffer.from(arrayBuffer).toString("base64");
        const mimeType = imgRes.headers.get("content-type") || "image/jpeg";
        imagePart = {
          inlineData: {
            data: base64Data,
            mimeType: mimeType,
          },
        };
      }
    } catch (err) {
      console.warn("Could not fetch image for moderation:", err);
    }
  }

  const promptText = `
    You are an AI content moderation filter for a Car Dealership application.
    Evaluate the following vehicle submission for any 18+ or inappropriate content.
    Also, ensure that the submission (including the image if provided) actually represents a vehicle (car, truck, SUV, etc.) and not random or inappropriate objects.
    
    Make: ${vehicleData.make}
    Model: ${vehicleData.model}
    Category: ${vehicleData.category}
    Description: ${vehicleData.description || "None"}
    
    Respond in JSON format with exactly two fields:
    {
      "isAppropriate": boolean,
      "reason": "string explaining why if false, or 'Looks good' if true"
    }
  `;

  const contents: any[] = [promptText];
  if (imagePart) {
    contents.push(imagePart);
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-flash-latest",
      contents: contents,
      config: {
        responseMimeType: "application/json",
      },
    });

    const result = JSON.parse(response.text || "{}");
    return {
      isAppropriate: result.isAppropriate ?? true,
      reason: result.reason ?? "",
    };
  } catch (error) {
    console.error("Content moderation error:", error);
    throw new Error("Failed to moderate content using AI.");
  }
}
