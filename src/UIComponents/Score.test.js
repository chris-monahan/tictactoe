import { render, screen } from '@testing-library/react';
import Score from './Score';

test('Shows the wins for each player and the draws', () =>{
    render(<Score score={{ X: 2, O: 1, draws: 3 }} />);
    let score = screen.getByLabelText('Score');

    expect(score).toHaveTextContent('X: 2');
    expect(score).toHaveTextContent('O: 1');
    expect(score).toHaveTextContent('Draws: 3');
});
