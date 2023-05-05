import * as Tabs from "@radix-ui/react-tabs";
import { Player } from "./Player";
import { useBoardState } from "@/context/BoardContext";

export default function Stages() {
  const board = useBoardState();
  return (
    <Tabs.Root className="flex flex-col" defaultValue="Incremental">
      <Tabs.List
        className="flex flex-shrink-0"
        aria-label="Selecciona la ronda"
      >
        {board[0].stages.map((stage) => (
          <Tabs.Trigger
            className="flex flex-1 justify-center items-center px-1 data-[state=active]:bg-violet-500"
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
            <Player name={board[0].name} playerId={0} stageId={idx} />
            <Player name={board[1].name} playerId={1} stageId={idx} />
          </div>
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
}
