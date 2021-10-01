import { useState,useEffect } from "react";
import Login from "./components/Login";
import Profile from "./components/Profile"
import Logout from "./components/Logout";
import SignUp from "./components/Signup";

function App() {
  const [user,setUser] = useState(null)
  // const newUserData = {
  //   "username": "icet",
  //   "email" : "ice@gmail.com",
  //   "password": "kobebryant"
  // }
  // useEffect(() =>{
  //   fetch("http://localhost:3000/signup", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //     },
  //     body: JSON.stringify(newUserData),
  //   })
  //     .then((r) => r.json())
  //     .then((data) => {
  //       // save the token to localStorage for future access
  //       localStorage.setItem("jwt", data.jwt);
  //       // save the user somewhere (in state!) to log the user in
  //       //setUser(data.user);
  //       console.log(data)
  //     });
  // },[])

  useEffect(()=> {
    const token = localStorage.getItem("jwt")
    if (token) {
     
      fetch("http://localhost:3000/profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
        .then((resp) => resp.json())
        .then((data) => {
          // save the token to localStorage for future access
          
          // save the user somewhere (in state!) to log the user in
          //setUser(data.user);
          setUser(data)
        });
       
    }
  },[])
  return (
    <div>
      <Logout setUser={setUser}/>
      <SignUp setUser={setUser}/>
      <Login setUser={setUser}/>
      {user ? <Profile user={user}/> : <div>Page is Loading</div>}
    </div>
  );
}

export default App;
