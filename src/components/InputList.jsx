import Input from "./Input";

export default function InputList({ maxValue, values, setVote }) {
  return (
    <div className="space-x-1">
      {values.map(({ id, value }) => (
        <Input
          key={id}
          id={id}
          voteValue={value}
          setVote={setVote}
          maxValue={maxValue}
        />
      ))}
    </div>
  );
}
