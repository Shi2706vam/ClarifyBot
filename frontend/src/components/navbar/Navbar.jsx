import React, { useContext } from 'react'
import { assets } from '../../assets/assets.js'
import { motion } from "framer-motion";
import styles from './navbar.module.css'
import { useAuthStore } from '../../store/authStore.js';

const Navbar = () => {

    const { user, logout } = useAuthStore();
    
        const handleLogout = () => {
            logout()
        };

    return (
        //     <nav className={styles.navbar}>
        //     <div className={styles.nav_container}>
        //         <div className={styles.logo_container} >
        //             <img src={assets.logo} alt="Clarify" className={styles.logo_img} />
        //             <span className={styles.logo_text}>CLARIFY</span>
        //         </div>
        //     </div>
        // </nav>
        <nav className="fixed z-20 top-0 left-0 w-full backdrop-blur-sm bg-black/10 sm:backdrop-blur-none sm:bg-transparent">
            <div className="max-w-[1300px] mx-auto flex justify-between items-center sm:px-24 py-2">
                <div className="flex items-center gap-1.5">
                    <img src={assets.logo} alt="Clarify" className="w-8 h-8" />
                    <span className="text-lg font-semibold text-white">CLARIFY</span>
                </div>

                {user && <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLogout}
                    className="right-0 px-3 py-1 cursor-pointer bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-lg shadow-lg hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                >
                    Logout
                </motion.button>}
            </div>
        </nav>
    )
}

export default Navbar
