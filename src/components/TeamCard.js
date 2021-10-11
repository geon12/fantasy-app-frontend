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
        <div className="col-12 card shadow m-2 border-dark p-3 text-center mx-5 gradient-card">
            <Link className="team-card" to={`/fantasy_teams/${team.id}`}>
                <div>
                    <h1>{team.team_name}</h1>
                    <h2>League: {league.name}</h2>
                    
                </div>
            </Link>
            {showEdit ? <TeamForm team={team} setShowEdit={setShowEdit} setUser={setUser} user={user}/> : null}
            <div>
                <button className="btn btn-success rounded-pill" onClick={handleClick}>{showEdit ? "Close" : "Edit"}</button>
            </div>
        </div>
    )
}

export default TeamCard