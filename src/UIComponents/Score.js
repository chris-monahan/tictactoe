import React from 'react';
import PieceIcon from './PieceIcon';

function Score({ score }) {

    return <div className="score" aria-label="Score">
            <span className="score-X"><PieceIcon piece="X" />: {score.X}</span>
            <span className="score-O"><PieceIcon piece="O" />: {score.O}</span>
            <span className="score-draws">Draws: {score.draws}</span>
        </div>
}

export default Score;
