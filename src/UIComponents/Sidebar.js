import React from 'react';
import HistoryPanel from './HistoryPanel';

//The components that can be listed in config.sidebar.components, by name
const sidebarComponents = {
    history: HistoryPanel,
};

function Sidebar({ components, expanded = true, onToggle, ...panelProps }) {

    //The toggle stays rendered (and floats in one place) while the panel is hidden
    return <>
            {onToggle &&
            <button className="sidebarToggle" aria-expanded={expanded}
                aria-label={expanded ? "Hide sidebar" : "Show sidebar"} onClick={onToggle}>
                {expanded ? "»" : "«"}
            </button>}
            {expanded &&
            <div className="sidebarPanel">
                {components.map((name) => {
                    const Component = sidebarComponents[name];
                    return Component ? <Component key={name} {...panelProps} /> : null;
                })}
            </div>}
        </>
}

export default Sidebar;
