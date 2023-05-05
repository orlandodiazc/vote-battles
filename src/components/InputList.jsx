import Input from "./Input";

export default function InputList({ maxValue, values, playerId, stageId }) {
  return (
    <div className="space-x-1 text-black">
      {values.map(({ id, value }) => (
        <Input
          key={id}
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
