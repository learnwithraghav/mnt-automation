import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { messageId, tone } = body as {
    messageId?: unknown;
    tone?: unknown;
  };

  if (
    typeof messageId !== "string" ||
    !messageId.trim() ||
    typeof tone !== "string" ||
    !tone.trim()
  ) {
    return NextResponse.json({ error: "Missing or invalid parameters" }, { status: 400 });
  }

  const apiKey = process.env.OPENROUTER_API_KEY || process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: "OpenRouter API key not configured" }, { status: 500 });
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

    if (!response.ok) {
      console.error("OpenRouter API request failed with status:", response.status);
      return NextResponse.json({ error: "AI provider request failed" }, { status: 502 });
    }

    const replyContent = data?.choices?.[0]?.message?.content;
    if (typeof replyContent !== "string" || !replyContent.trim()) {
      console.error("OpenRouter API returned no reply content");
      throw new Error("Invalid response from AI");
    }

    generatedReply = replyContent.trim();
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
