import React, { useContext, useEffect, useRef } from 'react'
import { ChatContext } from '../context/ChatContext';
import { AuthContext } from '../context/AuthContext';


export default function Message({message}) {

  const ref = useRef()
  const {currentUser} = useContext(AuthContext);
  const {data} = useContext(ChatContext);

  useEffect(()=>{
    ref.current?.scrollIntoView({behavior:'smooth'})
  },[message])

  let cname,user_content;
  if(message.senderId===currentUser.uid){
    cname = "message-owner";
    user_content = 'You'
  }
  else{
    cname = "message"
    user_content = data.user.displayName;
  }
  return (
    <div ref={ref} className={cname}>
      <div className='message-info'>
        <img src={message.senderId===currentUser.uid ? currentUser.photoURL : data.user.photoURL} alt="" />
        <span style={{color:"black"}}>{user_content}</span>
      </div>
      <div className='message-content'>
        <span>{message.text}</span>
      </div>
    </div>
  )
}
