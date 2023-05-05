import { useBoardState } from "@/context/BoardContext";
import InputList from "./InputList";

export function Player({ name, playerId, stageId }) {
  const board = useBoardState();
  // const [values, setValue] = useState(
  //   [...new Array(9)].map((val, idx) => ({ id: idx, value: "" }))
  // );
  // function setVote(id, newValue) {
  //   setValue(
  //     values.map((value) => {
  //       if (value.id === id) return { id, value: newValue };
  //       return value;
  //     })
  //   );
  // }
  // const playerTotal = values.reduce((acc, curr) => acc + Number(curr.value), 0);
  if (!board) return null;
  const values = board[playerId].stages[stageId].inputList;
  return (
    <div className="flex gap-3">
      <span className="flex-1 flex items-center">{name}</span>
      <InputList
        length={6}
        maxValue={4}
        values={values.slice(0, 6)}
        playerId={playerId}
        stageId={stageId}
      />
      <InputList
        length={3}
        maxValue={2}
        values={values.slice(6)}
        playerId={playerId}
        stageId={stageId}
      />
      <span className="flex items-center bg-white w-8 rounded-sm justify-center">
        {/* {playerTotal} */} h
      </span>
    </div>
  );
}
