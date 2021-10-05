import SignupForm from "./SignupForm"

function SignUp({setUser}) {
    return(
        <div className="text-center">
            <h1>Set up a League and Play Fantasy Basketball!</h1>
            <SignupForm setUser={setUser}/>
        </div>
    )
}

export default SignUp