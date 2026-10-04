import { render, screen, fireEvent } from '@testing-library/react';
import Game from './Game';
import adjustBoardSize from '../adjustBoardSize.fn';

jest.mock('../adjustBoardSize.fn', () => jest.fn());

afterEach(() => {
    window.innerWidth = 1024;
});

function clickSquare(container, pointX, pointY){
    fireEvent.click(container.querySelector(`.square_X_${pointX}.square_Y_${pointY} .squareBtn`));
}

function pieceAt(container, pointX, pointY){
    let square = container.querySelector(`.square_X_${pointX}.square_Y_${pointY}`);
    if(square.querySelector('.cross')) return 'X';
    if(square.querySelector('.nought')) return 'O';
    return null;
}

test('Players take turns placing X then O', () =>{
    let { container } = render(<Game sizeX={3} sizeY={3} />);
    expect(screen.getByText('Next player: X')).toBeInTheDocument();

    clickSquare(container, 1, 1);
    expect(pieceAt(container, 1, 1)).toEqual('X');
    expect(screen.getByText('Next player: O')).toBeInTheDocument();

    clickSquare(container, 2, 2);
    expect(pieceAt(container, 2, 2)).toEqual('O');
    expect(screen.getByText('Next player: X')).toBeInTheDocument();
});

test('Clicking an occupied square does nothing', () =>{
    let { container } = render(<Game sizeX={3} sizeY={3} />);

    clickSquare(container, 1, 1);
    clickSquare(container, 1, 1);
    expect(pieceAt(container, 1, 1)).toEqual('X');
    expect(screen.getByText('Next player: O')).toBeInTheDocument();
});

test('A win is announced and stops further moves', () =>{
    let { container } = render(<Game sizeX={3} sizeY={3} />);

    //X takes the top row, O plays in the middle row
    clickSquare(container, 1, 3);
    clickSquare(container, 1, 2);
    clickSquare(container, 2, 3);
    clickSquare(container, 2, 2);
    clickSquare(container, 3, 3);
    expect(screen.getByText('X is the winner!')).toBeInTheDocument();

    clickSquare(container, 3, 1);
    expect(pieceAt(container, 3, 1)).toEqual(null);
});

test('A full board with no line is a draw', () =>{
    let { container } = render(<Game sizeX={3} sizeY={3} />);

    //ends as  X O X / X O O / O X X  (top row first)
    [[1,3],[2,3],[3,3],[2,2],[1,2],[3,2],[2,1],[1,1],[3,1]].forEach(([pointX, pointY]) => {
        clickSquare(container, pointX, pointY);
    });
    expect(screen.getByText("It's a draw!")).toBeInTheDocument();
});

test('Reset clears the board and gives X the next move', () =>{
    let { container } = render(<Game sizeX={3} sizeY={3} />);

    clickSquare(container, 1, 1);
    clickSquare(container, 2, 2);
    fireEvent.click(screen.getByAltText('reset'));

    expect(pieceAt(container, 1, 1)).toEqual(null);
    expect(pieceAt(container, 2, 2)).toEqual(null);
    expect(screen.getByText('Next player: X')).toBeInTheDocument();
});

test('Uses the board size it is given', () =>{
    let { container } = render(<Game sizeX={4} sizeY={3} />);
    expect(container.querySelectorAll('.squareWrapper').length).toEqual(12);

    clickSquare(container, 4, 3);
    expect(pieceAt(container, 4, 3)).toEqual('X');
});

test('The sidebar history lists each move and jumps back to it', () =>{
    let { container } = render(<Game sizeX={3} sizeY={3} />);

    clickSquare(container, 1, 1);
    clickSquare(container, 2, 2);
    expect(screen.getByText('Move 2: O')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Move 1: X'));
    expect(pieceAt(container, 1, 1)).toEqual('X');
    expect(pieceAt(container, 2, 2)).toEqual(null);
    expect(screen.getByText('Next player: O')).toBeInTheDocument();
    expect(screen.getByText('Move 1: X').closest('button')).toHaveAttribute('aria-current', 'step');
});

test('Reset starts a new game with an empty history', () =>{
    let { container } = render(<Game sizeX={3} sizeY={3} />);

    clickSquare(container, 1, 1);
    clickSquare(container, 2, 2);
    fireEvent.click(screen.getByAltText('reset'));

    expect(container.querySelectorAll('.historyStep').length).toEqual(1);
    expect(screen.queryByText('Move 1: X')).toBeNull();
});

test('The sidebar starts expanded on a wide screen and can be collapsed and expanded', () =>{
    window.innerWidth = 1024;
    render(<Game sizeX={3} sizeY={3} />);
    let toggle = screen.getByRole('button', { name: 'Hide sidebar' });

    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('heading', { name: 'History' })).toBeInTheDocument();

    fireEvent.click(toggle);
    toggle = screen.getByRole('button', { name: 'Show sidebar' });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('heading', { name: 'History' })).toBeNull();

    fireEvent.click(toggle);
    expect(screen.getByRole('heading', { name: 'History' })).toBeInTheDocument();
});

