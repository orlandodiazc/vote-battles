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
              inputList: stage.inputList.map((input, idx) => {
                if (idx !== payload.inputId) return input;
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

const currentStages = ["Incremental", "Random", "Libre 1", "Libre 2", "Deluxe"];
const playerNames = ["Chuty", "Bnet"];

function createInputList() {
  return [...new Array(9)].map((val, idx) => ({ id: idx, value: "" }));
}

function Stage(name, setup) {
  return { name, setup, total: 0, inputList: createInputList() };
}

function Player(name, stages) {
  return { name, stages, total: 0 };
}

const BoardContext = createContext();
const stages = currentStages.map((stageName) => Stage(stageName, [6]));
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
