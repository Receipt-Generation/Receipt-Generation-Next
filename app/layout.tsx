import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import {Toaster} from 'sonner'
import { Suspense } from "react";

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
  title: "Receipt Generation",
  description: "Generate receipts for your donations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
       <ClerkProvider>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Toaster/>
          <Suspense fallback={<div>Loading...</div>}>
        {children}
        </Suspense>
      </body>
        </ClerkProvider>
    </html>
  );
}
