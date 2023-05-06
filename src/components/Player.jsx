import { useBoardState } from "@/context/BoardContext";
import InputList from "./InputList";

export function Player({ name, playerId, stageId }) {
  const board = useBoardState();

  if (!board) return null;
  const stageInfo = board[playerId].stages[stageId];
  const playerStageTotal = stageInfo.total;
  const values = stageInfo.inputList;
  console.log(board);
  return (
    <div className="flex gap-3">
      <span className="flex-1 flex items-center">{name}</span>
      <InputList
        length={6}
        maxValue={4}
        values={values.slice(0, 6)}
        playerId={playerId}
        stageId={stageId}
      />
      <InputList
        length={3}
        maxValue={2}
        values={values.slice(6)}
        playerId={playerId}
        stageId={stageId}
      />
      <span className="flex items-center bg-white w-8 text-black rounded-sm justify-center">
        {playerStageTotal === 0 ? "-" : playerStageTotal}
      </span>
    </div>
  );
}
