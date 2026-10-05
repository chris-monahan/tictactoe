import React, { useEffect, useRef } from 'react';
import MiniBoard from './MiniBoard';
import PieceIcon from './PieceIcon';

//Steps back or forward one move. At either end it stays focusable (aria-disabled rather than
//disabled), so keyboard focus isn't lost while stepping through the game.
function StepButton({ label, iconPath, target, onJump }) {
    const unavailable = target === null;

    return <button className="historyStepBtn" aria-disabled={unavailable ? true : undefined}
            onClick={() => { if(!unavailable) onJump(target); }}>
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d={iconPath} />
            </svg>
            {label}
        </button>
}

function HistoryPanel({ history, stepNumber, onJump }) {
    const lastStep = history.length - 1;
    const currentStep = useRef(null);

    //keep the step being shown in view as Undo and Redo move through a long game
    useEffect(() => {
        currentStep.current?.scrollIntoView?.({ block: 'nearest' });
    }, [stepNumber]);

    const steps = history.map((step, move) => {
        const isCurrent = move === stepNumber;
        //X always moves first, so odd moves are X's
        const label = move ? <>Move {move}: <PieceIcon piece={move % 2 === 1 ? "X" : "O"} /></> : "Start";

        return <li key={move} className={"historyStep" + (isCurrent ? " current" : "")}
                ref={isCurrent ? currentStep : undefined}>
            <button className="historyBtn" aria-current={isCurrent ? "step" : undefined} onClick={() => onJump(move)}>
                <MiniBoard squares={step.squares} />
                <span className="historyLabel">{label}</span>
            </button>
        </li>
    });

    return <div className="sidebarHistory">
            <h2>History</h2>
            <div className="historyControls">
                <StepButton label="Undo" iconPath="M9 14L4 9l5-5M4 9h11a5 5 0 0 1 0 10h-4"
                    target={stepNumber > 0 ? stepNumber - 1 : null} onJump={onJump} />
                <span className="historyCounter">Move {stepNumber} of {lastStep}</span>
                <StepButton label="Redo" iconPath="M15 14l5-5-5-5M20 9H9a5 5 0 0 0 0 10h4"
                    target={stepNumber < lastStep ? stepNumber + 1 : null} onJump={onJump} />
            </div>
            <ol className="historyList">
                {steps}
            </ol>
        </div>
}

export default HistoryPanel;
