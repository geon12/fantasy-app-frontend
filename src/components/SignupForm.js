import { useState } from "react"

function SignupForm({setUser}) {
    const [passwordConfirmation, setPasswordConfirmation] = useState("")
    const initialState = {
        username: "",
        password: "",
        email: ""

    }
    const [formData,setFormData] = useState(initialState)

    function handleChange(event) {
        const name = event.target.name
        let value = event.target.value

        setFormData({
            ...formData,
            [name]: value
        })
    }

    function handleConfirmationChange(event) {
        setPasswordConfirmation(event.target.value)
        
       
    }
    function handleSubmit(event) {
        event.preventDefault();
        

        fetch(`${process.env.REACT_APP_API_URL}/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({user: formData}),
            })
            .then((resp) => resp.json())
            .then((data) => {
                
                localStorage.setItem("jwt", data.jwt);
                setUser(data.user)
            })
    
    }
    return (
        <form onSubmit={handleSubmit}>
             
            <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="username"
            />
            <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="email"
            />
            <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="password"
            />

            <input
                type="password"
                value={passwordConfirmation}
                onChange={handleConfirmationChange}
                placeholder="confirm password"
            />
            
            <button type="submit" disabled={formData.password !==  passwordConfirmation}>Submit</button>
        </form>
    )
}

export default SignupForm