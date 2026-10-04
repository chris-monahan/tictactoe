import config from "./config";

function adjustBoardSize(){
    let docRoot = document.documentElement;
    let containingElement = document.getElementById("game-board-container")
    let boardWidthLimitOffset = 0.75;
    let boardHeightLimitOffset = 0.75;

    //const viewportWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
    //const viewportHeight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
    if(containingElement !== null){
        let containerWidth = containingElement.clientWidth;
        let containerHeight = containingElement.clientHeight;
        //width to height ratio of a single square
        let squareAspect = 1.1;

        let maxBoardWidth = containerWidth * boardWidthLimitOffset;
        let maxBoardHeight = containerHeight * boardHeightLimitOffset;

        //take the largest square that lets the whole board fit both ways
        let squareWidthPx = Math.min(maxBoardWidth / config.board.sizeX,
                                     (maxBoardHeight / config.board.sizeY) * squareAspect);
        let squareHeightPx = squareWidthPx / squareAspect;

        let squareWidth = squareWidthPx + "px";
        let squareHeight = squareHeightPx + "px";

        // console.log("--Adjusting board size--");
        // console.log("Square Width: "+squareWidth);
        // console.log("Square Height: "+squareHeight);
        // console.log(containingElement);

        docRoot.style.setProperty("--grid-square-width", squareWidth);
        docRoot.style.setProperty("--grid-square-height", squareHeight);
    }
    
}


export default adjustBoardSize
