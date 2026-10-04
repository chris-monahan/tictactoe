import { render } from '@testing-library/react';
import Board from './Board';
import GridState from '../GridState';

test('Renders one square per grid point on a non-square board', () =>{
    let fourByThree = new GridState(4,3);
    let { container } = render(<Board gridState={fourByThree} onClick={() => {}} />);

    expect(container.querySelectorAll('.squareWrapper').length).toEqual(12);
    expect(container.querySelectorAll('.square_X_4').length).toEqual(3);
    expect(container.querySelectorAll('.square_Y_3').length).toEqual(4);
    expect(container.querySelectorAll('.square_Y_4').length).toEqual(0);
});

test('Marks the edge squares of a non-square board', () =>{
    let fourByThree = new GridState(4,3);
    let { container } = render(<Board gridState={fourByThree} onClick={() => {}} />);

    expect(container.querySelectorAll('.colTop').length).toEqual(4);
    expect(container.querySelectorAll('.colBottom').length).toEqual(4);
    expect(container.querySelectorAll('.rowStart').length).toEqual(3);
    expect(container.querySelectorAll('.rowEnd').length).toEqual(3);
});

test('Draws the top row of the grid data first', () =>{
    let fourByThree = new GridState(4,3);
    fourByThree.setGridData([   ['X',null,null,null],
                                [null,null,null,null],
                                [null,null,null,'O']]);
    let { container } = render(<Board gridState={fourByThree} onClick={() => {}} />);
    let squares = container.querySelectorAll('.squareWrapper');

    expect(squares[0].classList).toContain('square_X_1');
    expect(squares[0].classList).toContain('square_Y_3');
    expect(squares[0].querySelector('.cross')).not.toBeNull();

    expect(squares[11].classList).toContain('square_X_4');
    expect(squares[11].classList).toContain('square_Y_1');
    expect(squares[11].querySelector('.nought')).not.toBeNull();
});

test('Clicking a square reports its grid coordinates', () =>{
    let fourByThree = new GridState(4,3);
    let onClick = jest.fn();
    let { container } = render(<Board gridState={fourByThree} onClick={onClick} />);

    container.querySelector('.square_X_1.square_Y_3 .squareBtn').click();
    expect(onClick).toHaveBeenCalledWith(1, 3, expect.anything());
    expect(container.querySelectorAll('.squareWrapper')[0].querySelector('.squareBtn')).toBe(
        container.querySelector('.square_X_1.square_Y_3 .squareBtn'));
});

test('Draws no line when nobody has won', () =>{
    let { container } = render(<Board gridState={new GridState(3,3)} onClick={() => {}} />);
    expect(container.querySelector('.winningLine')).toBeNull();
});

test('Draws a line through the centres of the winning squares', () =>{
    let grid = new GridState(3,3);
    grid.setGridData([  ['X','X','X'],
                        ['O','O',null],
                        [null,null,null]]);
    let { container } = render(<Board gridState={grid} onClick={() => {}} />);
    let lines = container.querySelectorAll('.winningLine');

    //in grid units, the top row's centres are at y = 0.5 and x = 0.5 to 2.5
    expect(lines.length).toEqual(1);
    expect(lines[0]).toHaveAttribute('x1', '0.5');
    expect(lines[0]).toHaveAttribute('y1', '0.5');
    expect(lines[0]).toHaveAttribute('x2', '2.5');
    expect(lines[0]).toHaveAttribute('y2', '0.5');
    expect(lines[0]).toHaveClass('winningLine-X');
});

test('Draws a vertical winning line on a non-square board', () =>{
    let grid = new GridState(4,3);
    grid.setGridData([  [null,'O',null,null],
                        [null,'O',null,null],
                        ['X','O','X',null]]);
    let { container } = render(<Board gridState={grid} onClick={() => {}} />);
    let line = container.querySelector('.winningLine');

    expect(container.querySelector('svg.winningLines')).toHaveAttribute('viewBox', '0 0 4 3');
    expect(line).toHaveAttribute('x1', '1.5');
    expect(line).toHaveAttribute('y1', '2.5');
    expect(line).toHaveAttribute('x2', '1.5');
    expect(line).toHaveAttribute('y2', '0.5');
    expect(line).toHaveClass('winningLine-O');
});
