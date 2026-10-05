import { render, screen, fireEvent } from '@testing-library/react';
import PlayStatus from './PlayStatus';
import GridState from '../GridState';

//the status message has the piece as an icon, so match on its whole text
function statusMessage(){
    return document.querySelector('.status-msg');
}

function getGrid(gridData){
    let grid = new GridState(gridData[0].length, gridData.length);
    grid.setGridData(gridData);
    return grid;
}

test('Shows whose turn is next', () =>{
    render(<PlayStatus gridState={new GridState(3,3)} xIsNext={false} onReset={() => {}} />);
    expect(statusMessage()).toHaveTextContent('Next player: O');
});

test('Shows the winner', () =>{
    let grid = getGrid([['O','O','O'],
                        ['X','X',null],
                        ['X',null,null]]);
    render(<PlayStatus gridState={grid} xIsNext={true} onReset={() => {}} />);
    expect(statusMessage()).toHaveTextContent('O is the winner!');
});

test('Shows a draw when the board is full', () =>{
    let grid = getGrid([['X','O','X'],
                        ['X','O','O'],
                        ['O','X','X']]);
    render(<PlayStatus gridState={grid} xIsNext={false} onReset={() => {}} />);
    expect(screen.getByText("It's a draw!")).toBeInTheDocument();
});

test('The reset button calls onReset', () =>{
    let onReset = jest.fn();
    render(<PlayStatus gridState={new GridState(3,3)} xIsNext={true} onReset={onReset} />);
    fireEvent.click(screen.getByAltText('reset'));
    expect(onReset).toHaveBeenCalledTimes(1);
});

test('Offers to play again only once the game is over', () =>{
    let onPlayAgain = jest.fn();
    let { rerender } = render(<PlayStatus gridState={new GridState(3,3)} xIsNext={true} onReset={() => {}} onPlayAgain={onPlayAgain} />);
    expect(screen.queryByRole('button', { name: 'Play again?' })).toBeNull();

    let won = getGrid([ ['O','O','O'],
                        ['X','X',null],
                        ['X',null,null]]);
    rerender(<PlayStatus gridState={won} xIsNext={true} onReset={() => {}} onPlayAgain={onPlayAgain} />);
    fireEvent.click(screen.getByRole('button', { name: 'Play again?' }));
    expect(onPlayAgain).toHaveBeenCalledTimes(1);

    let drawn = getGrid([   ['X','O','X'],
                            ['X','O','O'],
                            ['O','X','X']]);
    rerender(<PlayStatus gridState={drawn} xIsNext={false} onReset={() => {}} onPlayAgain={onPlayAgain} />);
    expect(screen.getByRole('button', { name: 'Play again?' })).toBeInTheDocument();
});

test('When the game is over, only the result and Play again are shown', () =>{
    let grid = getGrid([['O','O','O'],
                        ['X','X',null],
                        ['X',null,null]]);
    render(<PlayStatus gridState={grid} xIsNext={true} onReset={() => {}} onPlayAgain={() => {}} />);

    expect(statusMessage()).toHaveTextContent('O is the winner!');
    expect(screen.getByRole('button', { name: 'Play again?' })).toBeInTheDocument();
    expect(screen.queryByAltText('reset')).toBeNull();
    expect(screen.getAllByRole('button').length).toEqual(1);
});

test('During the game, the status and reset are shown but not Play again', () =>{
    render(<PlayStatus gridState={new GridState(3,3)} xIsNext={true} onReset={() => {}} onPlayAgain={() => {}} />);

    expect(statusMessage()).toHaveTextContent('Next player: X');
    expect(screen.getByAltText('reset')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Play again?' })).toBeNull();
});

test('The Play again button takes the winner\'s colour, or a neutral one for a draw', () =>{
    let { rerender } = render(<PlayStatus gridState={getGrid([  ['O','O','O'],
                                                                ['X','X',null],
                                                                ['X',null,null]])} xIsNext={true} onReset={() => {}} onPlayAgain={() => {}} />);
    expect(screen.getByRole('button', { name: 'Play again?' })).toHaveClass('play-again-btn', 'play-again-O');

    rerender(<PlayStatus gridState={getGrid([   ['X','X','X'],
                                                ['O','O',null],
                                                [null,null,null]])} xIsNext={false} onReset={() => {}} onPlayAgain={() => {}} />);
    expect(screen.getByRole('button', { name: 'Play again?' })).toHaveClass('play-again-btn', 'play-again-X');

    rerender(<PlayStatus gridState={getGrid([   ['X','O','X'],
                                                ['X','O','O'],
                                                ['O','X','X']])} xIsNext={false} onReset={() => {}} onPlayAgain={() => {}} />);
    expect(screen.getByRole('button', { name: 'Play again?' })).toHaveClass('play-again-btn', 'play-again-draw');
});

test('The winner message is in the winner\'s colour, and a draw message is neutral', () =>{
    let { rerender } = render(<PlayStatus gridState={getGrid([  ['O','O','O'],
                                                                ['X','X',null],
                                                                ['X',null,null]])} xIsNext={true} onReset={() => {}} onPlayAgain={() => {}} />);
    expect(statusMessage()).toHaveTextContent('O is the winner!');
    expect(statusMessage()).toHaveClass('status-msg', 'status-msg-O');

    rerender(<PlayStatus gridState={getGrid([   ['X','O','X'],
                                                ['X','O','O'],
                                                ['O','X','X']])} xIsNext={false} onReset={() => {}} onPlayAgain={() => {}} />);
    expect(screen.getByText("It's a draw!")).toHaveClass('status-msg', 'status-msg-draw');
});

test('Shows the next player and the winner as piece icons', () =>{
    let { container, rerender } = render(<PlayStatus gridState={new GridState(3,3)} xIsNext={false} onReset={() => {}} />);
    expect(container.querySelector('.status-msg .pieceIcon-O')).not.toBeNull();

    let grid = getGrid([['X','X','X'],
                        ['O','O',null],
                        [null,null,null]]);
    rerender(<PlayStatus gridState={grid} xIsNext={false} onReset={() => {}} onPlayAgain={() => {}} />);
    expect(container.querySelector('.status-msg-X .pieceIcon-X')).not.toBeNull();
});
