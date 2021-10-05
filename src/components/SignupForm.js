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
        <div className="text-center">
        <form onSubmit={handleSubmit}>
            <div> 
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="username"
                    className="form-control-lg my-2"
                />
            </div>
            <div>
                <input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="email"
                    className="form-control-lg my-2"
                />
                
            </div>
            <div>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="password"
                    className="form-control-lg my-2"
                />
            </div>
            <div>
                <input
                    type="password"
                    value={passwordConfirmation}
                    onChange={handleConfirmationChange}
                    placeholder="confirm password"
                    className="form-control-lg my-2"
                />
            </div>
            <button type="submit" disabled={formData.password !==  passwordConfirmation}>Submit</button>
        </form>
        </div>
    )
}

export default SignupForm