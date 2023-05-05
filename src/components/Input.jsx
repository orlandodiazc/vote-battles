export default function Input({ setVote, id, voteValue, maxValue }) {
  function handleKeyDown(ev) {
    const code = ev.keyCode;
    if (code === 69 || code === 109 || code === 107) ev.preventDefault();
    if (code === 8 || code === 46) {
      ev.preventDefault();
      setVote(id, "");
    }
    if (code === 32 || code === 110) {
      ev.preventDefault();
      if (voteValue.slice(-2) === ".5" || voteValue === "4") return;
      setVote(id, `${voteValue ? voteValue : "0"}.5`);
    }
  }
  function handleChange(ev) {
    let currentValue = ev.target.value;
    if (currentValue.length >= 2 && currentValue.slice(-2) !== ".5") {
      currentValue = currentValue.slice(-1);
    }
    if (currentValue > maxValue) currentValue = 4;
    if (currentValue < 0) currentValue = 0;
    setVote(id, currentValue);
  }
  return (
    <input
      type="number"
      value={voteValue}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      step="0.5"
      className="w-8 p-1 rounded-sm text-center"
    ></input>
  );
}
