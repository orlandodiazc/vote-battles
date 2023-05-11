import { useSetVote } from "@/context/BoardContext";

export default function Input({
  id,
  maxValue,
  playerId,
  stageId,
  voteValue,
  isLastInput,
  isLastList,
  elements,
  onKeyDown,
  focusableId,
}) {
  const setVote = useSetVote();
  function handleKeyDown(ev) {
    const code = ev.keyCode;
    if (code === 69 || code === 109 || code === 107) ev.preventDefault();
    if (code === 8 || code === 46) {
      ev.preventDefault();
      setVote(playerId, stageId, id, "");
    }
    if (code === 32 || code === 110) {
      ev.preventDefault();
      if (voteValue.slice(-2) === ".5" || voteValue === "4") return;
      setVote(playerId, stageId, id, `${voteValue ? voteValue : "0"}.5`);
    }
    onKeyDown(ev);
  }

  function handleChange(ev) {
    let currentValue = ev.target.value;
    if (currentValue.length >= 2 && currentValue.slice(-2) !== ".5") {
      currentValue = currentValue.slice(-1);
    }
    if (currentValue > maxValue) currentValue = maxValue;
    if (currentValue < 0) currentValue = 0;
    setVote(playerId, stageId, id, currentValue);
  }
  return (
    <td
      className={`p-0.5 text-black font-semibold ${
        isLastList ? "px-[6px]" : ""
      } `}
    >
      <input
        type="number"
        value={voteValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        step="0.5"
        className={`w-8 h-8 rounded-sm text-center ${
          isLastInput && !isLastList ? "me-4" : ""
        }`}
        style={{ color: "black" }}
        ref={(element) => {
          if (element) {
            elements.current.set(playerId.toString() + id.toString(), element);
          } else {
            elements.current.delete(playerId.toString() + id.toString());
          }
        }}
        tabIndex={playerId.toString() + id.toString() === focusableId ? 0 : -1}
        data-roving-tabindex-item
      />
    </td>
  );
}
