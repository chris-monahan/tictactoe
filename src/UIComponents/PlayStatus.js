import React from 'react';
import checkWinner from "../checkWinner.fn"
import PieceIcon from './PieceIcon';

function PlayStatus({ gridState, xIsNext, onReset, onPlayAgain }) {

    const winner = checkWinner(gridState);
    const gameOver = winner || gridState.findEmptySquares().length === 0;

    //Both states share one fixed-height panel, so switching between them moves nothing
    //(the board was sized while the game was on)
    if (gameOver) {
      return <div id="playStatus">
          <hr />
          <div className="status-panel game-over">
            <span className={"status-msg status-msg-" + (winner ? winner : "draw")}>{winner ? <><PieceIcon piece={winner} /> is the winner!</> : "It's a draw!"}</span>
            <button className={"play-again-btn play-again-" + (winner ? winner : "draw")} onClick={()=>{onPlayAgain()}}>Play again?</button>
          </div>
        </div>
    }

    return <div id="playStatus">
        <hr />
        <div className="status-panel">
          <span className="status-msg">Next player: <PieceIcon piece={xIsNext ? 'X' : 'O'} /></span>
          <button id="reset-btn" onClick={()=>{onReset()}}><img alt="reset" src="reset.svg"></img></button>
        </div>
      </div>
  }

  export default PlayStatus;
