import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="text-center">
            <h1>Play Fantasy Basketball!</h1>
            <img className="my-2 mb-4 img-fluid" src="bball.jpg" alt="Basketball going into hoop"/>
            <br/>
            <Link to="/signup"><button className="btn btn-success">Sign Up</button></Link>
        </div>
    )
}
export default Home