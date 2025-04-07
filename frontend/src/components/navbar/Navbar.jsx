import React, { useContext } from 'react'
import { assets } from '../../assets/assets.js'
import styles from './navbar.module.css'

const Navbar = () => {

    return (
        <nav className={styles.navbar}>
        <div className={styles.nav_container}>
            <div className={styles.logo_container} >
                <img src={assets.logo} alt="Clarify" className={styles.logo_img} />
                <span className={styles.logo_text}>CLARIFY</span>
            </div>
        </div>
    </nav>
    )
}

export default Navbar
