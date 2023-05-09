import { useCallback, useState, useEffect } from "react";

export default function useInputFocus(size) {
  const [currentFocus, setCurrentFocus] = useState({ playerId: 0, id: null });

  const handleKeyDown = useCallback(
    (e) => {
      if (e.keyCode === 39) {
        e.preventDefault();
        if (currentFocus.id !== size - 1) {
          setCurrentFocus({ ...currentFocus, id: currentFocus.id + 1 });
        } else if (currentFocus.playerId === 0) {
          setCurrentFocus({ playerId: 1, id: 0 });
        }
      } else if (e.keyCode === 37) {
        console.log(currentFocus);
        e.preventDefault();
        if (currentFocus.id !== 0) {
          setCurrentFocus({ ...currentFocus, id: currentFocus.id - 1 });
        } else if (currentFocus.playerId === 1) {
          setCurrentFocus({ playerId: 0, id: size - 1 });
        }
      }
    },
    [size, currentFocus, setCurrentFocus]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown, false);
    return () => {
      document.removeEventListener("keydown", handleKeyDown, false);
    };
  }, [handleKeyDown]);

  return [currentFocus, setCurrentFocus];
}
