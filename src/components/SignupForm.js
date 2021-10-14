import { useState } from "react"
import Spinner from "./Spinner"

function SignupForm({setUser}) {
    const [passwordConfirmation, setPasswordConfirmation] = useState("")
    const [spinner,setSpinner] = useState(false)
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
                setSpinner(false)
                localStorage.setItem("jwt", data.jwt);
                setUser(data.user)
            }).catch(console.log)

        setSpinner(true)
    }
    return (
        <div className="text-center">
            { spinner ?
            <Spinner /> :
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
                <button className="btn btn-success btn-lg rounded-pill" type="submit" disabled={(formData.password !==  passwordConfirmation) || !formData.password}>Submit</button>
            </form> 
            
        }
        </div>
    )
}

export default SignupForm