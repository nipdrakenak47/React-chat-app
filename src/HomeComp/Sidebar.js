import React from 'react';
import Nav from './Nav';
import Search from './Search';
import SidebarChat from './SidebarChat';


export default function Sidebar() {
  return (
    <div className='sidebar'>
      <Nav></Nav>
      <Search></Search>
      <SidebarChat></SidebarChat>
    </div>
  )
}
