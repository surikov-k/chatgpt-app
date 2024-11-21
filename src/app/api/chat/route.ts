// import { openai } from "@ai-sdk/openai";
import { createOpenAI } from '@ai-sdk/openai';

import { streamText, convertToCoreMessages } from "ai";
import { NextRequest } from "next/server";
import { auth } from "@/auth";

export const runtime = "edge";

const openai = createOpenAI({
  baseURL: "https://api.rockapi.ru/openai/v1",
});

export const POST = auth(async function POST(req: NextRequest) {
  const {messages} = await req.json();


  const result = streamText({
    model: openai("gpt-4-turbo",),
    messages: convertToCoreMessages(messages),
  });

  return result.toDataStreamResponse();
})
