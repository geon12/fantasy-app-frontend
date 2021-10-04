function JoinLeagueCard({league}) {

    return (
        <div>
            <h1>{league.name}</h1>
            <h2>{league.team_count}/{league.team_num} team slots filled</h2>
        </div>
    )
}

export default JoinLeagueCard