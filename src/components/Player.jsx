import { useBoardState } from "@/context/BoardContext";
import InputList from "./InputList";

export function Player({ name, playerId, stageId, setup }) {
  const board = useBoardState();

  if (!board) return null;
  const stageInfo = board[playerId].stages[stageId];
  const playerStageTotal = stageInfo.total;
  const values = stageInfo.inputList;

  return (
    <div className="flex gap-3">
      <span className="flex-1 flex items-center">{name}</span>
      {setup.map((length, idx) => {
        const bot = setup[idx - 1] ?? 0;
        const top = setup[idx] + bot;

        return (
          <InputList
            key={idx}
            length={length}
            maxValue={4}
            values={values.slice(bot, top)}
            playerId={playerId}
            stageId={stageId}
          />
        );
      })}
      <InputList
        key={setup.length}
        length={3}
        maxValue={2}
        values={values.slice(-3)}
        playerId={playerId}
        stageId={stageId}
      />
      <span className="flex items-center bg-white w-8 text-black rounded-sm justify-center">
        {playerStageTotal === 0 ? "-" : playerStageTotal}
      </span>
    </div>
  );
}
