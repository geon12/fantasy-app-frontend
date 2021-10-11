import { useState } from "react";
import "./styles/TeamCard.css"

function TeamForm({team,setShowEdit,setUser,user}) {
    const [name,setName] = useState(team.team_name)

    function handleChange(event) {
        setName(event.target.value)
    }

    function updateTeams(updatedTeam) {
        return user.fantasy_teams.map((fantTeam) => {
            if (fantTeam.id === team.id) return updatedTeam
            return fantTeam
        })
    }
    function handleSubmit(event) {
        event.preventDefault()
        const token = localStorage.getItem("jwt")
        if (token) {
            const configObj = {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                
                body: JSON.stringify({team_name:name})
            }
            
            fetch(`${process.env.REACT_APP_API_URL}/fantasy_teams/${team.id}`, configObj)
                .then(resp => resp.json())
                .then( (resp) => {
                    const updatedTeams = updateTeams(resp)
                    setUser({...user,fantasy_teams: updatedTeams})
                    setShowEdit(false)
                })
                .catch(console.error)
            
        }
    }
    return (
        <form className="form-group" onSubmit={handleSubmit}>
            <input className="form-control-lg m-2" type="text" value={name} onChange={handleChange}/>
            <button className="btn btn-outline-success team-button">Save</button>
        </form>
    )
}

export default TeamForm