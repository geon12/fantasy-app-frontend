import { useState } from "react";
import Login from "./components/Login";

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
  return (
    <div>
      <Login setUser={setUser}/>
    </div>
  );
}

export default App;
