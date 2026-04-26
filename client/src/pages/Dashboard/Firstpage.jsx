import './Firstpage.css'
import {useNavigate } from "react-router-dom";
import React from 'react'

const Firstpage = () => {
  const navigate= useNavigate()
  return (
    <div>
        {/* for firt time users - ask them this  */}
      <h1>What you're here for today !</h1>
      <p>Build a new habit</p>
      <p>Break bad habit</p>
      <button onClick={()=> navigate("/timer")}>Start Timer
      </button>
      <p>Social Media Detox</p>
      <p>Complete a task with focus timer</p>
    </div>

    // from next time - save previosu users in database and switch to card/sidebar dashboard
  )
}

export default Firstpage
