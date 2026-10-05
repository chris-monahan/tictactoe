# Simple React TicTacToe 

A basic TicTacToe game written in React. This started as an exercise in following the Intro to React tutorial (https://reactjs.org/tutorial/tutorial.html) and recording the steps in a git history. Since then I looked at the result and thought "This is really basic and doesn't really justify the use of something like React" so, as an exercise, I started creating something more sophisticated that merits the use of a UI library like React.

I'm considering future ambitions to develop this into a suite of classic board games; but one step at a time.

## Features

- Two players take turns on one device, X first.
- Any board size, square or not (set in `src/config.js`). A line as long as the board's shorter side wins.
- A line is drawn through the winning pieces.
- When a game ends, the result and a "Play again?" button (both in the winner's colour) replace the status under the board. A reset button is there during play: it goes back to the empty board like the Start step in the history, keeping the moves so Redo can bring them back.
- A running score of X wins, O wins and draws. It lasts until the page is reloaded.
- A history sidebar that slides in from the "History" tab on the right edge of the screen. While it's open, a close arrow sits over the tab's old spot, so a second tap there closes it. It shows a small picture of the board after every move, highlights the move being shown, and jumps back to any move when clicked. Undo and Redo buttons step back and forward one move at a time, beside a "Move 3 of 5" counter.
- The board resizes to fit the window and stays centred. The sidebar opens over the page, so it never moves or shrinks the board.

## Running it

You need [Node.js](https://nodejs.org/) (developed with Node 22). Then:

```sh
npm ci          # install the exact dependency versions from package-lock.json
npm start       # run in development mode at http://localhost:3000
npm test        # run the tests in watch mode
npm run build   # make a production build in build/
```

To run the tests once, as a CI server would: `CI=true npm test`.

`npm run build` with `CI=true` set (as on Vercel) treats lint warnings as errors, so check that before pushing.

## Configuration

Everything is in `src/config.js`:

| Setting | What it does |
| --- | --- |
| `board.sizeX`, `board.sizeY` | Board width and height in squares. The winning line length is the shorter of the two. |
| `board.crossColor`, `board.noughtColor` | Colours of the X and O pieces, their mini-board pictures, their winning lines and their scores. |
| `board.sizing` | How much of the available space the board may take up. Its width share slides from `narrowWidthShare` on windows `narrowScreenWidth` px wide or less to `wideWidthShare` at `wideScreenWidth` px and wider. Its height share is always `heightShare`. |
| `sidebar.enabled` | Whether there is a sidebar (and its tab) at all. |
| `sidebar.components` | Which panels the sidebar shows, in order. Each name is looked up in `src/UIComponents/Sidebar.js`. `'history'` is the only one so far. |
| `sidebar.tabLabel` | The text written down the tab that opens the sidebar. |

## How the code fits together

- `src/GridState.js` holds the board and finds runs of matching pieces in each direction.
  - Coordinates start at 1, and **y = 1 is the bottom row** ("y goes up").
  - `getGridData()` / `setGridData()` swap to top-row-first arrays, which is the order the board is drawn in and the history stores.
- `src/checkWinner.fn.js`: `findWinningLines` returns every winning line's squares. `checkWinner` returns just the winner.
- `src/UIComponents/Game.js` owns the game state: the live grid, the history of moves, whose turn it is, the score and whether the sidebar is open.
- `src/UIComponents/Board.js` draws the squares, then draws the grid lines and any winning lines as SVGs laid over the grid. The SVGs work in grid units (one unit per square), so they line up at any board size or shape.
- `src/adjustBoardSize.fn.js` sizes the squares to fit the window:
  - up to 85% of the available width on screens 500px wide or less (every phone held upright), sliding evenly down to 75% at 1000px wide and above, and up to 75% of the height. All of these numbers are in `config.board.sizing`;
  - squares keep a 1.1:1 width-to-height ratio.
- The sidebar is `Sidebar.js`, plus one component per panel, e.g. `HistoryPanel.js` with `MiniBoard.js`.

Tests sit next to the code they test (`*.test.js`) and use Jest with Testing Library. In tests, `.svg` imports are swapped for a stub (`src/testSupport/svgMock.js`, set up in `package.json`'s `jest` section). Create React App's own SVG handling builds elements React 19 won't render.

## Built with

[Create React App](https://github.com/facebook/create-react-app) (`react-scripts` 5) and React 19. Create React App is no longer maintained; moving to a maintained build tool is tracked in issue #24.
