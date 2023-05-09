import { useBoardState } from "@/context/BoardContext";
import Stages from "./Stages";

export default function Board() {
  const board = useBoardState();
  return (
    <section className=" bg-slate-900 rounded-md text-white shadow p-4 flex flex-col justify-center">
      <Stages />
      <div className="flex gap-1 justify-center text-sm">
        <span className="text-emerald-700 font-bold">TOTAL</span>{" "}
        {board[0].name} {board[0].total} - {board[1].name} {board[1].total}
      </div>
    </section>
  );
}
