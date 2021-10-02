import { useHistory } from "react-router-dom";

function Logout({setUser}) {
    const history = useHistory()

    function handleClick() {
        localStorage.removeItem('jwt')
        setUser(null)
        history.push("/login")
    }
    return (
        <button onClick={handleClick}>Logout</button>
    )
}

export default Logout