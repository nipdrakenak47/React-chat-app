import React, { useContext } from 'react'
import MessageWindow from './MessageWindow'
import MessageInput from './MessageInput'
import { ChatContext } from '../context/ChatContext'

export default function Chat() {
  const {data} = useContext(ChatContext);

  if(!data.chatId){
    return (
      <div className='chat-empty'>
          <p>Choose a chat to start conversation</p>
      </div>
    )
  }
  else{
    return (
      <div className='chat'>
        <div className='upper'>
          <span>{data.user?.displayName}</span>
        </div>
        <MessageWindow></MessageWindow>
        <MessageInput></MessageInput>
      </div>
    )
  }
  
}
