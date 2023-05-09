import { createContext, useContext, useReducer } from "react";

const boardReducer = (state, action) => {
  const payload = action.payload;
  switch (action.type) {
    case "SET_VOTE":
      return state.map((player, idx) => {
        if (idx !== payload.playerId) return player;
        return {
          ...player,
          stages: player.stages.map((stage, idx) => {
            if (idx !== payload.stageId) return stage;
            return {
              ...stage,
              inputList: stage.inputList.map((input) => {
                if (input.id !== payload.inputId) return input;
                return { ...input, value: payload.value };
              }),
            };
          }),
        };
      });
    case "SET_PLAYER_STAGE_TOTAL":
      return state.map((player, idx) => {
        if (idx !== payload.playerId) return player;
        return {
          ...player,
          stages: player.stages.map((stage, idx) => {
            if (idx !== payload.stageId) return stage;
            return {
              ...stage,
              total: stage.inputList.reduce(
                (acc, curr) => acc + Number(curr.value),
                0
              ),
            };
          }),
        };
      });
    case "SET_PLAYER_TOTAL":
      return state.map((player, idx) => {
        if (idx !== payload.playerId) return player;
        return {
          ...player,
          total: player.stages.reduce((acc, curr) => acc + curr.total, 0),
        };
      });
    default:
      return state;
  }
};

const currentStages = [
  { name: "Incremental", setup: [6] },
  { name: "Random", setup: [6] },
  { name: "Libre 1", setup: [6] },
  { name: "Libre 2", setup: [6] },
  { name: "Deluxe", setup: [2, 5] },
];
const playerNames = ["Chuty", "Bnet"];

function createInputList(setup) {
  const length = setup.reduce((acc, curr) => acc + curr, 0) + 3;
  return [...new Array(length)].map((curr, idx) => ({ id: idx, value: "" }));
}

function Stage(name, setup) {
  return { name, setup, total: 0, inputList: createInputList(setup) };
}

function Player(name, stages) {
  return { name, stages, total: 0 };
}

const BoardContext = createContext();
const stages = currentStages.map(({ name, setup }) => Stage(name, setup));
const initialValue = playerNames.map((name) => Player(name, stages));

export const BoardContextProvider = (props) => {
  const [board, boardDispatch] = useReducer(boardReducer, initialValue);
  function setVote(playerId, stageId, inputId, value) {
    boardDispatch({
      type: "SET_VOTE",
      payload: { playerId, stageId, inputId, value },
    });
    boardDispatch({
      type: "SET_PLAYER_STAGE_TOTAL",
      payload: { playerId, stageId },
    });
    boardDispatch({
      type: "SET_PLAYER_TOTAL",
      payload: { playerId },
    });
  }

  return (
    <BoardContext.Provider value={[board, setVote]}>
      {props.children}
    </BoardContext.Provider>
  );
};

export const useBoardState = () => {
  const counterAndDispatch = useContext(BoardContext);
  return counterAndDispatch[0];
};

export const useSetVote = () => {
  const counterAndDispatch = useContext(BoardContext);
  return counterAndDispatch[1];
};

export default BoardContext;
