import { Link } from "react-router-dom";
import "./styles/Home.css"

function Home() {
    return (
        <div className="text-center" style={{
        backgroundImage: "url('bball3.jpg')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "100vh" }
    }>
            <h1 className="display-1 home-title">FANTASY BASKETBALL</h1>
            <br/>
            <Link to="/signup"><button className="btn btn-success btn-xl rounded-pill">Sign Up</button></Link>
        </div>
    )
}
export default Home