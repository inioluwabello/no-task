import { BoardList } from "../Board/BoardList"
import { Logo } from "../Logo/Logo"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { pageSlice, selectTheme, useDispatch, useSelector } from "@/lib/redux";
import styles from "./leftpane.module.css"
import { faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";

export const LeftPane = () => {

    const dispatch = useDispatch();
    const theme = useSelector(selectTheme);
    
    const toggleTheme = (newTheme: string) => {
        // Toggle the theme and dispatch the action
        localStorage.setItem('savedTheme', newTheme);
        dispatch(pageSlice.actions.setTheme(newTheme));
    };

    const [sideBarVisible, setSideBarVisibility] = useState(true);
    const toggleSidebar = (isVisible: boolean) => {
        setSideBarVisibility(isVisible)
    }

    const showSidebar = () => {
        setSideBarVisibility(true)
    }

    return (
        <div className={`pane 
            ${styles.leftPane} 
            ${sideBarVisible ? 
                styles.sideBarVisible : ''} alt-text`}>
            
            <Logo sideBarVisible={sideBarVisible} showSidebar={showSidebar} />

            {sideBarVisible && <BoardList /> }

            {sideBarVisible && <div className={styles.leftPaneFooter}>
                <div className="theme-toggle text-center">
                    <button className="switch-btn alt-text" onClick={() => toggleTheme('light')}>
                        <FontAwesomeIcon icon={faSun} width={16} height={16} />
                    </button>

                    <div 
                        onClick={() => toggleTheme(theme === 'light' ? 'dark' : 'light')}
                        className={`switch pointer ${theme === 'light' ? 'text-left' : 'text-right'}`} >
                        <div className="switch-knob"></div>
                    </div>

                    <button className="switch-btn alt-text" onClick={() => toggleTheme('dark')}>
                        <FontAwesomeIcon icon={faMoon} width={16} height={16} />
                    </button>
                </div>

                <button 
                    onClick={() => toggleSidebar(false)}
                    className="hide-sidebar-btn pointer alt-text">
                    <FontAwesomeIcon icon={faEyeSlash} 
                        width={16}
                        height={16} />{" "}
                    Hide Sidebar
                </button>
            </div>}
        </div>
    )
}