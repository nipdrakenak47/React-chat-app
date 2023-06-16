import React, { useState,useEffect,useContext } from 'react'
import { doc, onSnapshot } from "firebase/firestore";
import { AuthContext } from '../context/AuthContext';
import { db } from '../firebase';
import { ChatContext } from '../context/ChatContext';


export default function SidebarChat() {
    
    const [chats,setChats] = useState([]);
    const {currentUser} = useContext(AuthContext);
    const {dispatch} = useContext(ChatContext);
    
    useEffect(()=>{
        const getChats = ()=>{
            const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
                setChats(doc.data());
            });
            
            return ()=>{
                unsub();
            }
        }

        if(currentUser.uid){
            getChats();
        }
       
    },[currentUser.uid]);

    const selectHandler = (u)=>{
        dispatch({type:"CHANGE_USER",payload:u});
    }

  return (
    <div className='sidebarchat'>
        { Object.entries(chats)?.sort((a,b)=>b[1].date-a[1].date).map((chat)=>(

            <div className='user' key={chat[0]} onClick={()=>selectHandler(chat[1].userInfo)}>
                <img src={chat[1].userInfo.photoURL} alt="" />
                <div className='user-info'>
                    <span>{chat[1].userInfo.displayName}</span>
                    <p>{chat[1].lastMessage?.text}</p>
                </div>
            </div>
        ))
        }
    </div>
  )
}
