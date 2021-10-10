import { useState } from "react"
import LeagueCard from "./LeagueCard"
import LeagueEditForm from "./LeagueEditForm"
import Spinner from "./Spinner"

function Leagues({user,setUser,getUserData}) {
    const [showCreate,setShowCreate] = useState(false)
    const [spinner, setSpinner] = useState(false)
    function handleCreate() {
        setShowCreate(prevState => !prevState)
    }
    function populateCards() {
        
        const leagues = []
        
        user.leagues.forEach((league) => {
            if (!leagues.find((lg)=> parseInt(lg.key,10) === league.id)) {
                const commissioner = user.commissioners.find((com) => com.league_id === league.id)
                if (commissioner) {
                    leagues.push(<LeagueCard league={league} commissioner={commissioner} updateLeagues={updateLeagues} getUserData={getUserData} key={league.id}/>)
                } else {

                leagues.push(<LeagueCard league={league} updateLeagues={updateLeagues} getUserData={getUserData} key={league.id}/>)
                }
            }
        })

        return leagues
    }

    function updateLeagues(editedLeague) {
        const updatedLeagues = user.leagues.map((league) => {
            if (league.id === editedLeague.id) {
                return editedLeague
            }
            else {
                return league
            }
        })
        setUser({...user,leagues: updatedLeagues})
    }

    function addToLeagues(newLeague) {
        const updatedLeagues = [...user.leagues]
        updatedLeagues.push(newLeague)
        const commissioners = [...user.commissioners]
        const newCommissioner = {user_id:user.id, league_id: newLeague.id}
        commissioners.push(newCommissioner)
        setUser({...user,leagues: updatedLeagues, commissioners: commissioners})
    }



    function handleSubmit(formData) {
        setShowCreate(false)
        setSpinner(true)
        const token = localStorage.getItem("jwt")
        if (token) {
            const configObj = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                
                body: JSON.stringify(formData)
            }
            
            fetch(`${process.env.REACT_APP_API_URL}/leagues/`, configObj)
                .then(resp => resp.json())
                .then( (resp) => {
                    setSpinner(false)
                    addToLeagues(resp)
                    getUserData()
                    setShowCreate(false)
                })
                .catch(console.error)
            
        }
    }

    
    return (
        <div className="text-center">
            <h1>Manage your Leagues</h1>
            {showCreate ? <LeagueEditForm handleSubmit={handleSubmit}/> : null}
            <button onClick={handleCreate}>{showCreate ? "Close" : "Create a League!"}</button>
            {populateCards()}
            {spinner ? <Spinner /> : null}
        </div>
    )
}

export default Leagues