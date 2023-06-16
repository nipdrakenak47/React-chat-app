import React from 'react';
import Sidebar from '../HomeComp/Sidebar';
import Chat from '../HomeComp/Chat';
import '../HomeComp/comp.css'

export default function Home() {
  return (
    <div className='home'>
        <div className='window'>
            <Sidebar></Sidebar>
            <Chat></Chat>
        </div>
    </div>
  )
}
