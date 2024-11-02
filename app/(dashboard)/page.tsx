import Image from "next/image";

export default function Home() {
  return (
    <div className=" flex-1 w-full pt-12 h-full border flex justify-center gap-16 items-center flex-col">
      <div>
        <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-t from-zinc-950 to-zinc-500">Welcome to the Dashboard</h1>
      </div>
      <Image src="./home.svg" alt="logo" width={1000} height={1000} className="h-1/2" />
    </div>
  );
}
