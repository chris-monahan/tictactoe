import adjustBoardSize from "./adjustBoardSize.fn";
import debounce from "lodash/debounce"

function init(config){
    let docRoot = document.documentElement;
    docRoot.style.setProperty("--grid-x-num", config.board.sizeX);
    docRoot.style.setProperty("--grid-y-num", config.board.sizeY);
    docRoot.style.setProperty("--sidebar-bg-color", config.sidebar.backgroundColor);

    window.addEventListener("resize",debounce(adjustBoardSize),200);
}

export default init; 