import AddPlayer from "./AddPlayer"
import {useState} from "react"
import StatsTable from "./StatsTable"

function RosterCard({teamPlayer,position,team,setTeam,benchable,canStart}) {
    const [showAdd,setShowAdd] = useState(false)
    const [stats,setStats] = useState(null)
    const [date, setDate] = useState("2021-01-01",)

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

    function scrapeData(event) {
        event.preventDefault()
        
        if (token) {
            fetch(`${process.env.REACT_APP_API_URL}/scrape`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({name:teamPlayer.player.name, date:date}),
                })
                .then((resp) => resp.json())
                .then((data) => {
                    
                    setStats(data)
                })
                .catch(console.log)
        }
    }

    function handleChange(event) {
        setDate(event.target.value)
    }

    return (
        <div className="card col-12 shadow gradient-card team-card border-dark text-center p-2 m-2">
            {
                teamPlayer ?
                <div>
                    <h2>{teamPlayer.player.name}</h2>
                    <h3>{teamPlayer.player.nba_team}</h3>
                    <h4>{teamPlayer.player.position}</h4>
                    <h4>fppg: {teamPlayer.player.fppg}</h4>
                    <button className="btn btn-outline-success team-button mx-1 rounded-pill" onClick={dropPlayer}>Drop Player</button>
                    { teamPlayer.bench || !benchable ? null : <button className="btn btn-outline-success team-button mx-1 rounded-pill" onClick={handleBenchClick}>Bench</button> }
                    { ((canStart[0] || canStart[1]) && teamPlayer.bench) ? <button className="btn btn-outline-success team-button mx-1 rounded-pill" onClick={handleStart}>Start</button> : null}
                    <form onSubmit={scrapeData}>
                        <input 
                        type="date" 
                        name="date" 
                        min="1999-01-01" 
                        max="2030-01-01" 
                        required pattern="\d{4}-\d{2}-\d{2}" 
                        value={date}
                        onChange={handleChange}
                        className="form-control-lg m-2"
                        />
                        <button className="btn btn-outline-success team-button mx-1 rounded-pill" type="submit">Get Stats</button>
                    </form>
                    {stats ? <StatsTable stats={stats} /> : null}
                </div>
                :
                <>
                    {
                    showAdd ? 
                    <AddPlayer team={team} setTeam={setTeam} showAdd={showAdd} setShowAdd={setShowAdd} position={position}/>:
                    <div className="display-5 p-5 hover-shadow add-card" onClick={handleClick}>{`Add a ${position} player to your roster`}</div>
                    
                    }
                </>
            }
        </div>
    )
}

export default RosterCard