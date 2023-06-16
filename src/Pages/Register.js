import React from "react";
import "./Register.css";
import Add from "../Images/addAvatar.png";
import { auth, storage,db } from "../firebase.js";
import { createUserWithEmailAndPassword,updateProfile } from "firebase/auth";
import { useState } from "react";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate,Link } from "react-router-dom";


export default function Register() {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    let displayName =  e.target[0].value;
    let email = e.target[1].value;
    let password = e.target[2].value;
    let file = e.target[3].files[0];


    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const storageRef = ref(storage, `files/${displayName}`);

      const uploadTask = uploadBytesResumable(storageRef, file);
 
      uploadTask.on('state_changed', 
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      }, 

        (error) => {
          setErr(true);
        },
        () => {
          
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            if(file===undefined){
              downloadURL = 'https://firebasestorage.googleapis.com/v0/b/chat-88532.appspot.com/o/files%2Fuser_img.png?alt=media&token=beeeb57d-0810-4760-a895-fc56ae843727&_gl=1*4dwe8a*_ga*NTY2OTU4MDg3LjE2ODQ5NDU4MTk.*_ga_CW55HF8NVT*MTY4NjU5ODg0Ni4zMS4xLjE2ODY1OTkyNjEuMC4wLjA.'
            }
            await updateProfile(res.user,{
              displayName : displayName,
              photoURL : downloadURL
            })
          

            await setDoc(doc(db, "users", res.user.uid), {
              uid : res.user.uid,
              name : displayName,
              email : email,
              photoURL : downloadURL
            });

            await setDoc(doc(db, "userChats", res.user.uid), {});

            navigate('/')
    
          });
        }
      );

    } catch (err) {
       setErr(true);
      }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <h1>Kalal Chat</h1>
        <p>Register</p>
        <form onSubmit={submitHandler} className="registerForm">
          <input type="text" placeholder="Your Name" />
          <input type="email" name="" id="" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <label htmlFor="input-file" className="input-file">
            <img src={Add} alt="no" />
            <span>Add an avatar</span>
          </label>
          <input
            style={{ display: "none" }}
            type="file"
            name=""
            id="input-file"
          />
          <button className="btn-1">Sign Up</button>
        </form>
        <p className="last">You have an account? <Link to='/login'>Login</Link></p>
        {err && <span style={{color:"red"}}>Something went wrong !</span>}
      </div>
    </div>
  );
}
