import { useEffect, useState } from "react"
import JoinLeagueCard from "./JoinLeagueCard"

function JoinLeague({user,setUser}) {
    const [leagues,setLeagues] = useState(null)
    useEffect(()=>{
        const token = localStorage.getItem("jwt")
        if (token) {
        
        fetch(`${process.env.REACT_APP_API_URL}/leagues`, {
            method: "GET",
            headers: {
            Authorization: `Bearer ${token}`,
            }
        })
            .then((resp) => resp.json())
            .then((data) => {
                setLeagues(data)
            }).catch(console.log)
        
        }

    },[])

    function populateLeagues() {
        return leagues.map((league) =><JoinLeagueCard user={user} setUser={setUser} league={league} key={league.id}/>)
    }

    
    return (
        <div className="text-center">
            <h1 className="display-1">Find a League to Join!</h1>
            <div>
                {leagues ? populateLeagues(leagues) : null}
            </div>
        </div>
    )
}

export default JoinLeague