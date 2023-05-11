import { useBoardState } from "@/context/BoardContext";
import Stages from "./Stages";

export default function Board() {
  const board = useBoardState();
  return (
    <section className=" bg-slate-900 rounded-md text-white shadow p-4 flex flex-col justify-center w-[720px]">
      <Stages />
    </section>
  );
}
