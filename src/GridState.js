import cloneDeep from "lodash/cloneDeep"

export default class GridState {
    constructor(gridSizeX, gridSizeY){

        let gridArray = Array(gridSizeX).fill(null);
        for(let i = 0; i < gridSizeX; i++){
            gridArray[i] = Array(gridSizeY).fill(null);
        }

        this.gridArray = gridArray;
        this.sizeX = gridSizeX;
        this.sizeY = gridSizeY;
    }

    setGridData(gridData, isTransposed){
        this.gridArray = cloneDeep(gridData).reverse();
    }

    getGridData(){
        return cloneDeep(this.gridArray).reverse();
    }


    findContinuousSequences(minNum, maxNum, includeDiagonal){
        //we are going to cycle through all of the elements and check for adjacents
        //then we check recursively to find if it is a continuous sequence of values
        let gridState = this;
        let gridCoords = this.getGridCoordinates();
        let gridAdjacents = Array(gridCoords.length).fill(null);

        //sequences are represented by an array with the sequence value as the first element
        //and the coords as the rest of the array
        //TODO(?): do this with proper types / classes e.g. Range and Sequence classes

        let sequencesFragmented = Array([],[],[],[]);
        let sequencesConsolidated = Array([],[],[],[]);

        for(let i = 0; i < gridCoords.length; i++){
            loadAdjacents(i);
            seekSequences(i);
        }

        sequencesConsolidated = sequencesFragmented.map(consolidateSequences);

        if(!includeDiagonal && typeof includeDiagonal !== "undefined"){
            sequencesConsolidated.splice(0,1);
            sequencesConsolidated.splice(2,1);
        }

        if(Number.isInteger(minNum)){
            for(let seqIndex = 0; seqIndex < sequencesConsolidated.length ; seqIndex++){
                sequencesConsolidated[seqIndex] = sequencesConsolidated[seqIndex].filter((seq) =>{
                    //+1 for the leading entry -1 as it is inclusive    
                    return (seq.length > minNum);
                })
            }
        }

        return sequencesConsolidated;
        //-----------

        function loadAdjacents(i){
            if(gridAdjacents[i] === null){
                gridAdjacents[i] = gridState.getSquareAdjacentMatches(gridCoords[i][0],gridCoords[i][1]);
            }
        }

        function seekSequences(i){
            //if there are no adjacents for this square we can skip
            if(!gridAdjacents[i].includes(true)){
                return;
            }
            let squareCoords = [gridCoords[i][0],gridCoords[i][1]];
            let squareValue = gridState.getSquareVal(squareCoords[0],squareCoords[1]);

            //we only need to check points 0,1,2 and 4 of the adjacents array
            //see comment below for explanation of the adjacents data structure
            if(gridAdjacents[i][0] === true){
                sequencesFragmented[0].push([squareValue,squareCoords,[squareCoords[0] - 1, squareCoords[1] + 1]]);
            }

            if(gridAdjacents[i][1] === true){
                sequencesFragmented[1].push([squareValue,squareCoords,[squareCoords[0], squareCoords[1] + 1]]);
            }

            if(gridAdjacents[i][2] === true){
                sequencesFragmented[2].push([squareValue,squareCoords,[squareCoords[0] + 1, squareCoords[1] + 1]]);
            }

            if(gridAdjacents[i][4] === true){
                sequencesFragmented[3].push([squareValue,squareCoords,[squareCoords[0] + 1, squareCoords[1]]]);
            }
        }

        function consolidateSequences (fragmented) {
            //Iterate through each found pair. 
            //If we match with another pair, start a new consolidated sequence
            //Otherwise if we match with the end of an existing sequence, add to that sequence 
            let consolidated = Array();
            for(let itemIndex = 0; itemIndex < fragmented.length; itemIndex++){
                let foundFlag = false;
                let itemPair = fragmented[itemIndex];

                //The following turns out to be unnecessary and doesn't work right anyway
                //Leaving here for now just for reference and to show where my mind was at

                /*for(let searchIndex = itemIndex; searchIndex < fragmented.length; searchIndex++){
                    let searchPair = fragmented[searchIndex];
                    if(itemPair[0] === searchPair[0] && gridState.coordsEqual(itemPair[2], searchPair[1])){
                        foundFlag = true;
                        consolidated.push([itemPair[0], itemPair[1], itemPair[2], searchPair[2]]);
                        break;
                    }
                }
                if(foundFlag === true){
                    break;
                }*/

                //check existing known sequences
                for(let searchIndex = 0; searchIndex < consolidated.length; searchIndex++){
                    let searchSequence = consolidated[searchIndex]
                    //does the value match?
                    if(itemPair[0] === searchSequence[0]){
                        //can we fit it on the end?
                        if(gridState.coordsEqual(itemPair[1], searchSequence[searchSequence.length - 1])){
                            foundFlag = true;
                            searchSequence.push(itemPair[2]);
                            break;
                        //can we fit it on the beginning?
                        } else if(gridState.coordsEqual(itemPair[2],searchSequence[1])){
                            foundFlag = true;
                            searchSequence.splice(1,0,itemPair[1]);
                            break;
                        }
                    }
                    
                }

                if(foundFlag !== true){
                    //okay so let's just add this as a new entry in the consolidated sequences as is
                    consolidated.push(itemPair);
                }
                
            }
            return consolidated;
            
        } 
    }

