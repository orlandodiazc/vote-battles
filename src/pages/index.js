import { Inter } from "next/font/google";
import Board from "@/components/Board";
import { BoardContextProvider } from "@/context/BoardContext";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <BoardContextProvider>
      <main
        className={`h-screen grid place-content-center bg-red-500 ${inter.className}`}
      >
        <Board />
      </main>
    </BoardContextProvider>
  );
}
