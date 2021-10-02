import { useState,useEffect } from "react";
import Login from "./components/Login";
import Profile from "./components/Profile"
import Logout from "./components/Logout";
import SignUp from "./components/Signup";
import Home from "./components/Home";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

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
        }).catch(console.log)
       
    }
  },[])

  
  return (
    <Router>
      <Logout setUser={setUser}/>
      <Switch>
        <Route exact path="/">
          {user ? <Redirect to="/profile" /> : <Home />}
        </Route>
        <Route exact path="/profile">
            {user ? <Profile user={user} setUser={setUser}/> : <div>Profile is Loading</div>}
        </Route>
        <Route exact path="/login">
            {user ? <Redirect to="/profile" /> : <Login setUser={setUser}/>}
        </Route>
        <Route exact path="/signup">
          {user ? <Redirect to="/profile" /> : <SignUp setUser={setUser}/>}
        </Route>
        <Route path="*">
              <div>404 Page Not Found</div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
