import { render } from '@testing-library/react';
import Board from './Board';
import GridState from '../GridState';

//CRA's Jest transform builds SVG components as pre-React-19 elements, which React 19 won't render
jest.mock('../cross.svg', () => ({ ReactComponent: () => null }));
jest.mock('../nought.svg', () => ({ ReactComponent: () => null }));

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
