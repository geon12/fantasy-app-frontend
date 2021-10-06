import { Link } from "react-router-dom"
import { useState } from "react"
import TeamForm from "./TeamForm"
import "./styles/TeamCard.css"
function TeamCard({team,league,setUser, user}) {
    const [showEdit, setShowEdit] = useState(false)
    function handleClick() {
        setShowEdit(prevState => !prevState)
    }
    return (
        <div className="card m-2 border-dark p-2 text-center mx-5">
            <Link className="team-card" to={`/fantasy_teams/${team.id}`}>
                <div>
                    <h1>{team.team_name}</h1>
                    <h2>league: {league.name}</h2>
                    
                </div>
            </Link>
            {showEdit ? <TeamForm team={team} setShowEdit={setShowEdit} setUser={setUser} user={user}/> : null}
            <div>
                <button onClick={handleClick}>{showEdit ? "Close" : "Edit"}</button>
            </div>
        </div>
    )
}

export default TeamCard