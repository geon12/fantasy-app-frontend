import SignupForm from "./SignupForm"
import "./styles/Signup.css"

function SignUp({setUser}) {
    return(
        <div className="text-center" style={{backgroundImage: "linear-gradient(180deg, rgba(0,255,0,0), rgba(0,255,0,.6))",height: "100vh"
        }}>
            <h1 className="display-3 header-disp">Set up a League and Play Fantasy Basketball!</h1>
            <SignupForm setUser={setUser}/>
        </div>
    )
}

export default SignUp