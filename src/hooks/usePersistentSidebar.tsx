import { useState, useEffect } from "react";

const SIDEBAR_STATE_KEY = "inset_sidebar_state";

export function usePersistentSidebar(defaultState = false) {
    const [isCollapsed, setIsCollapsed] = useState(defaultState);

    useEffect(() => {
        const savedState = localStorage.getItem(SIDEBAR_STATE_KEY);
        if (savedState !== null) {
            setIsCollapsed(savedState === "collapsed");
        }
    }, []);

    const toggleSidebar = () => {
        const newState = !isCollapsed;
        setIsCollapsed(newState);
        localStorage.setItem(SIDEBAR_STATE_KEY, newState ? "collapsed" : "expanded");
    };

    return { isCollapsed, toggleSidebar };
}