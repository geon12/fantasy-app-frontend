import SignupForm from "./SignupForm"

function SignUp({setUser}) {
    return(
        <div>
            <h1>Set up a League and Play Fantasy Basketball!</h1>
            <SignupForm setUser={setUser}/>
        </div>
    )
}

export default SignUp