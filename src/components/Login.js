import LoginForm from "./LoginForm"
import "./styles/Signup.css"

function Login({setUser}) {
    return (
        <div className="text-center"  style={{backgroundImage: "linear-gradient(180deg, rgba(0,255,0,0), rgba(0,255,0,.6))",height: "100vh"}}>
             <h1 className="display-3 header-disp">Login to your Fantasy Account</h1>
             <LoginForm setUser={setUser}/>
        </div>
    )
}

export default Login