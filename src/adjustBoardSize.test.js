import adjustBoardSize from './adjustBoardSize.fn.js'

//Configure a 4 wide x 3 tall board
jest.mock('./config', () => ({ board: { sizeX: 4, sizeY: 3 } }));

function setUpContainer(width, height){
    document.body.innerHTML = '<div id="game-board-container"></div>';
    let container = document.getElementById('game-board-container');
    Object.defineProperty(container, 'clientWidth', { value: width });
    Object.defineProperty(container, 'clientHeight', { value: height });
}

function getSquareSize(){
    let style = document.documentElement.style;
    return [parseFloat(style.getPropertyValue('--grid-square-width')),
            parseFloat(style.getPropertyValue('--grid-square-height'))];
}

test('Squares keep their shape on a non-square board', () =>{
    setUpContainer(1000, 1000);
    adjustBoardSize();
    let [width, height] = getSquareSize();
    expect(width / height).toBeCloseTo(1.1);
});

test('Board fits inside a wide container', () =>{
    setUpContainer(2000, 400);
    adjustBoardSize();
    let [width, height] = getSquareSize();
    expect(width * 4).toBeLessThanOrEqual(2000 * 0.75);
    expect(height * 3).toBeLessThanOrEqual(400 * 0.75);
    expect(width / height).toBeCloseTo(1.1);
});

test('Board fits inside a tall container', () =>{
    setUpContainer(400, 2000);
    adjustBoardSize();
    let [width, height] = getSquareSize();
    expect(width * 4).toBeLessThanOrEqual(400 * 0.75);
    expect(height * 3).toBeLessThanOrEqual(2000 * 0.75);
    expect(width / height).toBeCloseTo(1.1);
});
