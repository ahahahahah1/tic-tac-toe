import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
} from 'recoil';

import { calculateWinner } from './functions';


export default function Game() {
    
  const turnCounter=atom({
    key:'turnCount',
    default:0,
  })
  const turnController=atom({
    key:'gameManager',
    default:true,
  })
  const storePreviousMoves=atom({
    key:'gameHistoryManager',
    default:[["", "", "", "", "", "", "", "", ""]],
  })

  const [turnNumber, setTurnNumber] = useRecoilState(turnCounter);
  const [isXNext, setNextPlayer] = useRecoilState(turnController);
  const [history, setHistory] = useRecoilState(storePreviousMoves);

  const currentBoard = history[turnNumber];
  const winner = calculateWinner(currentBoard);
  const player = isXNext ? "X" : "O";

  function handleClick(turn: number) {
    const newHistory = history.slice(0, turnNumber + 1);
    const currentTurn = newHistory[turnNumber];
    const currentBoard = [...currentTurn];
    
    if (!(winner || currentBoard[turn])) {
    
      currentBoard[turn] = player;
      setHistory([...newHistory, currentBoard]);
      setTurnNumber(newHistory.length);
      setNextPlayer(!isXNext);
    }
  }
  
  function jumpToPreviousMove (turn: number) {
    setTurnNumber(turn);
    setNextPlayer(turn % 2 === 0);
  }




  return (
    <div>
      <div className="gameBoard">
        {history[turnNumber].map((box, i) => (
          <button key={i} value={box} onClick={() =>handleClick(i)}> {box} </button>
        ))}
      </div>

      <div className="gameControls">
        {history.map((_step, turn) => {
          const message = turn ? `Go to move #${turn}` : "Go to Start";
          return (
          <li key={turn}>
            <button onClick={() => jumpToPreviousMove(turn)}>{message}</button>
          </li>
          );
        })}

        <p>Next Player : {player}</p>
        <p>{winner ? "Winner :{winner}" : ""}</p>
      </div>
    </div>
  )
}