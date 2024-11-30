import Sidebar from "@/components/sidebar";
import { UserButton } from "@clerk/nextjs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div className=" h-screen w-screen flex ">
        <Sidebar />
        <div className=" w-full h-screen relative bg-third">
            <header className=" text-zinc-300 shadow-sm absolute bg-first flex justify-end items-center px-5 z-40 border-b w-full h-16 ">
              <UserButton showName />
            </header>
                {children}
        </div>
    </div>
  );
}
