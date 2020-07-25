function init(config){
    let root = document.documentElement;
    root.style.setProperty("--grid-x-num", config.board.sizeX);
    root.style.setProperty("--grid-y-num", config.board.sizeY);
    root.style.setProperty("--sidebar-bg-color", config.sidebar.backgroundColor)
}

export default init; 