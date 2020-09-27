import React from 'react';
import checkWinner from "../checkWinner.fn"

class PlayStatus extends React.Component {

    render() {
      const winner = checkWinner(this.props.gridState);
      let status;
      if (winner) {      
        status = winner + "is the winner!";    
      } else if(this.props.gridState.findEmptySquares().length === 0) {
        status = "It's a draw!"
      }
        else{      
        status = 'Next player: ' + (this.props.xIsNext ? 'X' : 'O');    
      }

      return <div id="playStatus">
        <hr />
            <span className="status-msg">{status}</span>
            <button id="reset-btn" onClick={()=>{this.props.onReset()}}><img alt="reset" src="reset.svg"></img></button>
        </div>    
    }
  }

  export default PlayStatus;