import adjustBoardSize from './adjustBoardSize.fn.js'
import config from './config';

//Configure a 4 wide x 3 tall board, with the real sizing settings
jest.mock('./config', () => ({ board: { sizeX: 4, sizeY: 3, sizing: { ...jest.requireActual('./config').default.board.sizing } } }));

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

test('The board starting oversized does not skew the measurement', () =>{
    //like the real layout, the container grows to fit a board wider than the space available
    document.body.innerHTML = '<div id="game-board-container"></div>';
    let container = document.getElementById('game-board-container');
    let style = document.documentElement.style;
    let boardWidth = () => parseFloat(style.getPropertyValue('--grid-square-width') || '0') * 4;
    Object.defineProperty(container, 'clientWidth', { get: () => Math.max(400, boardWidth()) });
    Object.defineProperty(container, 'clientHeight', { value: 2000 });

    style.setProperty('--grid-square-width', '300px');
    style.setProperty('--grid-square-height', '300px');
    adjustBoardSize();

    //sized for the 400px the container has without the board: 400 * 0.75 / 4 squares
    expect(parseFloat(style.getPropertyValue('--grid-square-width'))).toBeCloseTo(75);
});

describe('Board width allowance by screen size', () =>{
    afterEach(() => {
        window.innerWidth = 1024;
    });

    test('On a mobile screen the board may use 85% of the width', () =>{
        window.innerWidth = 390;
        setUpContainer(320, 2000);
        adjustBoardSize();

        //320 * 0.85 / 4 squares
        expect(getSquareSize()[0]).toBeCloseTo(68);
    });

    test('Between 500px and 1000px wide the allowance slides from 85% to 75%', () =>{
        window.innerWidth = 750;
        setUpContainer(320, 2000);
        adjustBoardSize();

        //halfway, so 80%: 320 * 0.8 / 4 squares
        expect(getSquareSize()[0]).toBeCloseTo(64);
    });

    test('The board never gets smaller as the window gets wider', () =>{
        let previousWidth = 0;
        for(let windowWidth = 300; windowWidth <= 1400; windowWidth += 10){
            window.innerWidth = windowWidth;
            //the container is the window less the page's padding
            setUpContainer(windowWidth - 32, 5000);
            adjustBoardSize();

            let boardWidth = getSquareSize()[0] * 4;
            expect(boardWidth).toBeGreaterThanOrEqual(previousWidth);
            previousWidth = boardWidth;
        }
    });

    test('On a larger screen the board uses 75% of the width', () =>{
        window.innerWidth = 1024;
        setUpContainer(320, 2000);
        adjustBoardSize();

        //320 * 0.75 / 4 squares
        expect(getSquareSize()[0]).toBeCloseTo(60);
    });
});

test('The sizing settings come from config', () =>{
    let defaults = { ...config.board.sizing };
    config.board.sizing.narrowWidthShare = 0.5;
    config.board.sizing.heightShare = 0.5;

    window.innerWidth = 390;
    setUpContainer(320, 2000);
    adjustBoardSize();
    //320 * 0.5 / 4 squares
    expect(getSquareSize()[0]).toBeCloseTo(40);

    setUpContainer(2000, 300);
    adjustBoardSize();
    //300 * 0.5 / 3 squares, as the square height
    expect(getSquareSize()[1]).toBeCloseTo(50);

    config.board.sizing = defaults;
    window.innerWidth = 1024;
});

test('On a short screen the board only takes the height left after what is below it', () =>{
    //a 400px tall container whose other content (status, score) reaches 250px down with the board at zero size
    setUpContainer(2000, 400);
    let container = document.getElementById('game-board-container');
    let below = document.createElement('div');
    container.appendChild(below);
    container.getBoundingClientRect = () => ({ top: 0, bottom: 400, height: 400 });
    below.getBoundingClientRect = () => ({ top: 200, bottom: 250, height: 50 });
    adjustBoardSize();

    //150px left over, rather than 75% of 400px: 150 / 3 squares, as the square height
    expect(getSquareSize()[1]).toBeCloseTo(50);
});
