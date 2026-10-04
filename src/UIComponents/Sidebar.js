import React from 'react';
import HistoryPanel from './HistoryPanel';

//The components that can be listed in config.sidebar.components, by name
const sidebarComponents = {
    history: HistoryPanel,
};

function Sidebar({ components, ...panelProps }) {

    return <div className="sidebarWrapper">
            {components.map((name) => {
                const Component = sidebarComponents[name];
                return Component ? <Component key={name} {...panelProps} /> : null;
            })}
        </div>
}

export default Sidebar;
