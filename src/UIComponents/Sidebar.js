import React from 'react';
import HistoryPanel from './HistoryPanel';

//The components that can be listed in config.sidebar.components, by name
const sidebarComponents = {
    history: HistoryPanel,
};

function Sidebar({ components, label = "Sidebar", expanded = true, onToggle, ...panelProps }) {

    //The tab sticks out of the screen edge while the panel is hidden and rides on the panel's
    //edge while it's open. The close button then sits over the tab's old spot, so a second tap in
    //the same place closes the panel again. The panel stays in the page while closed so it can
    //slide in and out, but is hidden and out of reach of clicks, keyboard and screen readers.
    return <>
            {onToggle &&
            <button className="sidebarTab" aria-expanded={expanded} onClick={onToggle}>
                <span className="sidebarTabLabel">{label}</span>
            </button>}
            <div className={"sidebarPanel" + (expanded ? " open" : "")}
                aria-hidden={expanded ? undefined : true} inert={!expanded}>
                {onToggle &&
                <button className="sidebarClose" aria-label={"Close " + label} onClick={onToggle}>
                    <span className="sidebarCloseIcon">
                        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                            <path d="M4 12h15M13 6l6 6-6 6" />
                        </svg>
                    </span>
                </button>}
                <div className="sidebarContent">
                    {components.map((name) => {
                        const Component = sidebarComponents[name];
                        return Component ? <Component key={name} {...panelProps} /> : null;
                    })}
                </div>
            </div>
        </>
}

export default Sidebar;
