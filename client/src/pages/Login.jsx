import React from 'react'
import { useState} from 'react';
import axios from 'axios';

const Login = () => {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const handleSubmit= async (e)=>{
    e.preventDefault();

    try{
      const res=await axios.post("http://localhost:4000/api/auth/login",{email,password}); 
      alert(res.data.msg);
      console.log(res.data);
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

        <a> forget password ?</a>

        <button type="submit">Login</button>
        <p>Don't have and account? <a>Sign Up </a></p>
      </form>
        
      </div>
    
  )
}

export default Login
