import React from "react";
import "./Login.css";
import { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import {signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../firebase.js";

export default function Login() {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    let email = e.target[0].value;
    let password = e.target[1].value;

    try {
        await signInWithEmailAndPassword(auth, email, password);
        navigate('/');
    } 
    catch (err) {
       setErr(true);
    }
  };

  return (
    <div className="formContainer-login">
      <div className="formWrapper-login">
        <h1>EasyChat</h1>
        <p>Login</p>
        <form action="" className="LoginForm-login" onSubmit={submitHandler}>
          <input type="email" name="" id="" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button className="btn-1-login">Sign In</button>
        </form>
        <p className="last-login">You don't have an account? <Link to='/register'>Register</Link></p>
        {err && <span style={{color:"red"}}>Email or Password incorrect !</span>}
      </div>
    </div>
  );
}
