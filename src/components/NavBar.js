import Logout from "./Logout";
import { IoMdBasketball } from 'react-icons/io';
import { Link } from "react-router-dom"
import "./styles/NavBar.css"

function NavBar({user, setUser}) {

    
    return (
        <nav className="navbar navbar-expand-lg">
                    <Link className="nav-item mx-2" to="/"><IoMdBasketball className="icon"/></Link>
                {user ?  
                    <>
                        
                        <Link className="nav-item mx-2" to="/profile">Profile</Link>
                        <Link className="nav-item mx-2" to="/leagues">Leagues</Link>
                        <Link className="nav-item mx-2" to="/join_league">Join a League</Link>
                        <Logout className="nav-item mx-2" setUser={setUser}/>
    
                    </> :
                        <Link className="nav-link mx-2" to="/login">
                            <button className="btn btn-outline-success rounded-pill log-button"> 
                                Login
                            </button>
                        </Link>
                }
        </nav>
    )
}

export default NavBar