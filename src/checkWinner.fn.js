import config from "./config";


function checkWinner(gridState) {
    const sequences = gridState.findContinuousSequences(config.board.sizeX);
    for(let i = 0; i < sequences.length; i++){
      if(sequences[i].length > 0){
        return sequences[i][0][0];
      }
    }
    return null;
  }


export default checkWinner
