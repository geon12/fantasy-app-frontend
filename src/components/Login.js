import LoginForm from "./LoginForm"

function Login({setUser}) {
    return (
        <div>
             <h1>Login to your Fantasy Account</h1>
             <LoginForm setUser={setUser}/>
        </div>
    )
}

export default Login