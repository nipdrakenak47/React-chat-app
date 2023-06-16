import { onAuthStateChanged } from "firebase/auth";
import { createContext,useEffect,useState } from "react";
import {auth} from '../firebase';

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [currentUser,setCurrentUser] = useState({});

    
    console.log('I am in useeffect....');
    const unsub = onAuthStateChanged(auth,(user)=>{
        setCurrentUser(user);
        console.log(user);
        console.log('in user listner....')
    })

    return (
    <AuthContext.Provider value = {{currentUser}}>
        {children}
    </AuthContext.Provider>
    );
}