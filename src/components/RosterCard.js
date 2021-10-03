function RosterCard({teamPlayer,position,team,setTeam}) {
    
    function filterPlayers() {
        const team_players = team.team_players.filter((team_player) => team_player.id !== teamPlayer.id)
        const new_team = {...team}
        new_team.team_players = team_players
        return new_team
    }
    function dropPlayer() {
        const token = localStorage.getItem("jwt")
        if (token) {
        
            fetch(`${process.env.REACT_APP_API_URL}/team_players/${teamPlayer.id}`, {
                method: "DELETE",
                headers: {
                Authorization: `Bearer ${token}`,
                }
            })
                .then(() => {
                    
                    setTeam(filterPlayers())
                }).catch(console.log)
            
        }
    }
    return (
        <div>
            {
                teamPlayer ?
                <div>
                    <h2>{teamPlayer.player.name}</h2>
                    <h3>{teamPlayer.player.nba_team}</h3>
                    <h4>{teamPlayer.player.position}</h4>
                    <h4>fppg: {teamPlayer.player.fppg}</h4>
                    <button onClick={dropPlayer}>Drop Player</button>
                </div>
                :
                <div>{`Add a ${position} player to your roster`}</div>
            }
        </div>
    )
}

export default RosterCard