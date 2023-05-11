import { createContext, useContext, useReducer } from "react";

const boardReducer = (state, action) => {
  const payload = action.payload;
  console.log(payload);
  switch (action.type) {
    case "SET_VOTE":
      return {
        ...state,
        scores: state.scores.map((player, idx) => {
          if (idx !== payload.playerId) return player;
          return player.map((stage, idx) => {
            if (idx !== payload.stageId) return stage;
            return stage.map((input, idx) => {
              if (idx !== payload.inputId) return input;
              return { ...input, value: payload.value };
            });
          });
        }),
      };

    default:
      return state;
  }
};

const settings = {
  stages: [
    { name: "Incremental", setup: [6, 3] },
    { name: "Random", setup: [6, 3] },
    { name: "Libre 1", setup: [6, 3] },
    { name: "Libre 2", setup: [6, 3] },
    { name: "Deluxe", setup: [2, 5, 3] },
  ],
  playersName: ["Chuty", "Bnet"],
};

function createInputList(setup) {
  const length = setup.reduce((acc, curr) => acc + curr, 0);
  return [...new Array(length)].map((curr, idx) => ({ id: idx, value: "" }));
}

const scores = Array(2).fill([
  ...settings.stages.map(({ setup }) => createInputList(setup)),
]);

const initialValue = { settings, scores };
const BoardContext = createContext();

export const BoardContextProvider = (props) => {
  const [board, boardDispatch] = useReducer(boardReducer, initialValue);
  function setVote(playerId, stageId, inputId, value) {
    boardDispatch({
      type: "SET_VOTE",
      payload: { playerId, stageId, inputId, value },
    });
    boardDispatch({
      type: "SET_PLAYER_STAGE_TOTAL",
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
