import React, { useContext } from 'react'
import { assets } from '../../assets/assets.js'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../../context/AppContext.jsx'
import axios from 'axios'
import { toast } from 'react-toastify'
import styles from './navbar.module.css'

const Navbar = () => {

    const navigate = useNavigate()

    const { userData, backendUrl, setUserData, setIsLoggedin, isLoggedin } = useContext(AppContext)

    const logout = async () => {
        try {
            axios.defaults.withCredentials = true
            const {data} = await axios.post(`${backendUrl}/api/auth/logout`)

            if (data.success) {
                setIsLoggedin(false);
                setUserData(null);
                navigate('/');
                toast.success(data.message)
            }
            

        } catch (error) {
            toast.error(error.message)
            console.log(error);
            
        }
    }

    return (
        <nav className={styles.navbar}>
        <div className={styles.nav_container}>
            <div className={styles.logo_container} onClick={() => navigate('/')}>
                <img src={assets.logo} alt="Clarify" className={styles.logo_img} />
                <span className={styles.logo_text}>CLARIFY</span>
            </div>
            
            {isLoggedin ? (
                <div className={styles.user_controls}>
                    <button onClick={logout} className={styles.logout_btn}>
                        <div className={styles.user_initial}>
                        {userData?.name ? userData.name[0].toUpperCase() : 'U'}
                        </div>
                        Logout
                        <img src={assets.arrow_icon} alt="" className={styles.arrow_icon} />
                    </button>
                </div>
            ) : (
                <button onClick={() => navigate('/login')} className={styles.login_btn}>
                    Login
                    <img src={assets.arrow_icon} alt="" className={styles.arrow_icon} />
                </button>
            )}
        </div>
    </nav>
    )
}

export default Navbar
