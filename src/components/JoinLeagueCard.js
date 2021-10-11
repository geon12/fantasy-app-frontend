import { useState } from "react"
import CreateTeam from "./CreateTeam"

function JoinLeagueCard({user,setUser,league}) {
    const [showCreate,setShowCreate] = useState(false)
    function handleClick() {
        setShowCreate(prevState => !prevState)
    }
    return (
        
            <div className="m-3">
                <div className="dotted-border m-2"></div>
                <h1 className="display-2">{league.name}</h1>
                <h2><span style={{color:"green"}}>{league.team_count}</span>/{league.team_num} team slots filled</h2>
                {league.team_count < league.team_num ? <button className="btn btn-lg btn-success" onClick={handleClick}>Join!</button> : null}
                {showCreate ? <CreateTeam user={user} setUser={setUser} league={league} handleClick={handleClick}/> : null}
                <div className="dotted-border m-2"></div>
            </div>
        
    )
}

export default JoinLeagueCard