import init from './init.js'
import adjustBoardSize from './adjustBoardSize.fn';

jest.mock('./adjustBoardSize.fn', () => jest.fn());

test('Resizing is debounced by 200ms', () =>{
    jest.useFakeTimers();
    init({ board: { sizeX: 3, sizeY: 3 }, sidebar: {} });

    window.dispatchEvent(new Event('resize'));
    jest.advanceTimersByTime(100);
    window.dispatchEvent(new Event('resize'));
    jest.advanceTimersByTime(100);
    expect(adjustBoardSize).not.toHaveBeenCalled();

    jest.advanceTimersByTime(100);
    expect(adjustBoardSize).toHaveBeenCalledTimes(1);
    jest.useRealTimers();
});
