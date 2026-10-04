import React from 'react';
import { ReactComponent as Cross } from '../cross.svg';
import { ReactComponent as Nought } from '../nought.svg';
import adjustBoardSize from "../adjustBoardSize.fn";
import { findWinningLines } from "../checkWinner.fn";

class Board extends React.Component {
    

   
  
    render() {
      let thisBoard = this;
      let squares = this.props.gridState; 
      let rows = [];

      //GridState has y=1 as the bottom row, so draw from the top row (y = sizeY) down
      for(let i = 0; i < squares.sizeY; i++){
          let placeFlags = {colTop: i === 0, colBottom: i === (squares.sizeY - 1)}
          rows[i] = renderRow(squares.sizeX, squares.sizeY - i, placeFlags);
      }

      return (
        <div className="board">
            {rows}
            {renderGridLines()}
            {renderWinningLines()}
        </div>
      );

      //The grid lines and winning lines are drawn in grid units over the whole grid:
      //one unit per square, with y going down the screen

      //Drawn as an overlay rather than as square borders, so every square is the same size
      //and its centre is exactly at the centre of its grid cell
      function renderGridLines(){
        let lines = [];
        for(let x = 1; x < squares.sizeX; x++){
          lines.push(<line key={"x" + x} className="gridLine" x1={x} y1={0} x2={x} y2={squares.sizeY} />);
        }
        for(let y = 1; y < squares.sizeY; y++){
          lines.push(<line key={"y" + y} className="gridLine" x1={0} y1={y} x2={squares.sizeX} y2={y} />);
        }

        return <svg className="gridLines" viewBox={"0 0 " + squares.sizeX + " " + squares.sizeY} preserveAspectRatio="none">
          {lines}
        </svg>;
      }

      function renderWinningLines(){
        let winningLines = findWinningLines(squares);
        if(winningLines.length === 0){
          return null;
        }

        return <svg className="winningLines" viewBox={"0 0 " + squares.sizeX + " " + squares.sizeY} preserveAspectRatio="none">
          {winningLines.map((line, i) => {
            let start = line.squares[0];
            let end = line.squares[line.squares.length - 1];
            return <line key={i} className={"winningLine winningLine-" + line.value}
              x1={start[0] - 0.5} y1={squares.sizeY - start[1] + 0.5}
              x2={end[0] - 0.5} y2={squares.sizeY - end[1] + 0.5} />;
          })}
        </svg>;
      }

      function renderSquare(pointX, pointY, placeFlags) {

        let squareIndex = ((pointY - 1) * squares.sizeX ) + pointX;
  
        let classString = "squareWrapper" + 
              (placeFlags.colTop ? ' colTop' : '') +
              (placeFlags.colBottom ? ' colBottom' : '') +
              (placeFlags.rowStart ? ' rowStart' : '') +
              (placeFlags.rowEnd ? ' rowEnd' : '') +
              " square_X_"+pointX+" square_Y_"+pointY;
  
        let playPiece;
  
        if (squares.getSquareVal(pointX, pointY) === 'X'){
          playPiece = <div className="playPiece cross">
            <Cross />
          </div>  
        } else if (squares.getSquareVal(pointX, pointY) === 'O') {
          playPiece = <div className="playPiece nought">
            <Nought />
          </div>
        } else {
          playPiece = <div className="playPiece blank"></div>
        }
  
        return <div key={squareIndex} id={"boardSquare_" + squareIndex} className={classString}>
          <button className="squareBtn" onClick={() => thisBoard.props.onClick(pointX, pointY, squareIndex)}>
            {playPiece}
          </button>
        </div>;
      }

      function renderRow(length, pointY, placeFlags, wrap){
        let rowSquares = [];
        for(let i = 0; i < length; i++){
          rowSquares[i] = renderSquare(i + 1, pointY, Object.assign({
            rowStart: i === 0, 
            rowEnd: i === (length - 1)
          }, placeFlags));
        }
  
        if(wrap === true){
          return <div className="boardRow">{rowSquares}</div>
        } else{
          return rowSquares
        }
  
        
      }
    }

    componentDidMount(){
      adjustBoardSize();
    }
  }

  export default Board;