test('The sidebar starts collapsed on a narrow screen', () =>{
    window.innerWidth = 400;
    render(<Game sizeX={3} sizeY={3} />);

    expect(screen.getByRole('button', { name: 'Show sidebar' })).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('heading', { name: 'History' })).toBeNull();
});

test('Toggling the sidebar resizes the board', () =>{
    render(<Game sizeX={3} sizeY={3} />);
    adjustBoardSize.mockClear();

    fireEvent.click(screen.getByRole('button', { name: 'Hide sidebar' }));
    expect(adjustBoardSize).toHaveBeenCalled();
});

test('Play again starts a new game after a win', () =>{
    let { container } = render(<Game sizeX={3} sizeY={3} />);

    [[1,3],[1,2],[2,3],[2,2],[3,3]].forEach(([pointX, pointY]) => {
        clickSquare(container, pointX, pointY);
    });
    fireEvent.click(screen.getByRole('button', { name: 'Play again?' }));

    expect(pieceAt(container, 1, 3)).toEqual(null);
    expect(container.querySelectorAll('.historyStep').length).toEqual(1);
    expect(screen.getByText('Next player: X')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Play again?' })).toBeNull();
});

function playMoves(container, moves){
    moves.forEach(([pointX, pointY]) => clickSquare(container, pointX, pointY));
}

//X takes the top row
const xWins = [[1,3],[1,2],[2,3],[2,2],[3,3]];
//O takes the middle row
const oWins = [[1,3],[1,2],[2,3],[2,2],[3,1],[3,2]];
//ends as  X O X / X O O / O X X  (top row first)
const draw = [[1,3],[2,3],[3,3],[2,2],[1,2],[3,2],[2,1],[1,1],[3,1]];

test('The score counts each finished game', () =>{
    let { container } = render(<Game sizeX={3} sizeY={3} />);
    let score = screen.getByLabelText('Score');
    expect(score).toHaveTextContent('X: 0O: 0Draws: 0');

    playMoves(container, xWins);
    expect(score).toHaveTextContent('X: 1O: 0Draws: 0');

    fireEvent.click(screen.getByRole('button', { name: 'Play again?' }));
    playMoves(container, oWins);
    expect(score).toHaveTextContent('X: 1O: 1Draws: 0');

    fireEvent.click(screen.getByRole('button', { name: 'Play again?' }));
    playMoves(container, draw);
    expect(score).toHaveTextContent('X: 1O: 1Draws: 1');
});

test('Replaying the end of a finished game does not count it twice', () =>{
    let { container } = render(<Game sizeX={3} sizeY={3} />);
    let score = screen.getByLabelText('Score');

    playMoves(container, xWins);
    fireEvent.click(screen.getByText('Move 4: O'));
    clickSquare(container, 3, 3);
    expect(screen.getByText('X is the winner!')).toBeInTheDocument();
    expect(score).toHaveTextContent('X: 1O: 0Draws: 0');
});

test('A game abandoned with reset is not counted', () =>{
    let { container } = render(<Game sizeX={3} sizeY={3} />);
    let score = screen.getByLabelText('Score');

    playMoves(container, xWins.slice(0, 4));
    fireEvent.click(screen.getByAltText('reset'));
    expect(score).toHaveTextContent('X: 0O: 0Draws: 0');
});

test('The sidebar toggle is the same single button whether open or closed', () =>{
    let { container } = render(<Game sizeX={3} sizeY={3} />);
    let toggle = container.querySelector('.sidebarToggle');
    let wasExpanded = toggle.getAttribute('aria-expanded');

    fireEvent.click(toggle);
    expect(container.querySelectorAll('.sidebarToggle').length).toEqual(1);
    expect(container.querySelector('.sidebarToggle')).toBe(toggle);
    expect(toggle.getAttribute('aria-expanded')).not.toEqual(wasExpanded);
});
