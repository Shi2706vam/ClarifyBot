import React, { useContext } from 'react'
import Navbar from '../components/navbar/Navbar.jsx'
import Header from '../components/header/Header.jsx'
import { AppContext } from '../context/AppContext.jsx'
import Bot from '../components/Bot.jsx'

const Home = () => {

  const { userData, isLoggedin} = useContext(AppContext)


  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-[url("/bg_img.png")] bg-cover bg-center'>
      <Navbar />
      <Header />
      { isLoggedin && userData.AccountVerified && <Bot /> }
    </div>
  )
}

export default Home
