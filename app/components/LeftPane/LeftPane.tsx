import { useContext } from "react";
import { BoardList } from "../Board/BoardList"
import { Logo } from "../Logo"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { pageSlice, selectTheme, useDispatch, useSelector } from "@/lib/redux";

export const LeftPane = () => {

    const dispatch = useDispatch();
    const theme = useSelector(selectTheme);

    return (
        <div className={`left-pane`}>
            <Logo />
            <BoardList />

            <div className="theme-toggle text-center">
                <button onClick={() => dispatch(pageSlice.actions.setTheme(theme))}>
                    <FontAwesomeIcon icon={faSun} width={16} height={16} />
                </button>

                <div className="switch" onClick={() => dispatch(pageSlice.actions.setTheme(theme))}>
                    <div className="switch-knob"></div>
                </div>

                <button onClick={() => dispatch(pageSlice.actions.setTheme(theme))}>
                    <FontAwesomeIcon icon={faMoon} width={16} height={16} />
                </button>
            </div>
        </div>
    )
}