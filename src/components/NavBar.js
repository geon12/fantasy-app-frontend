import Logout from "./Logout";
import { IoMdBasketball } from 'react-icons/io';
import { Link } from "react-router-dom"

function NavBar({user, setUser}) {

    
    return (
        <nav>
                    <Link to="/"><IoMdBasketball /></Link>
                {user ?  
                    <>
                        
                        <Link to="/profile">Profile</Link>
                        <Logout setUser={setUser}/>
    
                    </> :
                        <Link to="/login"> 
                            <button>Login</button>
                        </Link>
                }
        </nav>
    )
}

export default NavBar