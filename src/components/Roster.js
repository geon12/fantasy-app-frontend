import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import RosterCardContainer from "./RosterCardContainer";
import Spinner from "./Spinner";

function Roster() {

    let { teamId } = useParams();
    const [team ,setTeam] = useState(null)
    useEffect(() => {
        const token = localStorage.getItem("jwt")
        if (token) {
        
            fetch(`${process.env.REACT_APP_API_URL}/fantasy_teams/${teamId}`, {
                method: "GET",
                headers: {
                Authorization: `Bearer ${token}`,
                }
            })
                .then((resp) => resp.json())
                .then((data) => {
                    setTeam(data)
                }).catch(console.log)
        
        }
    },[teamId])
    return (
        <div className="text-center">
            {team && team.league ? 
            <div>
                <h1 className="display-2 display-font">{team.team_name}</h1>
                <h2 className="display-font">League: {team.league.name}</h2>
                <RosterCardContainer team={team} setTeam={setTeam}/>
            </div> :
            <Spinner />
            }
        </div>


    )
}

export default Roster