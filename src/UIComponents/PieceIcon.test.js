import { render, screen } from '@testing-library/react';
import PieceIcon from './PieceIcon';

test('Draws the piece as an icon, with its letter for screen readers and copying', () =>{
    let { container } = render(<p>Next player: <PieceIcon piece="X" /></p>);
    let icon = container.querySelector('.pieceIcon');

    expect(icon).toHaveClass('pieceIcon-X');
    expect(icon.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
    expect(screen.getByText('X')).toHaveClass('visually-hidden');
    expect(container.querySelector('p')).toHaveTextContent('Next player: X');
});

test('Draws O as a nought', () =>{
    let { container } = render(<PieceIcon piece="O" />);
    expect(container.querySelector('.pieceIcon')).toHaveClass('pieceIcon-O');
    expect(screen.getByText('O')).toBeInTheDocument();
});
