import GridState from './GridState.js'

function getTestGridA(){
    let testGridA = new GridState(3,3);
    testGridA.setGridData([ ['o','x',null],
                            ['x','o','x'],
                            ['x','x','o']]);
    
    return testGridA;
}

function getTestGridB(){
    let testGridB = new GridState(3,3);
    testGridB.setGridData([ ['o','x',null, 'x'],
                            ['x','o','x', 'x'],
                            ['x','x','o', 'x'],
                            ['x','x','x','x']]);
    
    return testGridB;
}

test('Simple grid dimensions', () =>{
    let threeByThree = new GridState(3,3);
    expect(threeByThree.sizeX).toEqual(3);
    expect(threeByThree.sizeY).toEqual(3);

    let twoByFour = new GridState(2,4);
    expect(twoByFour.sizeX).toEqual(2);
    expect(twoByFour.sizeY).toEqual(4);
})

test('Grid array bounds', () =>{
    let threeByThree = new GridState(3,3);
    expect(threeByThree.gridArray.length).toEqual(3);
    expect(threeByThree.gridArray[0].length).toEqual(3);

    let twoByFour = new GridState(2,4);
    expect(twoByFour.gridArray.length).toEqual(2);
    expect(twoByFour.gridArray[0].length).toEqual(4);
});

test('Get square val', () =>{
    let testGrid = getTestGridA();
    //console.log(JSON.stringify(testGrid)); 
    expect(testGrid.getSquareVal(1,3)).toEqual('o');
    expect(testGrid.getSquareVal(2,3)).toEqual('x');
    expect(testGrid.getSquareVal(3,3)).toEqual(null);

    expect(testGrid.getSquareVal(1,2)).toEqual('x');
    expect(testGrid.getSquareVal(2,2)).toEqual('o');
    expect(testGrid.getSquareVal(3,2)).toEqual('x');

    expect(testGrid.getSquareVal(1,1)).toEqual('x');
    expect(testGrid.getSquareVal(2,1)).toEqual('x');
    expect(testGrid.getSquareVal(3,1)).toEqual('o');

    
});

test('Get grid coordinates', () =>{
    let testGrid = getTestGridA();
    let testGridCoordinates = testGrid.getGridCoordinates();
    expect(testGridCoordinates).toEqual([  [1,1],[1,2],[1,3],
                                            [2,1],[2,2],[2,3],
                                            [3,1],[3,2],[3,3]]);
});

test('Simple set grid data', () =>{
    let threeByThree = new GridState(3,3);
    threeByThree.setGridData([  [1,2,3],
                                [4,5,6],
                                [7,8,9]]);

    expect(threeByThree.getSquareVal(3,3)).toEqual(3);
    expect(threeByThree.getSquareVal(1,2)).toEqual(4);
    expect(threeByThree.getSquareVal(2,1)).toEqual(8);
});

test('Get grid square adjacents', () =>{
    let testGrid = getTestGridA();
    let testAdjacentResults = testGrid.getSquareAdjacents(2,2);
    //console.log(testAdjacentResults);

    expect(testAdjacentResults).toEqual(['o','x',null,'x','x','x','x','o']);
})

test('Get adjacents on edge of grid', () =>{
    let testGrid = getTestGridA();
    let testAdjacentResults = testGrid.getSquareAdjacents(1,1);

    expect(testAdjacentResults).toEqual([null,'x','o',null,'x',null,null,null]);
})

test('Find matching adjacents', () => {
    let testGrid = getTestGridA();
    let testMatchAdjacentResults = testGrid.getSquareAdjacentMatches(2,2);

    expect(testMatchAdjacentResults).toEqual([true,false,false,false,false,false,false,true]);
});

test('Continuous sequences', () => {
    let testGridA = getTestGridA();
    //let testGridB = getTestGridB();
    let testGridC = new GridState(3,3);
    testGridC.setGridData([ ['x','x','x'],
                            ['x','x','x'],
                            ['x','x','x']]);

    let testGridAResults = testGridA.findContinuousSequences();
    //let testGridBResults = testGridB.findContinuousSequences();
    let testGridCResults = testGridC.findContinuousSequences();

    expect(JSON.stringify(testGridAResults)).toEqual(JSON.stringify([
        [["x",[2,1],[1,2]],["o",[3,1],[2,2],[1,3]],["x",[3,2],[2,3]]],
        [["x",[1,1],[1,2]]],
        [["x",[1,2],[2,3]],["x",[2,1],[3,2]]],
        [["x",[1,1],[2,1]]]
    ]));

    expect(JSON.stringify(testGridCResults)).toEqual(JSON.stringify([
        [["x",[2,1],[1,2]],["x",[3,1],[2,2],[1,3]],["x",[3,2],[2,3]]],
        [["x",[1,1],[1,2],[1,3]],["x",[2,1],[2,2],[2,3]],["x",[3,1],[3,2],[3,3]]],
        [["x",[1,1],[2,2],[3,3]],["x",[1,2],[2,3]],["x",[2,1],[3,2]]],
        [["x",[1,1],[2,1],[3,1]],["x",[1,2],[2,2],[3,2]],["x",[1,3],[2,3],[3,3]]]
    ]));
    //TODO figure out what is going on with the 4 length sequences for test grid B

});

test('Continuous sequences with size limit', () => {
    let testGridA = getTestGridA();

    let result1 = testGridA.findContinuousSequences(2);
    let result2 = testGridA.findContinuousSequences(3);
    let result3 = testGridA.findContinuousSequences(4);

    expect(JSON.stringify(result1)).toEqual(JSON.stringify([
        [["x",[2,1],[1,2]],["o",[3,1],[2,2],[1,3]],["x",[3,2],[2,3]]],
        [["x",[1,1],[1,2]]],
        [["x",[1,2],[2,3]],["x",[2,1],[3,2]]],
        [["x",[1,1],[2,1]]]
    ]));

    expect(JSON.stringify(result2)).toEqual(JSON.stringify([
        [["o",[3,1],[2,2],[1,3]]],
        [],
        [],
        []
    ]));

    expect(JSON.stringify(result3)).toEqual(JSON.stringify([
        [],
        [],
        [],
        []
    ]));

});