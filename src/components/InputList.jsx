import useInputFocus from "@/hooks/useInputFocus";
import Input from "./Input";

export default function InputList({ maxValue, values, playerId, stageId }) {
  const [focus, setFocus] = useInputFocus(9);
  return (
    <div className="space-x-1 text-black">
      {values.map(({ id, value }, idx) => (
        <Input
          key={id}
          focus={focus.id === id && focus.playerId === playerId}
          setFocus={setFocus}
          id={id}
          voteValue={value}
          maxValue={maxValue}
          playerId={playerId}
          stageId={stageId}
        />
      ))}
    </div>
  );
}
