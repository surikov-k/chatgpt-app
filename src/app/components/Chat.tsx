"use client";

import Transcript from '@/app/components/Transcript';
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getCompletion } from '@/app/server-actions/getCompletion';

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function Chat({
    id = null,
    messages: initialMessages = [],
  }: {
    id?: number | null;
    messages?: Message[];
  }
) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [message, setMessage] = useState("");
  const chatId = useRef<number | null>(id)

  const router = useRouter();

  const onClick = async () => {
    const completions = await getCompletion(chatId.current, [
      ...messages,
      {
        role: "user",
        content: message,
      }
    ]);

    if (!chatId.current) {
      router.push(`/chats/${completions.id}`)
      router.refresh();
    }
    chatId.current = completions.id

    setMessage("");
    setMessages(completions.messages);
  }

  return (
    <div className="flex flex-col">

      <Transcript messages={messages}
                  truncate={false}/>

      <div className="flex pt-3 my-3">
        <Input
          className="flex-grow text-xl"
          placeholder="Question"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              onClick();
            }
          }}
        />
        <Button onClick={onClick}
                className="ml-3 text-xl">
          Send
        </Button>
      </div>

    </div>
  )
}
