import config from "./config";

//The board may use more of the width on narrow screens, sliding evenly between the narrow and
//wide settings so its size never jumps (the numbers are in config.board.sizing)
function widthLimitFor(windowWidth){
    const sizing = config.board.sizing;
    let progress = (windowWidth - sizing.narrowScreenWidth) / (sizing.wideScreenWidth - sizing.narrowScreenWidth);
    progress = Math.min(Math.max(progress, 0), 1);
    return sizing.narrowWidthShare + (sizing.wideWidthShare - sizing.narrowWidthShare) * progress;
}

function adjustBoardSize(){
    let docRoot = document.documentElement;
    let containingElement = document.getElementById("game-board-container")
    let boardWidthLimitOffset = widthLimitFor(window.innerWidth);
    let boardHeightLimitOffset = config.board.sizing.heightShare;

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
