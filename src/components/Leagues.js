import { useState } from "react"
import LeagueCard from "./LeagueCard"
import LeagueEditForm from "./LeagueEditForm"

function Leagues({user,setUser,getUserData}) {
    const [showCreate,setShowCreate] = useState(false)
    function handleCreate() {
        setShowCreate(prevState => !prevState)
    }
    function populateCards() {
        
        return user.leagues.map((league) => {
            
            const commissioner = user.commissioners.find((com) => com.league_id === league.id)
            if (commissioner) {
                return <LeagueCard league={league} commissioner={commissioner} updateLeagues={updateLeagues} getUserData={getUserData} key={league.id}/>
            }

            return <LeagueCard league={league} updateLeagues={updateLeagues} getUserData={getUserData} key={league.id}/>
        })
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
                    
                    addToLeagues(resp)
                    getUserData()
                    setShowCreate(false)
                })
                .catch(console.error)
            
        }
    }

    
    return (
        <div>
            <h1>Manage your Leagues</h1>
            {showCreate ? <LeagueEditForm handleSubmit={handleSubmit}/> : null}
            <button onClick={handleCreate}>{showCreate ? "Close" : "Create a League!"}</button>
            {populateCards()}
        </div>
    )
}

export default Leagues