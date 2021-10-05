import { useState } from "react"

function LoginForm({setUser}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

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
            
    }

    function handleUsernameChange(event) {
        setUsername(event.target.value)
    }
    function handlePasswordChange(event) {
        setPassword(event.target.value)
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <input type="text" name="username" className="form-control-lg my-2" value={username} placeholder="Username" onChange={handleUsernameChange}/>
            </div>
            <div>
                <input type="password" name="password" className="form-control-lg my-2" value={password} placeholder="Password" onChange={handlePasswordChange}/>
            </div>
            <div>
                <button type="submit" className="btn btn-success mx-2">Login</button>
            </div>
        </form>
    )
}

export default LoginForm