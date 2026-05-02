import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { messageId, tone } = body;

  if (!messageId || !tone) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  }

  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: "OpenAI API key not configured" }, { status: 500 });
  }

  let generatedReply = "";
  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: `You are an expert executive assistant drafting email replies. Write a response with a strictly ${tone} tone.`
          },
          {
            role: "user",
            content: "Draft a brief, general response acknowledging receipt of an incoming email. State that I will review it and get back to them soon."
          }
        ]
      })
    });

    const data = await response.json();
    if (data.choices && data.choices[0]) {
      generatedReply = data.choices[0].message.content.trim();
    } else {
      console.error("OpenRouter API Error:", data);
      throw new Error("Invalid response from AI");
    }
  } catch (error) {
    console.error("AI Generation Error:", error);
    return NextResponse.json({ error: "Failed to generate AI reply" }, { status: 500 });
  }

  return NextResponse.json({
    status: "success",
    data: {
      reply: generatedReply
    }
  });
}
