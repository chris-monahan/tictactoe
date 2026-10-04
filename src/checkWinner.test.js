import GridState from './GridState.js'
import checkWinner from './checkWinner.fn.js'

//Configure a 4 wide x 3 tall board, as the app would for a non-square game
jest.mock('./config', () => ({ board: { sizeX: 4, sizeY: 3 } }));

test('No winner on an empty board', () =>{
    expect(checkWinner(new GridState(3,3))).toEqual(null);
});

test('Three in a column wins on a 4 wide x 3 tall board', () =>{
    let fourByThree = new GridState(4,3);
    fourByThree.setGridData([   [null,'X',null,null],
                                [null,'X',null,null],
                                ['O','X','O',null]]);
    expect(checkWinner(fourByThree)).toEqual('X');
});

test('Two in a row does not win on a 3x3 board', () =>{
    let threeByThree = new GridState(3,3);
    threeByThree.setGridData([  ['X','X',null],
                                ['O','O',null],
                                [null,null,null]]);
    expect(checkWinner(threeByThree)).toEqual(null);
});
