function TeamCard({team,league}) {
    
    return (
        <div>
            <h1>{team.team_name}</h1>
            <h2>league: {league.name}</h2>
        </div>
    )
}

export default TeamCard