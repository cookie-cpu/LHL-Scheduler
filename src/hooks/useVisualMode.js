import { useState } from 'react'

export default function useVisualMode(initialmode) {

  const [mode, setMode] = useState(initialmode);
  const [history, setHistory] = useState([initialmode])


  function transition(newmode, replace = false) {
    if (replace) {
      history.pop();
    }
    setMode(newmode)

    history.push(newmode);

    setHistory(history);
  }

  function back() {
    if (history.length > 1){
      history.pop();

      setHistory(history);

      setMode(history[history.length - 1]);

    } else {
      setMode(mode);
    }
   
  }


  return { mode, transition, back };

};
