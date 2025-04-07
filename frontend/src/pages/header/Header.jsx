import styles from './header.module.css'
import { motion } from "framer-motion";
import { assets } from "../../assets/assets.js"
// import Bot from "../Bot.jsx"
import { useAuthStore } from "../../store/authStore.js";

const Header = () => {

    const { user, logout } = useAuthStore();

    const handleLogout = () => {
        logout()
    };

    return (
        <div
            className={styles.headerContainer}>
            <div className={styles.innerContainer}>
                <motion.img
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5 }}
                    src={assets.header_img}
                    alt="Header visual"
                    className={styles.headerImage}
                />
                <h1 className={styles.headingPrimary}>
                    Hey {user ? user.name : 'Mate'}!
                    <img
                        src={assets.hand_wave}
                        alt="Waving hand"
                        className={styles.handIcon}
                    />
                </h1>
                <h2 className={styles.headingSecondary}>
                    Welcome to Clarify
                </h2>
                <p className={styles.introText}>
                    "Where question meets clarity", is an advanced AI agent designed to resolve your placement-related queries with precision and ease.
                </p>

            </div>

            <div className={styles.scrollIndicator}>
                <p className={styles.scrollText}>Scroll down</p>
                <div className={styles.arrowContainer}>
                    <img
                        src={assets.arrow_icon}
                        alt="Scroll down"
                        className={styles.scrollArrow}
                    />
                </div>
            </div>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className={styles.button}
            >
                Logout
            </motion.button>

            {/* <Bot/> */}

        </div>
    )
}

export default Header
