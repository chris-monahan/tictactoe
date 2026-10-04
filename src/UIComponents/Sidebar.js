import React from 'react';
import HistoryPanel from './HistoryPanel';

//The components that can be listed in config.sidebar.components, by name
const sidebarComponents = {
    history: HistoryPanel,
};

function Sidebar({ components, expanded = true, onToggle, ...panelProps }) {

    return <div className="sidebarWrapper">
            {onToggle &&
            <button className="sidebarToggle" aria-expanded={expanded}
                aria-label={expanded ? "Hide sidebar" : "Show sidebar"} onClick={onToggle}>
                {expanded ? "»" : "«"}
            </button>}
            {expanded && components.map((name) => {
                const Component = sidebarComponents[name];
                return Component ? <Component key={name} {...panelProps} /> : null;
            })}
        </div>
}

export default Sidebar;
