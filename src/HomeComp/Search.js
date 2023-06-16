import React from 'react'
import { useState,useContext } from 'react'
import { collection, query, where,getDocs,setDoc,getDoc,doc,updateDoc,serverTimestamp} from "firebase/firestore";
import { db } from '../firebase';
import { AuthContext } from '../context/AuthContext';



export default function Search() {

  const [userName,setUserName] = useState("");
  const [user,setUser] = useState(null);
  const [err,setErr] = useState(false);
  const {currentUser} = useContext(AuthContext);

  const searchHandler = async () => {
    const userRef = collection(db, "users");
    const q = query(userRef, where("name", "==", userName));

    try{
      const querySnapshot = await getDocs(q);
      if(querySnapshot.empty){
        setUser(null);
      }
      querySnapshot.forEach((doc) => {
          setUser(doc.data());
      });
    }
    catch(err){
      setErr(true);
    }
  }


  const keyDownHandler = (e) => {
    if(e.code==='Enter'){
      console.log('Hi I am key down @@@')
      searchHandler();
    }
  }

  const selectHandler = async () => {
    const combinedId = currentUser.uid > user.uid ? currentUser.uid+user.uid : user.uid+currentUser.uid;

    try{
      const res = await getDoc(doc(db,'chats',combinedId));
      if(!res.exists()){
        await setDoc(doc(db,'chats',combinedId),{messages:[]});
        
        await updateDoc(doc(db,'userChats',currentUser.uid),{
          [combinedId+".userInfo"]:{
            uid:user.uid,
            displayName:user.name,
            photoURL:user.photoURL
          },
          [combinedId+'.date']:serverTimestamp()
        });

        await updateDoc(doc(db,'userChats',user.uid),{
          [combinedId+".userInfo"]:{
            uid:currentUser.uid,
            displayName:currentUser.displayName,
            photoURL:currentUser.photoURL
          },
          [combinedId+'.date']:serverTimestamp()
        });
      }
    }
    catch(err){
      throw('Something went wrong!')
    }
    
    setUser(null);
    setUserName("");
  }

  return (
    <div className='search'>
        <div className='input'>
            <input type="text" placeholder='find a user...' onKeyDown={keyDownHandler} onChange={e=>setUserName(e.target.value)} value={userName}/>
        </div>
        {err && <span>user not found!</span>}
        {user && <div className='user' onClick={selectHandler}>
            <img src={user.photoURL} alt="not found" />
            <span>{user.name}</span>
        </div>}

    </div>
  )
}
