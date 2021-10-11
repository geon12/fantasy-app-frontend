import { useEffect, useState } from "react"
import PlayerCard from "./PlayerCard"
import SearchBar from "./SearchBar"
import Spinner from "./Spinner"
import "./styles/AddPlayer.css"

function AddPlayer({team,setTeam,setShowAdd,position}) {
    const [freeAgents,setFreeAgents] = useState(null)
    const [filteredAgents,setFilteredAgents] = useState([])
    
    function filterPlayers(agents) {
        if (position === "Bench" || position === "Utility") {
            return agents.map((freeAgent) => freeAgent.player)
        }
        
        const filteredAgents = agents.map((freeAgent) => freeAgent.player)
        
        return filteredAgents.filter((freeAgent) => freeAgent.position === position)
    }


    function handleSearch(searchTerm) {
        searchTerm = searchTerm.toLowerCase()
        
        if (searchTerm) setFilteredAgents(filterPlayers(freeAgents).filter(player => player.name.toLowerCase().includes(searchTerm)))
            
    }

    function handleCloseClick() {
        setShowAdd(false)
    }

    useEffect( ()=> {
        const token = localStorage.getItem("jwt")
        if (token) {
        
        fetch(`${process.env.REACT_APP_API_URL}/leagues/${team.league_id}/free_agents`, {
            method: "GET",
            headers: {
            Authorization: `Bearer ${token}`,
            }
        })
            .then((resp) => resp.json())
            .then((data) => {
                setFreeAgents(data)
                setFilteredAgents(data.map((freeAgent) => freeAgent.player).filter((freeAgent) => {
                    if (position === 'Bench' || position === 'Utility') {
                        return true
                    }
                    return freeAgent.position === position
                }))
            }).catch(console.log)
        
    }
    },[team.league_id,position])

    function updateRoster(teamPlayer) {
        const updatedTeamPlayers = [...team.team_players]
        updatedTeamPlayers.push(teamPlayer)
        setTeam({...team,team_players: updatedTeamPlayers})
    }
    return (
        <div className="modal">
            <h1>{`Add a ${position} player to your roster`}</h1>
            {freeAgents ?
                <> 
                <button  className="btn btn-lg btn-success mx-1 rounded-pill" onClick={handleCloseClick}>Close</button>
                <SearchBar handleSearch={handleSearch} resource={"Free Agents"}/>
                <table className="table my-2">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Team</th>
                        <th>Position</th>
                        <th>FPPG</th>
                    </tr>
                </thead>
                    <tbody>
                        {filteredAgents.map((agent) => 
                            <PlayerCard 
                                player={agent} 
                                key={agent.id} 
                                handleClose={handleCloseClick} 
                                teamId={team.id}
                                updateRoster={updateRoster}
                                position={position}
                            />) 
                        }
                    </tbody>
                </table>
                </> 
                : 
                <Spinner />}
        </div>
    )
}

export default AddPlayer