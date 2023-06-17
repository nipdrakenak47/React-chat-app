import Login from "./Pages/Login.js";
import Register from "./Pages/Register.js";
import Home from "./Pages/Home.js";
import "./Pages/Login.css";
import { BrowserRouter as Router, Routes, Route,Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext.js";
import { useContext } from "react";


function App() {
  const currentUser = useContext(AuthContext);

  const ProtectedRoute = (props)=>{
    if(currentUser.currentUser===null || Object.keys(currentUser.currentUser).length==0){
      return <Navigate to='login'></Navigate>;
    }
    else{
      return  props.children;
    }
  };
  
  return (
    <Router>
        <Routes>
        <Route path='/'>
          <Route index element={<ProtectedRoute>
                                  <Home></Home>
                                </ProtectedRoute>}/>
          <Route path='login' element={<Login/>}></Route>
          <Route path='register' element={<Register/>}></Route>
        </Route>
        </Routes>
    </Router>
  );
}

export default App;
