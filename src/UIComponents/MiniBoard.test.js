import { render } from '@testing-library/react';
import MiniBoard from './MiniBoard';

test('Draws one square per grid point, top row first', () =>{
    let { container } = render(<MiniBoard squares={[   ['X',null,null,null],
                                                        [null,null,null,null],
                                                        [null,null,null,'O']]} />);
    let squares = container.querySelectorAll('.miniSquare');

    expect(squares.length).toEqual(12);
    expect(squares[0].querySelector('.cross')).not.toBeNull();
    expect(squares[11].querySelector('.nought')).not.toBeNull();
    expect(container.querySelectorAll('.cross, .nought').length).toEqual(2);
});
