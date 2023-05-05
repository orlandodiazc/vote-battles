import { useState } from "react";
import InputList from "./InputList";

export default function Board() {
  return (
    <section className="grid gap-1 items-center">
      <Player name="1 player" id={0} />
      <Player name="2 player" id={1} />
    </section>
  );
}

function Player({ name }) {
  const [values, setValue] = useState(
    [...new Array(9)].map((val, idx) => ({ id: idx, value: "" }))
  );
  function setVote(id, newValue) {
    setValue(
      values.map((value) => {
        if (value.id === id) return { id, value: newValue };
        return value;
      })
    );
  }
  const playerTotal = values.reduce((acc, curr) => acc + Number(curr.value), 0);
  return (
    <div className="flex gap-4 items-center">
      <span className="flex-1">{name}</span>
      <div className="flex gap-3">
        <InputList
          length={6}
          maxValue={4}
          values={values.slice(0, 6)}
          setVote={setVote}
        />
        <InputList
          length={3}
          maxValue={2}
          values={values.slice(6)}
          setVote={setVote}
        />
        <input
          className="w-9 text-center"
          type="number"
          value={playerTotal}
          readOnly
        />
      </div>
    </div>
  );
}