    getGridCoordinates(){
        let resultArray = Array();
        let pointX = 1;
        let pointY = 1;
        for(let i = 0; i < this.sizeX; i++){
            for(let i = 0; i < this.sizeY; i++){
                resultArray.push([pointX,pointY]);
                pointY++; 
            }
            pointY = 1;
            pointX++;
        }
        return resultArray;
    }

    coordsEqual(coord1, coord2){
        if(coord1[0] === coord2[0]){
            if(coord1[1] === coord2[1]){
                return true;
            }
        }
        return false;
    }

    getColumn(xPos){
        let returnArray = [];

        //cycle through all of the first dimension (y axis) and collect all of the values at the required x axis point
        for(let i = 0; i < this.sizeY; i++){
            let currentArray = this.gridArray[i];
            let collumnVal = currentArray[xPos];
            returnArray.push(collumnVal);
        }

        return returnArray;
    }

    getRow(yPos){
        return this.gridArray[yPos - 1];
    }

    getSquareVal(xPos, yPos){
        if(this.coordinateExists(xPos,yPos)){
            return this.gridArray[yPos - 1][xPos - 1];
        } else {
            return null;
        }
        //console.log("Querying grid point (X:"+xPos+" , Y:"+yPos+") Value: " +  this.gridArray[yPos - 1][xPos - 1]);
        
    }

    setSquareVal(xPos, yPos, value){
        if(this.coordinateExists(xPos,yPos)){
            this.gridArray[yPos - 1][xPos - 1] = value;
            return true;
        } else {
            return false;
        }
    }

    coordinateExists(xPos, yPos){
        if(xPos < 1 || yPos < 1){
            return false;
        } else if (xPos > this.sizeX || yPos > this.sizeY){
            return false;
        } else {
            return true;
        }
    }

    updateSquareVal(xPos, yPos, newVal){
        this.gridArray[yPos - 1][xPos - 1] = newVal;
    }

    //adjacents are represented by an array of booleans 0 - 7
    //          _ _ _
    //         |0 1 2|
    //         |3 x 4|
    //         |5 6 7|
    //          ‾ ‾ ‾
    // n.b. 0,2,5,7 are the diagonal adjacents 1,3,4,5 are the straight adjacents
    //
    // squares which are against the edge of the grid will simply have null as 
    // the adjacent for the non-existent square

    getSquareAdjacents(xPos, yPos){
        //console.log("Getting Adjacents for " + xPos + ", " + yPos);
        //console.log("====================")
        let gridState = this;
        
        let adjacentsArray = Array(8).fill(null);
        
        adjacentsArray[0] = [xPos - 1, yPos + 1];
        adjacentsArray[1] = [xPos , yPos + 1];
        adjacentsArray[2] = [xPos + 1, yPos + 1];
        
        adjacentsArray[3] = [xPos - 1, yPos];
        adjacentsArray[4] = [xPos + 1, yPos];

        adjacentsArray[5] = [xPos - 1, yPos - 1];
        adjacentsArray[6] = [xPos, yPos - 1];
        adjacentsArray[7] = [xPos + 1, yPos - 1];

        return adjacentsArray.map(checkPosition);

        function checkPosition(){
            let xPos, yPos;
            if(Array.isArray(arguments[0])){
                xPos = arguments[0][0];
                yPos = arguments[0][1];
            } else {
                xPos = arguments[0];
                yPos = arguments[1];
            }

            if(xPos < 0 || yPos < 0){
                return null;
            } else if (xPos > gridState.sizeX || yPos > gridState.sizeY){
                return null;
            } else {
                return gridState.getSquareVal(xPos, yPos);
            }
        }
    }

    getSquareAdjacentMatches(xPos, yPos){
        let squareValue = this.getSquareVal(xPos, yPos);
        let adjacents = this.getSquareAdjacents(xPos, yPos);

        return adjacents.map(checkMatch);

        function checkMatch(adjacentVal){
            if(adjacentVal === null){
                return false;
            }

            if(adjacentVal === squareValue){
                return true;
            } else {
                return false;
            }
        }
    }


}

/*function splitIntoContinuousSequences(srcArray){
    let returnArray = [];
    let currentVal;
    let previousVal;

    for(let i = 0; i < array.length; i++){
        currentVal = srcArray[i];
        if(i === 0 || previousVal !== currentVal){
            returnArray.push(new Array());
        }

        returnArray[returnArray.length - 1].push(currentVal);
    }

    return returnArray;
}*/