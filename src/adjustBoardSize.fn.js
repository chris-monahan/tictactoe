import config from "./config";

function adjustBoardSize(){
    let docRoot = document.documentElement;
    let containingElement = document.getElementById("game-board")
    let boardWidthLimitOffset = 0.75;
    let boardHeightLimitOffset = 0.75;

    //const viewportWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
    //const viewportHeight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
    if(containingElement !== null){
        let containerWidth = containingElement.clientWidth;
        let containerHeight = containingElement.clientHeight;
        let squareWidth;
        let squareHeight;
        let boardWidth;
        let boardHeight;

        let maxBoardWidth = containerWidth * boardWidthLimitOffset;
        let maxBoardHeight = containerHeight * boardHeightLimitOffset;

        
        if(maxBoardHeight > maxBoardWidth){
            boardWidth = maxBoardWidth;
            boardHeight = boardWidth*0.8;
        } else {
            boardHeight = maxBoardHeight;
            boardWidth = boardHeight*1.2;
        }

        squareWidth = boardWidth/config.board.sizeX + "px";
        squareHeight = boardHeight/config.board.sizeY + "px";

        // console.log("--Adjusting board size--");
        // console.log("Square Width: "+squareWidth);
        // console.log("Square Height: "+squareHeight);
        // console.log(containingElement);

        docRoot.style.setProperty("--grid-square-width", squareWidth);
        docRoot.style.setProperty("--grid-square-height", squareHeight);
    }
    
}


export default adjustBoardSize
