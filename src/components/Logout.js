function Logout({setUser}) {
    function handleClick() {
        localStorage.removeItem('jwt')
        setUser(null)
    }
    return (
        <button onClick={handleClick}>Logout</button>
    )
}

export default Logout