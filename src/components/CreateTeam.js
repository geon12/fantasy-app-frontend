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
        <div className="modal">
            <div className="button-left m-2">
                <button className="btn btn-xl" onClick={handleClick}>✖</button>
            </div>
            <div className="complete-center">
                <h1 className="display-2">Team Name</h1>
                <form onSubmit={handleSubmit}>
                    <input className="form-control-lg m-2" type="text" value={name} onChange={handleChange}/>
                    <br/>
                    <button className="btn btn-xl btn-success rounded-pill">Create</button>
                </form>
            </div>
        </div>
    )
}
export default CreateTeam