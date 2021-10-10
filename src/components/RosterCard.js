import AddPlayer from "./AddPlayer"
import {useState} from "react"

function RosterCard({teamPlayer,position,team,setTeam,benchable,canStart}) {
    const [showAdd,setShowAdd] = useState(false)

    const token = localStorage.getItem("jwt")
    
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

    function handleClick() {
        setShowAdd(true)
    }
    
    function updatePlayers(updatedPlayer) {
        const team_players = team.team_players.map((team_player) => {
            if (team_player.id === updatedPlayer.id) return updatedPlayer
            return team_player
        })
        const new_team = {...team}
        new_team.team_players = team_players
        return new_team
    }

    function patchPlayer(data) {
        fetch(`${process.env.REACT_APP_API_URL}/team_players/${teamPlayer.id}`, {
            method: "PATCH",
            headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(data) 
        }).then (resp => resp.json())
            .then((resp) => {
                //console.log(updatePlayers(resp))
                setTeam(updatePlayers(resp))
            }).catch(console.log)

    }

    function handleBenchClick() {
        
        if (benchable && token) {
            patchPlayer({bench:true, utility:false})
        }
        
    }


    function handleStart() {
        if (canStart[0]) {
            patchPlayer({bench:false})
        }
        else if (canStart[1]) {
            patchPlayer({bench:false,utility:true})
        }
    }

    return (
        <div className="card border-dark text-center p-2 m-2">
            {
                teamPlayer ?
                <div>
                    <h2>{teamPlayer.player.name}</h2>
                    <h3>{teamPlayer.player.nba_team}</h3>
                    <h4>{teamPlayer.player.position}</h4>
                    <h4>fppg: {teamPlayer.player.fppg}</h4>
                    <button onClick={dropPlayer}>Drop Player</button>
                    { teamPlayer.bench || !benchable ? null : <button onClick={handleBenchClick}>Bench</button> }
                    { ((canStart[0] || canStart[1]) && teamPlayer.bench) ? <button onClick={handleStart}>Start</button> : null}
                </div>
                :
                <>
                    {
                    showAdd ? 
                    <AddPlayer team={team} setTeam={setTeam} showAdd={showAdd} setShowAdd={setShowAdd} position={position}/>:
                    <div className="display-5 p-5 hover-shadow" onClick={handleClick}>{`Add a ${position} player to your roster`}</div>
                    
                    }
                </>
            }
        </div>
    )
}

export default RosterCard