import { render, screen, fireEvent, within } from '@testing-library/react';
import HistoryPanel from './HistoryPanel';

const history = [
    { squares: [[null,null,null],[null,null,null],[null,null,null]] },
    { squares: [[null,null,null],[null,null,null],['X',null,null]] },
    { squares: [[null,null,null],[null,'O',null],['X',null,null]] },
];

test('Lists every step, starting from the empty board', () =>{
    render(<HistoryPanel history={history} stepNumber={2} onJump={() => {}} />);
    let entries = screen.getAllByRole('listitem');

    expect(entries.length).toEqual(3);
    expect(entries[0]).toHaveTextContent('Start');
    expect(entries[1]).toHaveTextContent('Move 1: X');
    expect(entries[2]).toHaveTextContent('Move 2: O');
});

test('Each step shows a picture of the board', () =>{
    let { container } = render(<HistoryPanel history={history} stepNumber={2} onJump={() => {}} />);
    let entries = container.querySelectorAll('.historyStep');

    expect(entries[0].querySelectorAll('.miniSquare').length).toEqual(9);
    expect(entries[0].querySelectorAll('.cross, .nought').length).toEqual(0);
    expect(entries[2].querySelectorAll('.cross, .nought').length).toEqual(2);
});

test('Highlights the step being shown', () =>{
    render(<HistoryPanel history={history} stepNumber={1} onJump={() => {}} />);
    let buttons = within(screen.getByRole('list')).getAllByRole('button');

    expect(buttons[1]).toHaveAttribute('aria-current', 'step');
    expect(buttons[0]).not.toHaveAttribute('aria-current');
    expect(buttons[2]).not.toHaveAttribute('aria-current');
});

test('Clicking a step jumps to it', () =>{
    let onJump = jest.fn();
    render(<HistoryPanel history={history} stepNumber={2} onJump={onJump} />);

    fireEvent.click(within(screen.getByRole('list')).getAllByRole('button')[0]);
    expect(onJump).toHaveBeenCalledWith(0);
});

test('Shows which move is being shown, out of how many', () =>{
    let { rerender } = render(<HistoryPanel history={history} stepNumber={1} onJump={() => {}} />);
    expect(screen.getByText('Move 1 of 2')).toBeInTheDocument();

    rerender(<HistoryPanel history={history} stepNumber={0} onJump={() => {}} />);
    expect(screen.getByText('Move 0 of 2')).toBeInTheDocument();
});

test('Undo and Redo step back and forward one move', () =>{
    let onJump = jest.fn();
    render(<HistoryPanel history={history} stepNumber={1} onJump={onJump} />);

    fireEvent.click(screen.getByRole('button', { name: 'Undo' }));
    expect(onJump).toHaveBeenLastCalledWith(0);

    fireEvent.click(screen.getByRole('button', { name: 'Redo' }));
    expect(onJump).toHaveBeenLastCalledWith(2);
});

test('Undo is unavailable at the start and Redo at the latest move', () =>{
    let onJump = jest.fn();
    let { rerender } = render(<HistoryPanel history={history} stepNumber={0} onJump={onJump} />);
    let undo = screen.getByRole('button', { name: 'Undo' });
    let redo = screen.getByRole('button', { name: 'Redo' });

    expect(undo).toHaveAttribute('aria-disabled', 'true');
    expect(redo).not.toHaveAttribute('aria-disabled', 'true');
    fireEvent.click(undo);
    expect(onJump).not.toHaveBeenCalled();

    rerender(<HistoryPanel history={history} stepNumber={2} onJump={onJump} />);
    expect(undo).not.toHaveAttribute('aria-disabled', 'true');
    expect(redo).toHaveAttribute('aria-disabled', 'true');
    fireEvent.click(redo);
    expect(onJump).not.toHaveBeenCalled();
});

test('Labels each move with the piece icon of who made it', () =>{
    let { container } = render(<HistoryPanel history={history} stepNumber={2} onJump={() => {}} />);
    let labels = container.querySelectorAll('.historyLabel');

    expect(labels[0].querySelector('.pieceIcon')).toBeNull();
    expect(labels[1].querySelector('.pieceIcon-X')).not.toBeNull();
    expect(labels[2].querySelector('.pieceIcon-O')).not.toBeNull();
});
