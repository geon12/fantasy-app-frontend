import { Link } from "react-router-dom"
import { useState } from "react"
import TeamForm from "./TeamForm"
function TeamCard({team,league,setUser, user}) {
    const [showEdit, setShowEdit] = useState(false)
    function handleClick() {
        setShowEdit(prevState => !prevState)
    }
    return (
        <div>
            <Link to={`/fantasy_teams/${team.id}`}>
                <div>
                    <h1>{team.team_name}</h1>
                    <h2>league: {league.name}</h2>
                    
                </div>
            </Link>
            {showEdit ? <TeamForm team={team} setShowEdit={setShowEdit} setUser={setUser} user={user}/> : null}
            <button onClick={handleClick}>{showEdit ? "Close" : "Edit"}</button>
        </div>
    )
}

export default TeamCard