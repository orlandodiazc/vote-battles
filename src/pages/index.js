import Image from "next/image";
import { Inter } from "next/font/google";
import { useRef, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [values, setValue] = useState([
    { id: 0, value: "" },
    { id: 1, value: "" },
    { id: 2, value: "" },
  ]);

  function setVote(id, newValue) {
    setValue(
      values.map((value) => {
        if (value.id === id) return { id, value: newValue };
        return value;
      })
    );
  }
  return (
    <main
      className={`h-screen grid place-content-center bg-red-500 ${inter.className}`}
    >
      <section className="space-x-1">
        {values.map(({ id, value }) => {
          return <Input key={id} id={id} voteValue={value} setVote={setVote} />;
        })}
        Total: {values.reduce((acc, curr) => acc + Number(curr.value), 0)}
      </section>
    </main>
  );
}

function Input({ setVote, id, voteValue }) {
  function handleKeyDown(ev) {
    const code = ev.keyCode;
    if (code === 8 || code === 46) {
      setVote(id, "");
      return;
    }
    if (code === 32 || code === 110) {
      if (voteValue.slice(-2) === ".5") return;
      setVote(id, `${voteValue ? voteValue : "0"}.5`);
      return;
    }
  }
  function handleChange(ev) {
    const currentValue = ev.target.value;
    const notValid =
      currentValue.length > 3 ||
      Number(currentValue) > 9 ||
      Number(currentValue) < 0;
    if (notValid) return;
    setVote(id, currentValue);
  }
  return (
    <input
      type="number"
      value={voteValue}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      step="0.5"
      className="w-16 p-1 rounded-sm"
    ></input>
  );
}
