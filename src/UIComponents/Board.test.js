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
