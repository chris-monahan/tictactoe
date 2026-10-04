import React from 'react';
import { ReactComponent as Cross } from '../cross.svg';
import { ReactComponent as Nought } from '../nought.svg';

//A small, non-interactive picture of a board, drawn from getGridData() output (top row first)
function MiniBoard({ squares }) {

    let sizeX = squares[0].length;
    let miniSquares = [];

    squares.forEach((row, rowIndex) => {
        row.forEach((value, colIndex) => {
            let piece = null;
            if (value === 'X') {
                piece = <Cross className="cross" />;
            } else if (value === 'O') {
                piece = <Nought className="nought" />;
            }
            miniSquares.push(<div key={rowIndex + "_" + colIndex} className="miniSquare">{piece}</div>);
        });
    });

    return <div className="miniBoard" style={{ gridTemplateColumns: "repeat(" + sizeX + ", auto)" }}>
            {miniSquares}
        </div>
}

export default MiniBoard;
