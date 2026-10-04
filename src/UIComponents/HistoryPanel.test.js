import { render, screen, fireEvent } from '@testing-library/react';
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
    let buttons = screen.getAllByRole('button');

    expect(buttons[1]).toHaveAttribute('aria-current', 'step');
    expect(buttons[0]).not.toHaveAttribute('aria-current');
    expect(buttons[2]).not.toHaveAttribute('aria-current');
});

test('Clicking a step jumps to it', () =>{
    let onJump = jest.fn();
    render(<HistoryPanel history={history} stepNumber={2} onJump={onJump} />);

    fireEvent.click(screen.getAllByRole('button')[0]);
    expect(onJump).toHaveBeenCalledWith(0);
});
