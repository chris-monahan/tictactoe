import React from 'react';
import { ReactComponent as CrossIcon } from '../crossIcon.svg';
import { ReactComponent as NoughtIcon } from '../noughtIcon.svg';

//A player's piece drawn in place of their letter in a line of text. The letter is still there,
//hidden, for screen readers and copying.
function PieceIcon({ piece }) {
    const Icon = piece === 'X' ? CrossIcon : NoughtIcon;

    return <span className={"pieceIcon pieceIcon-" + piece}>
            <Icon aria-hidden="true" focusable="false" />
            <span className="visually-hidden">{piece}</span>
        </span>
}

export default PieceIcon;
