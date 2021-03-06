function PlayerCard({player,handleClose,teamId,updateRoster,position}) {
    let bench = position === "Bench" ? true :false
    let utility = position === "Utility" ? true : false
    
    function addToRoster() {
        const token = localStorage.getItem("jwt")
        if (token) {
            fetch(`${process.env.REACT_APP_API_URL}/team_players`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({player_id:player.id,fantasy_team_id:teamId,bench:bench,utility:utility}),
                })
                .then((resp) => resp.json())
                .then((data) => {
                    updateRoster(data)
                })
                .catch(console.log)
        }
    
        handleClose()
    }
    return (
    
        <tr>
            <td>{player.name}</td>
            <td>{player.nba_team}</td>
            <td>{player.position}</td>
            <td>{player.fppg}</td>
            <td><button className="btn btn-outline-success team-button mx-1 rounded-pill" onClick={addToRoster}>Add to Roster</button></td>
        </tr>
    )
}

export default PlayerCard