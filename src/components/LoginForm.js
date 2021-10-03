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
            <input type="text" name="username" value={username} placeholder="Username" onChange={handleUsernameChange}/>
            <input type="password" name="password" value={password} placeholder="Password" onChange={handlePasswordChange}/>
            <button type="submit">Login</button>
        </form>
    )
}

export default LoginForm