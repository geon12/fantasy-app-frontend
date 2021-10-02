import { Link } from "react-router-dom"

function TeamCard({team,league}) {
    
    return (
        <Link to={`/fantasy_teams/${team.id}`}>
            <div>
                <h1>{team.team_name}</h1>
                <h2>league: {league.name}</h2>
            </div>
        </Link>
    )
}

export default TeamCard