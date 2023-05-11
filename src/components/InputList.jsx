import Input from "./Input";

export default function InputList({
  maxValue,
  values,
  playerId,
  stageId,
  isLastList,
  elements,
  onKeyDown,
  focusableId,
}) {
  return (
    <>
      {values.map(({ id, value }, idx) => (
        <Input
          onKeyDown={onKeyDown}
          focusableId={focusableId}
          elements={elements}
          key={id}
          id={id}
          voteValue={value}
          maxValue={maxValue}
          playerId={playerId}
          stageId={stageId}
          isLastInput={values.length - 1 === idx}
          isLastList={isLastList}
        />
      ))}
    </>
  );
}
