import * as Tabs from "@radix-ui/react-tabs";
import { Player } from "./Player";
import { useBoardState } from "@/context/BoardContext";

export default function Stages() {
  const board = useBoardState();

  return (
    <Tabs.Root className="flex flex-col mb-2" defaultValue="Incremental">
      <Tabs.List
        className="flex gap-2 justify-center mb-2"
        aria-label="Selecciona la ronda"
      >
        {board[0].stages.map((stage) => (
          <Tabs.Trigger
            className="grid place-content-center px-2 py-1 rounded-sm data-[state=active]:bg-violet-500"
            value={stage.name}
            key={stage.name}
          >
            {stage.name}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      {board[0].stages.map((stage, idx) => (
        <Tabs.Content key={idx} className="flex-grow-1 p-1" value={stage.name}>
          <div className="grid gap-1 items-center">
            <div className="flex gap-2 text-[10px] justify-end me-[4px]">
              <span>Tecnicas</span>
              <span>Flow</span>
              <span className="me-1">Escena</span>
              <span>Total</span>
            </div>
            <Player
              name={board[0].name}
              playerId={0}
              stageId={idx}
              setup={stage.setup}
            />
            <Player
              name={board[1].name}
              playerId={1}
              stageId={idx}
              setup={stage.setup}
            />
          </div>
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
}
