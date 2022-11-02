import React from 'react';
import { ReactComponent as Cross } from '../cross.svg';
import { ReactComponent as Nought } from '../nought.svg';
import adjustBoardSize from "../adjustBoardSize.fn";

class Board extends React.Component {
    

   
  
    render() {
      let thisBoard = this;
      let squares = this.props.gridState; 
      let rows = [];

      for(let i = 0; i < squares.sizeX; i++){
          let placeFlags = {colTop: i === 0, colBottom: i === squares.length}
          rows[i] = renderRow(squares.sizeY, i, placeFlags);
      }

      return (
        <div className="board">
            {rows}
        </div>
      );

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
          playPiece = <div class="playPiece blank"></div>
        }
  
        return <div id={"boardSquare_" + squareIndex} className={classString}>
          <button className="squareBtn" onClick={() => thisBoard.props.onClick(pointX, pointY, squareIndex)}>
            {playPiece}
          </button>
        </div>;
      }

      function renderRow(length, rowNum, placeFlags, wrap){
        let rowSquares = [];
        for(let i = 0; i < length; i++){
          rowSquares[i] = renderSquare(i + 1, rowNum + 1, Object.assign({
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