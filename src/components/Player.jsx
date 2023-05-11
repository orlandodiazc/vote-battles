import { useBoardState } from "@/context/BoardContext";
import InputList from "./InputList";

export function Player({
  playerId,
  stageId,
  elements,
  onKeyDown,
  focusableId,
}) {
  const { scores, settings } = useBoardState();
  if (!scores || !settings) return null;
  const name = settings.playersName[playerId];
  const values = scores[playerId][stageId];
  const stageTotal = values.reduce(
    (acc, input) => acc + Number(input.value),
    0
  );
  const setup = settings.stages[stageId].setup;

  return (
    <tr>
      <td className="pe-3 font-medium">{name}</td>
      {setup.map(({ length }, idx) => {
        const maxValue = setup.length - 1 === idx ? 2 : 4;
        const bot = setup[idx - 1] ?? 0;
        const top = setup[idx] + bot;
        return (
          <InputList
            onKeyDown={onKeyDown}
            focusableId={focusableId}
            elements={elements}
            key={idx}
            length={length}
            maxValue={maxValue}
            values={values.slice(bot, top)}
            playerId={playerId}
            stageId={stageId}
            isLastList={setup.length - 1 === idx}
          />
        );
      })}

      <td className="p-1">
        <input
          className="w-8 p-1 rounded-sm text-center bg-white text-black font-bold"
          type="text"
          disabled
          value={stageTotal}
        />
      </td>
    </tr>
  );
}
