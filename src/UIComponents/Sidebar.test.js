import { render, screen } from '@testing-library/react';
import Sidebar from './Sidebar';

const history = [{ squares: [[null,null,null],[null,null,null],[null,null,null]] }];

test('Renders the components it is configured with', () =>{
    render(<Sidebar components={['history']} history={history} stepNumber={0} onJump={() => {}} />);
    expect(screen.getByRole('heading', { name: 'History' })).toBeInTheDocument();
});

test('Renders nothing for an empty component list', () =>{
    render(<Sidebar components={[]} history={history} stepNumber={0} onJump={() => {}} />);
    expect(screen.queryByRole('heading', { name: 'History' })).toBeNull();
});

test('Skips component names it does not know', () =>{
    render(<Sidebar components={['notAComponent', 'history']} history={history} stepNumber={0} onJump={() => {}} />);
    expect(screen.getByRole('heading', { name: 'History' })).toBeInTheDocument();
});
