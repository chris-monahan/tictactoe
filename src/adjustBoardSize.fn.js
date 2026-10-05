import config from "./config";

//The board may use more of the width on narrow screens: 85% at or below 500px wide (every phone
//held upright), 75% at or above 1000px, sliding evenly in between so the size never jumps
const narrowScreenWidth = 500;
const wideScreenWidth = 1000;
const narrowWidthLimit = 0.85;
const wideWidthLimit = 0.75;

function widthLimitFor(windowWidth){
    let progress = (windowWidth - narrowScreenWidth) / (wideScreenWidth - narrowScreenWidth);
    progress = Math.min(Math.max(progress, 0), 1);
    return narrowWidthLimit + (wideWidthLimit - narrowWidthLimit) * progress;
}

function adjustBoardSize(){
    let docRoot = document.documentElement;
    let containingElement = document.getElementById("game-board-container")
    let boardWidthLimitOffset = widthLimitFor(window.innerWidth);
    let boardHeightLimitOffset = 0.75;

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

        docRoot.style.setProperty("--grid-square-width", squareWidth);
        docRoot.style.setProperty("--grid-square-height", squareHeight);
    }
    
}


export default adjustBoardSize
