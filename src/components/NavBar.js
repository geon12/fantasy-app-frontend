import Logout from "./Logout";
import { IoMdBasketball } from 'react-icons/io';
import { Link } from "react-router-dom"
import "./styles/NavBar.css"

function NavBar({user, setUser}) {

    
    return (
        <nav className="navbar">
                    <Link className="nav-item" to="/"><IoMdBasketball className="icon"/></Link>
                {user ?  
                    <>
                        
                        <Link className="nav-item" to="/profile">Profile</Link>
                        <Link className="nav-item" to="/leagues">Leagues</Link>
                        <Link className="nav-item" to="/join_league">Join a League</Link>
                        <Logout className="nav-item" setUser={setUser}/>
    
                    </> :
                        <Link className="nav-item" to="/login"> 
                            Login
                        </Link>
                }
        </nav>
    )
}

export default NavBar