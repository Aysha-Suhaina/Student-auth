import React from 'react'
import { useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import "./Login.css"
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const handleSubmit= async (e)=>{
    e.preventDefault();
    try{ 
      const res=await axios.post("http://localhost:4000/api/auth/login",{email,password},{withCredentials: true}); 
      alert(res.data.msg);
      if(res.data.success==true){
        localStorage.setItem("user", JSON.stringify(res.data));

      navigate("/dashboard");
      }
      
    }catch(err){
      console.log(err);
      alert("login failed");
    }
  }
  return (
    // this login component 
    // //should have username,pass - ip fields
    //login button with forget password link 
    //register text
    <div className="login">
      <form onSubmit={handleSubmit} className="loginForm"> 
        <input type="email" name="email" value={email} placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
        <input type="password" name="password" value={password} placeholder='Password' onChange={(e) => setPassword(e.target.value)} />

        <Link to="/reset-password">Forgot password?</Link>

        <button type="submit">Login</button>
        <p>Don't have and account? <Link to="/register">Sign Up </Link></p>
      </form>
        
      </div>
  )
}

export default Login
