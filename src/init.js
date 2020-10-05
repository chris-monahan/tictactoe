import adjustBoardSize from "./adjustBoardSize.fn";
import checkIE from "./checkIE.fn";
import debounce from "lodash/debounce"

function init(config){
    let docRoot = document.documentElement;

    if(checkIE.isIE()){
        document.body.classList.add("MSIE");
    }
    docRoot.style.setProperty("--grid-x-num", config.board.sizeX);
    docRoot.style.setProperty("--grid-y-num", config.board.sizeY);

    docRoot.style.setProperty("--nought-piece-col", config.board.noughtColor);
    docRoot.style.setProperty("--cross-piece-col", config.board.crossColor);

    docRoot.style.setProperty("--sidebar-bg-color", config.sidebar.backgroundColor);

    window.addEventListener("resize",debounce(adjustBoardSize),200);
}

export default init; 