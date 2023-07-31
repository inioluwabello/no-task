import styles from "./logo.module.css"

export const Logo = ({ sideBarVisible, showSidebar }: { sideBarVisible: boolean, showSidebar: () => void }) => {

    const handleLogoClick = () => {
        showSidebar()
    }
    return (
        <>
            {sideBarVisible && <div className={`pointer ${styles.logo}`}>
                <span></span>
                <span></span>
                <span></span>
                Kaban
            </div>}

            {!sideBarVisible && <div 
                onClick={handleLogoClick}
                className={`pointer ${styles.logo} ${styles.altLogo}`}>
                <span></span>
                <span></span>
                <span></span>
            </div>}
        </>
    )
}