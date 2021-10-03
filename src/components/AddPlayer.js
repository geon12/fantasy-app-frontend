import { useEffect, useState } from "react"
import PlayerCard from "./PlayerCard"
import SearchBar from "./SearchBar"
import "./styles/AddPlayer.css"

function AddPlayer({team,setTeam,setShowAdd,position}) {
    const [freeAgents,setFreeAgents] = useState(null)
    const [filteredAgents,setFilteredAgents] = useState(null)
    
    function filterPlayers() {
        if (position === "Bench" || position === "Utility") {
            return freeAgents.map((freeAgent) => freeAgent.player)
        }
        
        const filteredAgents = freeAgents.map((freeAgent) => freeAgent.player)
        return filteredAgents.filter((freeAgent) => freeAgent.position === position)
    }


    function handleSearch(searchTerm) {
        searchTerm = searchTerm.toLowerCase()
        if (searchTerm) setFilteredAgents(filterPlayers().filter(player => player.name.toLowerCase().includes(searchTerm)))
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
                
            }).catch(console.log)
        
    }
    },[team.league_id])

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
                <button onClick={handleCloseClick}>Close</button>
                <SearchBar handleSearch={handleSearch} resource={"Free Agents"}/>
                {filteredAgents ? filteredAgents.map((agent) => 
                    <PlayerCard 
                        player={agent} 
                        key={agent.id} 
                        handleClose={handleCloseClick} 
                        teamId={team.id}
                        updateRoster={updateRoster}
                        position={position}
                    />) 
                    : null}
                </> 
                : 
                <div>Loading</div>}
        </div>
    )
}

export default AddPlayer