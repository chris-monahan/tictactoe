import React from 'react';
import Board from './Board';
import Sidebar from './Sidebar';
import GridState from '../GridState';

class Game extends React.Component {

    constructor(props){
      super(props);

      this.gridStateTemplate = new GridState(window.config.board.sizeX,window.config.board.sizeY);

      this.state = {
        history: [{
          squares: this.gridStateTemplate.getGridData(),
        }],
        currentGridState:this.gridStateTemplate,
        stepNumber: 0,
        xIsNext: true,
      }
    }
  
    handleClick(pointX, pointY, squareIndex){
      const history = this.state.history.slice(0, this.state.stepNumber + 1);  
      const currentGridState = this.state.currentGridState;

      if(currentGridState.getSquareVal(pointX,pointY) !== null){
        return;
      }

      if(checkWinner(currentGridState)){
        return;
      }
  
      currentGridState.setSquareVal(pointX, pointY, this.state.xIsNext ? 'X' : 'O');
      this.setState({
        history: history.concat([{
          squares: currentGridState.getGridData(),
        }]),
        currentGridState:currentGridState,
        stepNumber: history.length,
        xIsNext: !this.state.xIsNext,
      });
    }
  
    jumpTo(step){
      const prevHistory = this.state.history.slice(0, step + 1)
      const targetStep = prevHistory[prevHistory.length - 1]
      const stepStateData = targetStep.squares;
      const currentGridState = this.state.currentGridState;

      currentGridState.setGridData(stepStateData);
      this.setState({
        stepNumber: step,
        xIsNext: (step % 2) === 0,
        currentGridState: currentGridState,
      })
    }
  
    render() {
      const history = this.state.history;
      const currentGridState = this.state.currentGridState;

      const winner = checkWinner(currentGridState);
  
      const moves = history.map((step, move) => {
        const desc = move ?
        'Go to move#' + move :
        'Go to game start';
        return(
          <li key={move}>
            <button onClick={() => this.jumpTo(move)}>{desc}</button>
          </li>
        );
      });
      let status;
  
      if (winner) {      
        status = 'Winner: ' + winner;    
      } else {      
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');    
      }
  
      return (
        <div className="game">
          <div className="game-board" id="game-board">
            <Board 
              squares={currentGridState}
              onClick={(pointX, pointY, squareIndex) => this.handleClick(pointX, pointY, squareIndex)}
              />

          </div>
          <div className="game-info">
            <Sidebar 
              status={status}
              moves={moves} />
          </div>
        </div>
      );
    }
  }


  function checkWinner(gridState) {
    const sequences = gridState.findContinuousSequences(window.config.board.sizeX);
    for(let i = 0; i < sequences.length; i++){
      if(sequences[i].length > 0){
        return sequences[i][0][0];
      }
    }
    return null;
  }


  export default Game;
