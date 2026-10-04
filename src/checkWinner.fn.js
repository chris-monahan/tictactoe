//Every line at least winLength long, as { value, squares: [[x, y], ...] }
//By default a line as long as the shorter side of the board wins
export function findWinningLines(gridState, winLength = Math.min(gridState.sizeX, gridState.sizeY)) {
    const sequences = gridState.findContinuousSequences(winLength);
    let lines = [];
    for(let i = 0; i < sequences.length; i++){
      for(let j = 0; j < sequences[i].length; j++){
        //each sequence is its value followed by its coordinates
        lines.push({ value: sequences[i][j][0], squares: sequences[i][j].slice(1) });
      }
    }
    return lines;
  }

function checkWinner(gridState, winLength) {
    const lines = findWinningLines(gridState, winLength);
    return lines.length > 0 ? lines[0].value : null;
  }


export default checkWinner
