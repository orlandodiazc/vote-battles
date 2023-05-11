import * as Tabs from "@radix-ui/react-tabs";
import { Player } from "./Player";
import { useBoardState } from "@/context/BoardContext";
import { useRef, useState } from "react";

export default function Stages() {
  const { scores, settings } = useBoardState();
  const playersTotal = scores.map((player) =>
    player.reduce(
      (acc, stage) =>
        acc + stage.reduce((acc, input) => acc + Number(input.value), 0),
      0
    )
  );

  const [focusableId, setFocusableId] = useState("00");
  const elements = useRef(new Map());
  const ref = useRef(null);

  function onKeyDown(e) {
    if (e.keyCode === 39 || e.keyCode === 37 || e.keyCode === 9) {
      e.preventDefault();
      if (!ref.current) return;
      const readElements = Array.from(
        ref.current.querySelectorAll("[data-roving-tabindex-item]")
      );
      const items = Array.from(elements.current)
        .sort((a, b) => readElements.indexOf(a[1]) - readElements.indexOf(b[1]))
        .map(([id, element]) => ({ id, element }));
      const currentIndex = items.findIndex(
        (item) => item.element === e.currentTarget
      );
      let nextItem = null;
      if (e.keyCode === 39 || e.keyCode === 9) {
        nextItem = items.at(
          currentIndex === items.length - 1 ? 0 : currentIndex + 1
        );
      } else if (e.keyCode === 37) {
        nextItem = items.at(
          currentIndex === 0 ? items.length - 1 : currentIndex - 1
        );
      }
      if (nextItem.id != null) {
        nextItem.element.focus();
        setFocusableId(nextItem.id);
      }
    }
  }
  return (
    <Tabs.Root className="flex flex-col pt-4" defaultValue="Incremental">
      {settings.stages.map(({ name }, stageIdx) => (
        <Tabs.Content
          className="grid place-content-center relative"
          key={stageIdx}
          value={name}
          tabIndex={-1}
        >
          <h2 className="absolute -top-4 left-16 text-violet-500 font-bold">
            {name}
          </h2>
          <table ref={ref}>
            <thead>
              <tr className="text-[10px] text-center">
                <td
                  colSpan={
                    settings.stages[stageIdx].setup.reduce(
                      (acc, curr) => acc + curr
                    ) - 2
                  }
                ></td>
                <td>Tecnicas</td>
                <td>Flow</td>
                <td>Escena</td>
                <td>Total</td>
              </tr>
            </thead>
            <tbody>
              {stageIdx % 2 === 0 ? (
                <>
                  <Player
                    playerId={0}
                    stageId={stageIdx}
                    onKeyDown={onKeyDown}
                    focusableId={focusableId}
                    elements={elements}
                  />
                  <Player
                    playerId={1}
                    stageId={stageIdx}
                    onKeyDown={onKeyDown}
                    focusableId={focusableId}
                    elements={elements}
                  />
                </>
              ) : (
                <>
                  <Player
                    playerId={1}
                    stageId={stageIdx}
                    onKeyDown={onKeyDown}
                    focusableId={focusableId}
                    elements={elements}
                  />
                  <Player
                    playerId={0}
                    stageId={stageIdx}
                    onKeyDown={onKeyDown}
                    focusableId={focusableId}
                    elements={elements}
                  />
                </>
              )}
            </tbody>
          </table>
        </Tabs.Content>
      ))}
      <div className="flex gap-1 justify-center text-sm my-2">
        <span className="text-emerald-700 font-bold">TOTAL</span>{" "}
        {settings.playersName[0]} {playersTotal[0]} - {settings.playersName[1]}{" "}
        {playersTotal[1]}
      </div>
      <Tabs.List
        className="flex gap-2 justify-center"
        aria-label="Selecciona la ronda"
        tabIndex={-1}
      >
        {settings.stages.map(({ name }, idx) => (
          <Tabs.Trigger
            className="grid place-content-center px-2 py-1 rounded-full w-10 h-10 data-[state=active]:bg-violet-500"
            value={name}
            key={name}
          >
            {idx}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
    </Tabs.Root>
  );
}
