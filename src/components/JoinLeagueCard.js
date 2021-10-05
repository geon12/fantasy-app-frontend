import { useState } from "react"
import CreateTeam from "./CreateTeam"

function JoinLeagueCard({user,setUser,league}) {
    const [showCreate,setShowCreate] = useState(false)
    function handleClick() {
        setShowCreate(prevState => !prevState)
    }
    return (
        <div>
            <h1>{league.name}</h1>
            <h2>{league.team_count}/{league.team_num} team slots filled</h2>
            {league.team_count < league.team_num ? <button onClick={handleClick}>Join!</button> : null}
            {showCreate ? <CreateTeam user={user} setUser={setUser} league={league} handleClick={handleClick}/> : null}
        </div>
    )
}

export default JoinLeagueCard