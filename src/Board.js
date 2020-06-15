import React from 'react';

class Board extends React.Component {
    renderSquare(i, placeFlags) {

      let classString = "squareWrapper" + 
            (placeFlags.colTop ? ' colTop' : '') +
            (placeFlags.colBottom ? ' colBottom' : '') +
            (placeFlags.rowStart ? ' rowStart' : '') +
            (placeFlags.rowEnd ? ' rowEnd' : '');

      return <div id={"boardSquare_" + i} className={classString}>
        <button className="square" onClick={() => this.props.onClick(i)}>
          {this.props.squares[i]}
        </button>
      </div>;
    }

    renderRow(length, squareIndex, placeFlags, wrap){
      let rowSquares = [];
      for(let i = 0; i < length; i++){
        rowSquares[i] = this.renderSquare(squareIndex + i, Object.assign({
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
      return (
        <div class="board">
            {this.renderRow(3, 0, {colTop: true, colBottom: false})}
            {this.renderRow(3, 3, {colTop: false, colBottom: false})}
            {this.renderRow(3, 6 ,{colTop: false, colBottom: true})}
        </div>
      );
    }
  }

  export default Board;