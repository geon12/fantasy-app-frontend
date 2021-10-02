import { Link } from "react-router-dom";

function Home() {
    return (
        <div>
            <h1>Play Fantasy Basketball!</h1>

            <Link to="/signup"><button>Sign Up</button></Link>
        </div>
    )
}
export default Home