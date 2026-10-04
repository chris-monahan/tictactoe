import { render, screen, fireEvent } from '@testing-library/react';
import PlayStatus from './PlayStatus';
import GridState from '../GridState';

function getGrid(gridData){
    let grid = new GridState(gridData[0].length, gridData.length);
    grid.setGridData(gridData);
    return grid;
}

test('Shows whose turn is next', () =>{
    render(<PlayStatus gridState={new GridState(3,3)} xIsNext={false} onReset={() => {}} />);
    expect(screen.getByText('Next player: O')).toBeInTheDocument();
});

test('Shows the winner', () =>{
    let grid = getGrid([['O','O','O'],
                        ['X','X',null],
                        ['X',null,null]]);
    render(<PlayStatus gridState={grid} xIsNext={true} onReset={() => {}} />);
    expect(screen.getByText('O is the winner!')).toBeInTheDocument();
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
