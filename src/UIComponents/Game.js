import React from 'react';
import Board from './Board';
import Sidebar from './Sidebar';
import GridState from '../GridState';
import PlayStatus from './PlayStatus'
import Score from './Score';
import config from '../config';
import checkWinner from '../checkWinner.fn';

class Game extends React.Component {

    constructor(props){
      super(props);

      this.gridStateTemplate = new GridState(props.sizeX, props.sizeY);

      this.state = {
        history: [{
          squares: this.gridStateTemplate.getGridData(),
        }],
        currentGridState:this.gridStateTemplate,
        stepNumber: 0,
        xIsNext: true,
        //the sidebar opens over the page, so it starts hidden to keep out of the way
        sidebarExpanded: false,
        score: { X: 0, O: 0, draws: 0 },
        //each game counts towards the score once, when it first finishes
        gameScored: false,
      }
    }

    toggleSidebar(){
      this.setState((state) => ({
        sidebarExpanded: !state.sidebarExpanded,
      }));
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
      this.scoreIfFinished(currentGridState);
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

    scoreIfFinished(gridState){
      if(this.state.gameScored){
        return;
      }

      const winner = checkWinner(gridState);
      if(winner || gridState.findEmptySquares().length === 0){
        const result = winner ? winner : "draws";
        this.setState((state) => ({
          score: { ...state.score, [result]: state.score[result] + 1 },
          gameScored: true,
        }));
      }
    }

    newGame(){
      const currentGridState = this.state.currentGridState;

      //the first step in the history is always the empty board
      currentGridState.setGridData(this.state.history[0].squares);
      this.setState({
        history: [{
          squares: currentGridState.getGridData(),
        }],
        currentGridState: currentGridState,
        stepNumber: 0,
        xIsNext: true,
        gameScored: false,
      })
    }
  
    render() {
      const history = this.state.history;
      const currentGridState = this.state.currentGridState;
  
      return (
        <div className="game" id="game">
          <div className="game-board-container" id="game-board-container">
            <Board 
              gridState={currentGridState}
              onClick={(pointX, pointY, squareIndex) => this.handleClick(pointX, pointY, squareIndex)}
              />
            <PlayStatus
              gridState={currentGridState}
              onReset={() => this.newGame()}
              onPlayAgain={() => this.newGame()}
              xIsNext={this.state.xIsNext}
              />  
            <Score score={this.state.score} />

          </div>
          {config.sidebar.enabled && 
            <Sidebar 
              components={config.sidebar.components}
              expanded={this.state.sidebarExpanded}
              onToggle={() => this.toggleSidebar()}
              history={history}
              stepNumber={this.state.stepNumber}
              onJump={(step) => this.jumpTo(step)}/> }
        </div>
      );
    }
  }


  


  export default Game;
