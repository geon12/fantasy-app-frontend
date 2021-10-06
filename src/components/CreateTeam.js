import { useState } from "react"
import { useHistory } from "react-router-dom";

function CreateTeam({user,setUser,league,handleClick}) {
    const [name,setName] = useState("")

    const history = useHistory()

    function handleChange(event) {
        setName(event.target.value)
    }

    function updateUser(newTeam) {

        const updatedTeams = [...user.fantasy_teams]
        const updatedLeagues =[...user.leagues]
        updatedTeams.push(newTeam)
        if (!inLeagues(updatedLeagues)) updatedLeagues.push(league)
        setUser({...user,fantasy_teams: updatedTeams,leagues: updatedLeagues})
    }

    function inLeagues(leagues) {
        return leagues.find((lg) => lg.id === league.id)
    }

    function handleSubmit(event) {
        event.preventDefault()
        const token = localStorage.getItem("jwt")
        if (token) {
            const configObj = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                
                body: JSON.stringify({team_name:name,league_id:league.id})
            }
            
            fetch(`${process.env.REACT_APP_API_URL}/fantasy_teams/`, configObj)
                .then(resp => resp.json())
                .then( (resp) => {
                    updateUser(resp)
                    //setShowCreate(false)
                }).then(
                    
                    history.push("/profile")
                )
                .catch(console.error)
            
        }
    }
    return (
        <div className="modal text-center">
            <button onClick={handleClick}>Close</button>
            <h1>Team Name</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" value={name} onChange={handleChange}/>
                <button>Create</button>
            </form>
        </div>
    )
}
export default CreateTeam