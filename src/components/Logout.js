import { useHistory } from "react-router-dom";

function Logout({setUser}) {
    const history = useHistory()

    function handleClick() {
        localStorage.removeItem('jwt')
        setUser(null)
        history.push("/login")
    }
    return (
        <button className="btn btn-outline-success log-button rounded-pill" onClick={handleClick}>Log Out</button>
    )
}

export default Logout