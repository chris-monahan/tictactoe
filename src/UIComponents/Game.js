import React from 'react';
import Board from './Board';
import Sidebar from './Sidebar';
import GridState from '../GridState';
import PlayStatus from './PlayStatus'
import config from '../config';
import checkWinner from '../checkWinner.fn';

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
  
      return (
        <div className={`game ${config.sidebar.enabled ? "withSidebar" : ""}`} id="game">
          <div className="game-board-container" id="game-board-container">
            <Board 
              gridState={currentGridState}
              onClick={(pointX, pointY, squareIndex) => this.handleClick(pointX, pointY, squareIndex)}
              />
            <PlayStatus
              gridState={currentGridState}
              onReset={() => this.jumpTo(0)}
              xIsNext={this.state.xIsNext}
              />  

          </div>
          {config.sidebar.enabled && 
          <div className="game-info">
            <Sidebar 
              history={history}
              gridState={currentGridState}/>
          </div> }
        </div>
      );
    }
  }


  


  export default Game;
