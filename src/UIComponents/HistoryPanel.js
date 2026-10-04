import React from 'react';
import MiniBoard from './MiniBoard';

function HistoryPanel({ history, stepNumber, onJump }) {

    const steps = history.map((step, move) => {
        const isCurrent = move === stepNumber;
        //X always moves first, so odd moves are X's
        const label = move ? "Move " + move + ": " + (move % 2 === 1 ? "X" : "O") : "Start";

        return <li key={move} className={"historyStep" + (isCurrent ? " current" : "")}>
            <button className="historyBtn" aria-current={isCurrent ? "step" : undefined} onClick={() => onJump(move)}>
                <MiniBoard squares={step.squares} />
                <span className="historyLabel">{label}</span>
            </button>
        </li>
    });

    return <div className="sidebarHistory">
            <h2>History</h2>
            <ol className="historyList">
                {steps}
            </ol>
        </div>
}

export default HistoryPanel;
