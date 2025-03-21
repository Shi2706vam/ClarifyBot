import React, { useContext } from 'react'
import { assets } from '../../assets/assets.js'
import { AppContext } from '../../context/AppContext.jsx'
import { useNavigate } from 'react-router-dom'
import styles from './header.module.css'
import Footer from '../footer/Footer.jsx'

const Header = () => {
    const { userData, isLoggedin } = useContext(AppContext)

    const navigate = useNavigate()

    return (
        <div className={styles.headerContainer}>
            <div className={styles.innerContainer}>
            <img
                src={assets.header_img}
                alt="Header visual"
                className={styles.headerImage}
            />
            <h1 className={styles.headingPrimary}>
                Hey {userData.isAccountVerified ? userData.name : 'Mate'}!
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
            {isLoggedin && (
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
            )}
            </div>
            {isLoggedin ? "" : (<Footer />) }
        </div>
    )
}

export default Header
