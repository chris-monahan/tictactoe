import { render, screen, fireEvent } from '@testing-library/react';
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

test('The tab shows its label and no close button while collapsed', () =>{
    render(<Sidebar components={['history']} label="History" expanded={false} onToggle={() => {}}
        history={history} stepNumber={0} onJump={() => {}} />);
    let tab = screen.getByRole('button', { name: 'History' });

    expect(tab).toHaveTextContent('History');
    expect(tab).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('button', { name: 'Close History' })).toBeNull();
});

test('The close button appears while expanded and toggles the sidebar', () =>{
    let onToggle = jest.fn();
    render(<Sidebar components={['history']} label="History" expanded={true} onToggle={onToggle}
        history={history} stepNumber={0} onJump={() => {}} />);

    fireEvent.click(screen.getByRole('button', { name: 'Close History' }));
    expect(onToggle).toHaveBeenCalledTimes(1);
});

test('The closed panel stays in the page so it can slide out, but is hidden and unreachable', () =>{
    let { container, rerender } = render(<Sidebar components={['history']} label="History" expanded={false}
        onToggle={() => {}} history={history} stepNumber={0} onJump={() => {}} />);
    let panel = container.querySelector('.sidebarPanel');

    expect(panel).not.toHaveClass('open');
    expect(panel).toHaveAttribute('aria-hidden', 'true');
    expect(panel).toHaveAttribute('inert');

    rerender(<Sidebar components={['history']} label="History" expanded={true}
        onToggle={() => {}} history={history} stepNumber={0} onJump={() => {}} />);
    expect(container.querySelector('.sidebarPanel')).toBe(panel);
    expect(panel).toHaveClass('open');
    expect(panel).not.toHaveAttribute('aria-hidden');
    expect(panel).not.toHaveAttribute('inert');
});
