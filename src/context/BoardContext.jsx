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
    case "SET_STAGE_TOTAL":
      return state - 1;
    case "SET_PLAYER_TOTAL":
      return 0;
    default:
      return state;
  }
};

function createInputList() {
  return [...new Array(9)].map((val, idx) => ({ id: idx, value: "" }));
}

const BoardContext = createContext();
const initialValue = [
  {
    name: "Chuty",
    total: 0,
    stages: [
      {
        name: "Incremental",
        total: 0,
        setup: [6],
        inputList: createInputList(),
      },
      { name: "Random", total: 0, setup: [6], inputList: createInputList() },
      {
        name: "Libre 1",
        total: 0,
        setup: [6],
        inputList: createInputList(),
      },
      {
        name: "Libre 2",
        total: 0,
        setup: [6],
        inputList: createInputList(),
      },
      { name: "Deluxe", total: 0, setup: [6], inputList: createInputList() },
    ],
  },
  {
    name: "Bnet",
    total: 0,
    stages: [
      {
        name: "Incremental",
        total: 0,
        setup: [6],
        inputList: createInputList(),
      },
      { name: "Random", total: 0, setup: [6], inputList: createInputList() },
      {
        name: "Libre 1",
        total: 0,
        setup: [6],
        inputList: createInputList(),
      },
      {
        name: "Libre 2",
        total: 0,
        setup: [6],
        inputList: createInputList(),
      },
      { name: "Deluxe", total: 0, setup: [6], inputList: createInputList() },
    ],
  },
];

export const BoardContextProvider = (props) => {
  const [board, boardDispatch] = useReducer(boardReducer, initialValue);
  function setVote(playerId, stageId, inputId, value) {
    boardDispatch({
      type: "SET_VOTE",
      payload: { playerId, stageId, inputId, value },
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
