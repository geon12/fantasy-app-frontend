import LeagueEditForm from "./LeagueEditForm"
import {useState} from "react"
function LeagueCard({league,commissioner,updateLeagues,getUserData}) {
    const [showEdit, setShowEdit] = useState(false)
    function handleEdit() {
        setShowEdit(prevState => !prevState)
    }

    function handleSubmit(formData) {
        
        const token = localStorage.getItem("jwt")
        if (token) {
            const configObj = {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                
                body: JSON.stringify(formData)
            }
            
            fetch(`${process.env.REACT_APP_API_URL}/leagues/${league.id}`, configObj)
                .then(resp => resp.json())
                .then( (resp) => {
                    updateLeagues(resp)
                    setShowEdit(false)
                })
                .catch(console.error)
            
        }
    }

    function deleteLeague() {
        const token = localStorage.getItem("jwt")
        if (token) {
            const configObj = {
                method: 'DELETE',
                headers: {
                    
                    Authorization: `Bearer ${token}`
                }
            }
            
            fetch(`${process.env.REACT_APP_API_URL}/leagues/${league.id}`, configObj)
                .then( () => {
                    
                    
                    getUserData()
                   
                })
                .catch(console.error)
            
        }
    }

    return (
        <div>
            { showEdit ?
                <LeagueEditForm league={league} setShowEdit={setShowEdit} handleSubmit={handleSubmit}/> :
                <>
                    <h2>{league.name}</h2>
                    <h3>Max number of Teams: {league.team_num}</h3>
                </> 
            }   
            {commissioner ? 
                <>
                <h3>Commisssioner</h3>
                <button onClick={handleEdit}>{showEdit ? "Close" : "Edit"}</button>
                <button onClick={deleteLeague}>Delete League</button>
                </>
                :
                null
            }
        </div>
    )
}

export default LeagueCard