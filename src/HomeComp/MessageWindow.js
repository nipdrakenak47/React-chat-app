import React, { useContext, useEffect, useState } from 'react'
import Message from './Message'
import { ChatContext } from '../context/ChatContext'
import { db } from '../firebase';
import { doc,onSnapshot } from 'firebase/firestore';

export default function MessageWindow() {

  const [messages,setMessages] = useState([]);
  const {data} = useContext(ChatContext);

  useEffect(()=>{

    const checkChatId = () => {
      const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
        if(doc.exists()){
          setMessages(doc.data().messages);
        }
        //console.log(doc.data());
      });
  
      return ()=>{
        unsub();
      }
    }

    if(data.chatId){
      checkChatId();
    }
    console.log(messages.length)
  },[data.chatId]);

  return (
    
    <div className='message-window'>
      {messages.map(m=>(
        <Message message={m} key={m.id}></Message>
      ))  }
    </div>
  )
}
