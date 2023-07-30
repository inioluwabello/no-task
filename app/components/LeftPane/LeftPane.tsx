import { BoardList } from "../Board/BoardList"
import { Logo } from "../Logo/Logo"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { pageSlice, selectTheme, testServerAsync, useDispatch, useSelector } from "@/lib/redux";
import styles from "./leftpane.module.css"

export const LeftPane = () => {

    const dispatch = useDispatch();
    const theme = useSelector(selectTheme);
    
    const toggleTheme = (newTheme: string) => {
        // Toggle the theme and dispatch the action
        localStorage.setItem('savedTheme', newTheme);
        dispatch(pageSlice.actions.setTheme(newTheme));
    };

    return (
        <div className={`pane ${styles.leftPane} alt-text`}>
            <Logo />
            <BoardList />

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

            <button onClick={() => dispatch(testServerAsync())}>Test Server</button>
        </div>
    )
}