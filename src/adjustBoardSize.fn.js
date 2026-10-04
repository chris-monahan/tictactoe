import config from "./config";

//Below this window width (i.e. phones) the board may use more of the width available
const mobileScreenWidth = 700;

function adjustBoardSize(){
    let docRoot = document.documentElement;
    let containingElement = document.getElementById("game-board-container")
    let boardWidthLimitOffset = window.innerWidth < mobileScreenWidth ? 0.85 : 0.75;
    let boardHeightLimitOffset = 0.75;

    //const viewportWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
    //const viewportHeight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
    if(containingElement !== null){
        //the container grows to fit the board, so shrink the board before measuring the space available
        //(this all happens before the browser paints, so the board never shows at zero size)
        docRoot.style.setProperty("--grid-square-width", "0px");
        docRoot.style.setProperty("--grid-square-height", "0px");

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
