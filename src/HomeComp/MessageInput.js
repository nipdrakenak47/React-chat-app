import React, { useState,useContext } from 'react';
import { ChatContext } from '../context/ChatContext';
import { AuthContext } from '../context/AuthContext';
import { Timestamp, arrayUnion, serverTimestamp, updateDoc } from 'firebase/firestore';
import { v4 as uuid} from 'uuid';
import { db } from '../firebase';
import { doc } from 'firebase/firestore';

export default function MessageInput() {
  
  const [text,setText] = useState("");

  const {currentUser} = useContext(AuthContext);
  const {data} = useContext(ChatContext);

  const sendHandler = async ()=>{
    
    if(text==="" || data.chatId==null){
      return ;
    }
    await updateDoc(doc(db,"chats",data.chatId),{
      messages: arrayUnion({
        id : uuid(),
        text,
        senderId : currentUser.uid,
        date : Timestamp.now()
      })
    })

    await updateDoc(doc(db,'userChats',currentUser.uid),{
      [data.chatId+".lastMessage"]:{
        text
      },
      [data.chatId+".date"]:serverTimestamp()
    })

    await updateDoc(doc(db,'userChats',data.user.uid),{
      [data.chatId+".lastMessage"]:{
        text
      },
      [data.chatId+".date"]:serverTimestamp()
    })

    setText("");
  }

  return (
    <div className='message-input'>
      <input type="text" placeholder='Type Something...' onChange={e=>setText(e.target.value)} value={text}/>
      <div className='send'>
        <button className='btn-send' onClick={sendHandler}>Send</button>
      </div>
    </div>
  )
}
