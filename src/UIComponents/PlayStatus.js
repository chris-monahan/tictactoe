import React from 'react';
import checkWinner from "../checkWinner.fn"

function PlayStatus({ gridState, xIsNext, onReset }) {

    const winner = checkWinner(gridState);
    let status;
    if (winner) {      
        status = winner + " is the winner!";    
      } else if(gridState.findEmptySquares().length === 0) {
        status = "It's a draw!"
      }
        else{      
        status = 'Next player: ' + (xIsNext ? 'X' : 'O');    
      }

      return <div id="playStatus">
        <hr />
            <span className="status-msg">{status}</span>
            <button id="reset-btn" onClick={()=>{onReset()}}><img alt="reset" src="reset.svg"></img></button>
        </div>    
  }

  export default PlayStatus;