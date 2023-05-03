import Image from "next/image";
import { Inter } from "next/font/google";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [values, setValue] = useState([
    { id: 0, value: 0 },
    { id: 1, value: 0 },
    { id: 2, value: 0 },
  ]);
  const ids = [0, 1, 2];
  console.log(values);
  function setVote(id, newValue) {
    console.log("called");
    setValue(
      values.map((value) => {
        console.log(id, value.id);
        if (value.id === id) return { id, value: Number(newValue) };
        return value;
      })
    );
  }
  return (
    <main
      className={`h-screen grid place-content-center bg-red-500 ${inter.className}`}
    >
      <section className="space-x-1">
        {ids.map((id) => {
          return <Input key={id} id={id} setVote={setVote} />;
        })}
        Total: {values.reduce((acc, curr) => acc + curr.value, 0)}
      </section>
    </main>
  );
}

function Input({ setVote, id }) {
  return (
    <input
      type="number"
      onChange={(ev) => {
        let value = ev.target.value;
        if (ev.target.value > 9) {
          value = 9;
        }
        setVote(id, value);
      }}
      className="w-8 p-1 rounded-sm"
    ></input>
  );
}
