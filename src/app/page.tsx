import Chat from '@/app/components/Chat';
import PreviousChats from '@/app/components/PreviousChats';
import { Separator } from '@/components/ui/separator';
import { getServerSession } from 'next-auth';
import { Suspense } from 'react';

export default async function Home() {
  const session = await getServerSession();
  console.log(session)

  return (
    <main className="p-5">
      <h1 className="text-4xl font-bold">Welcome to GPT Chat</h1>
      {!session?.user?.name && <div>You need to log in to use this chat</div>}
      {session?.user?.name && (
        <>
          <Suspense fallback={<div>Loading Previous Chats...</div>}>
            <PreviousChats/>
          </Suspense>

          <h4 className="mt-5 text-2xl font-bold">New Chat Session</h4>
          <Separator className="my-5"/>
          <Chat/>
        </>
      )}
    </main>
  );
}
