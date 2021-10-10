import { useState } from "react"
import Spinner from "./Spinner";

function LoginForm({setUser}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [spinner,setSpinner] = useState(null)

    function handleSubmit(event) {
        event.preventDefault();
        const configObj = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(
                { "user" :{ 
                "username": username, 
                "password": password 
                }
            })
        }
        fetch(`${process.env.REACT_APP_API_URL}/login`,configObj)
            .then((resp) => {
                if (resp.ok) {
                    resp.json().then(resp => {
                        localStorage.setItem("jwt", resp.jwt)
                        setUser(resp.user)
                        
                    })
                }
                else {
                    resp.json().then((resp) => resp.errors)
                }
            }).catch(console.log)
        setSpinner(true)
    }

    function handleUsernameChange(event) {
        setUsername(event.target.value)
    }
    function handlePasswordChange(event) {
        setPassword(event.target.value)
    }

    return (
        <div>
            {   spinner ?
                <Spinner /> :
                <form onSubmit={handleSubmit}>
                    <div>
                        <input type="text" name="username" className="form-control-lg my-2" value={username} placeholder="Username" onChange={handleUsernameChange}/>
                    </div>
                    <div>
                        <input type="password" name="password" className="form-control-lg my-2" value={password} placeholder="Password" onChange={handlePasswordChange}/>
                    </div>
                    <div>
                        <button type="submit"  className="btn btn-success btn-lg rounded-pill mx-2">Login</button>
                    </div>
                </form>
            }
        </div>
    )
}

export default LoginForm