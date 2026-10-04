import React from 'react';

function Score({ score }) {

    return <div className="score" aria-label="Score">
            <span className="score-X">X: {score.X}</span>
            <span className="score-O">O: {score.O}</span>
            <span className="score-draws">Draws: {score.draws}</span>
        </div>
}

export default Score;
