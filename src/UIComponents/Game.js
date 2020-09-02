import React from 'react';
import Board from './Board';
import Sidebar from './Sidebar';

class Game extends React.Component {

    constructor(props){
      super(props);

      let gridArray = Array(props.sizeY).fill(null);
      for(let i = 0; i < props.sizeY; i++){
        gridArray[i] = Array(props.sizeX).fill(null);
      }

      this.gridArrayTemplate = gridArray;

      this.state = {
        history: [{
          squares: this.gridArrayTemplate,
        }],
        stepNumber: 0,
        xIsNext: true,
      }
    }
  
    handleClick(pointX, pointY, squareIndex){
      const history = this.state.history.slice(0, this.state.stepNumber + 1);    
      const current = history[history.length - 1];    
      const squares = current.squares.slice().map((value) =>{
        return value.slice()
      });

      const flatSquares = squares.reduce((acc, cur) => {
        return acc.concat(cur)
      },[]);

      if(checkWinner(current) || flatSquares[squareIndex]) {
        return;
      }
  
      squares[pointY][pointX] =  this.state.xIsNext ? 'X' : 'O';
      this.setState({
        history: history.concat([{
          squares: squares,
        }]),
        stepNumber: history.length,
        xIsNext: !this.state.xIsNext,
      });
    }
  
    jumpTo(step){
      this.setState({
        stepNumber: step,
        xIsNext: (step % 2) === 0,
      })
    }
  
    render() {
      const history = this.state.history;
      const current = history[this.state.stepNumber];

      const winner = checkWinner(current);
  
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
          <div className="game-board">
            <Board 
              squares={current.squares}
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


  function checkWinner(squares) {
    
  }


  function getGridAdjacents(coords){
    
  }


  export default Game;
