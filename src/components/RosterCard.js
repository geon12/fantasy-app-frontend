function RosterCard({player,position}) {
    
    return (
        <div>
            {
                player ?
                <div>
                    <h2>{player.name}</h2>
                    <h3>{player.nba_team}</h3>
                    <h4>{player.position}</h4>
                    <h4>fppg: {player.fppg}</h4>
                </div>
                :
                <div>{`Add a ${position} player to your roster`}</div>
            }
        </div>
    )
}

export default RosterCard