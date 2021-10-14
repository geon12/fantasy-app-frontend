import { useState,useEffect } from "react";
import Login from "./components/Login";
import Profile from "./components/Profile"
import SignUp from "./components/Signup";
import Home from "./components/Home";
import Roster from "./components/Roster"

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import NavBar from "./components/NavBar";
import Leagues from "./components/Leagues";
import JoinLeague from "./components/JoinLeague";
import Spinner from "./components/Spinner";

function App() {
  const [user,setUser] = useState(null)
 
  function getUserData() {
    const token = localStorage.getItem("jwt")
    if (token) {
     
      fetch(`${process.env.REACT_APP_API_URL}/profile`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
        .then((resp) => resp.json())
        .then((data) => {
          setUser(data)
        }).catch(console.log)
       
    }
  }
  useEffect(()=> {
    getUserData()
  },[])

  
  return (
    <Router>
      <NavBar user={user} setUser={setUser} />
      <Switch>
        <Route exact path="/">
          {user ? <Redirect to="/profile" /> : <Home />}
        </Route>
        <Route exact path="/profile">
            {user ? <Profile user={user} setUser={setUser}/> : <Spinner />}
        </Route>
        <Route exact path="/login">
            {user ? <Redirect to="/profile" /> : <Login setUser={setUser}/>}
        </Route>
        <Route exact path="/signup">
          {user ? <Redirect to="/profile" /> : <SignUp setUser={setUser}/>}
        </Route>
        <Route exact path="/leagues">
          {user ? <Leagues user={user} setUser={setUser} getUserData={getUserData}/> : <Spinner />}
        </Route>
        <Route exact path="/join_league">
          {user ? <JoinLeague user={user} setUser={setUser} getUserData={getUserData}/> : <Spinner />}
        </Route>
        <Route exact path="/fantasy_teams/:teamId">
            {user ? <Roster /> : null}
        </Route>
        <Route path="*">
              <div>404 Page Not Found</div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
