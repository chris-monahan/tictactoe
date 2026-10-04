//By default a line as long as the shorter side of the board wins
function checkWinner(gridState, winLength = Math.min(gridState.sizeX, gridState.sizeY)) {
    const sequences = gridState.findContinuousSequences(winLength);
    for(let i = 0; i < sequences.length; i++){
      if(sequences[i].length > 0){
        return sequences[i][0][0];
      }
    }
    return null;
  }


export default checkWinner
