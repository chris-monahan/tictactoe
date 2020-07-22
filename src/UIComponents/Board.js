import React from 'react';
import cross from "../cross.svg";
import nought from "../nought.svg"

class Board extends React.Component {
    renderSquare(pointX, pointY, placeFlags) {

      let squareIndex = (pointY * this.props.squares.length) + pointX;

      let classString = "squareWrapper" + 
            (placeFlags.colTop ? ' colTop' : '') +
            (placeFlags.colBottom ? ' colBottom' : '') +
            (placeFlags.rowStart ? ' rowStart' : '') +
            (placeFlags.rowEnd ? ' rowEnd' : '');

      let playPiece;

      if (this.props.squares[pointY][pointX] === 'X'){
        playPiece = <img src={cross} class="playPiece cross"></img>  
      } else if (this.props.squares[pointY][pointX] === 'O') {
        playPiece = <img src={nought} class="playPiece nought"></img>
      } else {
        playPiece = <div class="playPiece blank"></div>
      }

      return <div id={"boardSquare_" + squareIndex} className={classString}>
        <button className="square" onClick={() => this.props.onClick(pointX, pointY, squareIndex)}>
          {playPiece}
        </button>
      </div>;
    }

    renderRow(length, rowNum, placeFlags, wrap){
      let rowSquares = [];
      for(let i = 0; i < length; i++){
        rowSquares[i] = this.renderSquare(i, rowNum, Object.assign({
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
  
    render() {
      let squares = this.props.squares; 
      let rows = [];

      for(let i = 0; i < squares.length; i++){
          let placeFlags = {colTop: i === 0, colBottom: i === squares.length}
          rows[i] = this.renderRow(squares[i].length, i, placeFlags);
      }

      return (
        <div class="board">
            {rows}
        </div>
      );
    }
  }

  export default Board;