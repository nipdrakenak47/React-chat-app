import React from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'

export default function Nav() {
  const {currentUser} = useContext(AuthContext);
  const {dispatch} = useContext(ChatContext);

  return (
    <div className='nav'>
      <span className='logo'>Kalal Chat</span>
      <div className='user-self'>
        <img src={currentUser.photoURL} alt="" />
        <span>{currentUser.displayName}</span>
        <button onClick={()=>{signOut(auth);
                              dispatch({type:"lgout_user"});}}>Logout</button>
      </div>
    </div>
  )
}
