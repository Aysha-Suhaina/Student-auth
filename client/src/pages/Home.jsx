import React from 'react'
import Login from './Login'
import {assets} from '../assets/assets'
const Home = () => {
  return (
    <div className="homepage-div">
      {/* left side login + right side image ------the login side handled by <Login/> component */}
      <div clasName="bg-img">
        <img src={assets.school_bg}/>
      </div>
      <div className="login-div">
        <Login/>
      </div>

    </div>
  )
}

export default Home
