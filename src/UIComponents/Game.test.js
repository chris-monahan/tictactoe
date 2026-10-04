import { render, screen, fireEvent } from '@testing-library/react';
import Game from './Game';

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
