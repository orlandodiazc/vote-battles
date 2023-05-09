import { useSetVote } from "@/context/BoardContext";
import { useCallback, useEffect, useRef } from "react";

export default function Input({
  id,
  maxValue,
  playerId,
  stageId,
  voteValue,
  focus,
  setFocus,
}) {
  const setVote = useSetVote();

  const ref = useRef(null);

  useEffect(() => {
    if (focus) {
      ref.current.focus();
    }
  }, [focus]);

  const handleSelect = useCallback(() => {
    console.log({ playerId, id });
    setFocus({ playerId, id });
  }, [id, setFocus]);

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
    handleSelect();
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
    <input
      type="number"
      tabIndex={focus ? 0 : -1}
      ref={ref}
      value={voteValue}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      onClick={handleSelect}
      step="0.5"
      className="w-8 p-1 rounded-sm text-center"
    ></input>
  );
}
