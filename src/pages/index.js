import Image from "next/image";
import { Inter } from "next/font/google";
import Board from "@/components/Board";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`h-screen grid place-content-center bg-red-500 ${inter.className}`}
    >
      <Board />
    </main>
  );
}
