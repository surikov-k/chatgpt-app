"use server";
import { createChat, updateChat } from '@/db';
import { getServerSession } from 'next-auth';
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: "https://api.rockapi.ru/openai/v1"
});


export async function getCompletion(
  id: number | null,
  messageHistory: {role: "user" | "assistant", content: string}[],
) {

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: messageHistory,
  });

  const messages = [
    ...messageHistory,
    response.choices[0].message as unknown as {
    role: "user" | "assistant";
    content: string;
    },
  ];

  const session = await getServerSession();

  let chatId = id;
  if (!chatId) {
    chatId = await createChat(
      session?.user?.email || "",
      messageHistory[0].content,
      messages
    );
  } else {
    await updateChat(chatId, messages);
  }

  return {
    messages,
    id: chatId,
  };
}
