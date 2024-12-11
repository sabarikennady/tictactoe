import { useState } from 'react';
import './Game.css';

function Square({ value, onClick }) {
  let squareClass = "square";
  if (value === 'X') {
    squareClass += " x-mark";
  } else if (value === 'O') {
    squareClass += " o-mark";
  }

  return (
    <button className={squareClass} onClick={onClick}>
      {value}
    </button>
  );
}

function Board({ squares, onSquareClick }) {
  return (
    <div className="board">
      {[0, 1, 2].map((row) => (
        <div key={row} className="board-row">
          {[0, 1, 2].map((col) => (
            <Square
              key={row * 3 + col}
              value={squares[row * 3 + col]}
              onClick={() => onSquareClick(row * 3 + col)}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default function Game() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  function handleSquareClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  function handleRestart() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <div className="game-container">
      <div className="game">
        <div className="game-board">
          <Board squares={squares} onSquareClick={handleSquareClick} />
        </div>
        <div className="game-info">
          <div className="status">{status}</div>
          <button className="restart-button" onClick={handleRestart}>Restart</button>
        </div>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
