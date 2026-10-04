import GridState from './GridState.js'
import checkWinner, { findWinningLines } from './checkWinner.fn.js'

function getGrid(gridData){
    let grid = new GridState(gridData[0].length, gridData.length);
    grid.setGridData(gridData);
    return grid;
}

test('No winner on an empty board', () =>{
    expect(checkWinner(new GridState(3,3))).toEqual(null);
});

test('A full row wins', () =>{
    expect(checkWinner(getGrid([['O','O',null],
                                ['X','X','X'],
                                [null,null,null]]))).toEqual('X');
});

test('A full column wins', () =>{
    expect(checkWinner(getGrid([['X','O',null],
                                ['X','O',null],
                                [null,'O','X']]))).toEqual('O');
});

test('Both diagonals win', () =>{
    expect(checkWinner(getGrid([['X','O',null],
                                ['O','X',null],
                                [null,null,'X']]))).toEqual('X');

    expect(checkWinner(getGrid([['X','X','O'],
                                [null,'O',null],
                                ['O',null,'X']]))).toEqual('O');
});

test('A full board with no line is not a win', () =>{
    expect(checkWinner(getGrid([['X','O','X'],
                                ['X','O','O'],
                                ['O','X','X']]))).toEqual(null);
});

test('A line shorter than the board does not win', () =>{
    expect(checkWinner(getGrid([['X','X',null],
                                ['O','O',null],
                                [null,null,null]]))).toEqual(null);

    expect(checkWinner(getGrid([['X','X','X',null],
                                ['O','O',null,null],
                                ['O',null,null,null],
                                [null,null,null,null]]))).toEqual(null);
});

test('On a non-square board the shorter side sets the line length', () =>{
    //4 wide x 3 tall, so 3 in a line wins
    expect(checkWinner(getGrid([[null,'X',null,null],
                                [null,'X',null,null],
                                ['O','X','O',null]]))).toEqual('X');

    expect(checkWinner(getGrid([[null,null,null,null],
                                ['O','O',null,null],
                                [null,'X','X','X']]))).toEqual('X');
});

test('The winning line length can be given explicitly', () =>{
    let grid = getGrid([['X','X','X',null],
                        ['O','O',null,null],
                        [null,null,null,null],
                        [null,null,null,null]]);

    expect(checkWinner(grid)).toEqual(null);
    expect(checkWinner(grid, 3)).toEqual('X');
});

test('Finds the squares of a winning line', () =>{
    expect(findWinningLines(getGrid([   ['X','X','X'],
                                        ['O','O',null],
                                        [null,null,null]]))).toEqual([
        { value: 'X', squares: [[1,3],[2,3],[3,3]] }
    ]);
});

test('Finds no winning lines when nobody has won', () =>{
    expect(findWinningLines(new GridState(3,3))).toEqual([]);
    expect(findWinningLines(getGrid([   ['X','X',null],
                                        ['O','O',null],
                                        [null,null,null]]))).toEqual([]);
});

test('Finds every winning line when a move completes more than one', () =>{
    let lines = findWinningLines(getGrid([  ['X','X','X'],
                                            ['O','X','O'],
                                            ['O','O','X']]));
    expect(lines).toEqual(expect.arrayContaining([
        { value: 'X', squares: [[1,3],[2,3],[3,3]] },
        { value: 'X', squares: [[3,1],[2,2],[1,3]] },
    ]));
    expect(lines.length).toEqual(2);
});

test('A winning line longer than needed includes all of its squares', () =>{
    //4 wide x 3 tall, so 3 in a line wins, and this row has 4
    expect(findWinningLines(getGrid([   [null,null,null,null],
                                        ['O','O','O',null],
                                        ['X','X','X','X']]))).toEqual(expect.arrayContaining([
        { value: 'X', squares: [[1,1],[2,1],[3,1],[4,1]] },
        { value: 'O', squares: [[1,2],[2,2],[3,2]] },
    ]));
});
