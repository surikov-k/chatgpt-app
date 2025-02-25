import UserButton from '@/app/components/UserButton';
import type { Metadata } from "next";
import React from 'react';
import { SessionProvider } from './components/SessionProvider';
import localFont from "next/font/local";
import "./globals.css";
import Link from 'next/link';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "NextJS ChatGPT App",
  description: "ChatGPT brought to you by NextJS",
};

export default function RootLayout({
  children,
  chats
}: Readonly<{
  children: React.ReactNode,
  chats: React.ReactNode
}>) {
  return (
    <SessionProvider>
      <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <header className="text-white font-bold bg-blue-700 text-2xl flex py-3 px-5 rounded">
        <div className="flex flex-grow">
          <Link href="/">GPT Chat</Link>
          <Link href="/about"
                className="ml-5 font-light">About</Link>
        </div>
        <div>
          <UserButton/>
        </div>
      </header>
      <div className="flex flex-col md:flex-row">
          {chats}
        <div className="flex-grow">
          {children}
        </div>
      </div>
      </body>
      </html>
    </SessionProvider>
  );
}
