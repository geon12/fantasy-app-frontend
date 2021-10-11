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
        <div className="card shadow m-2 p-2">
        <div>
            { showEdit ?
                <LeagueEditForm league={league} setShowEdit={setShowEdit} handleSubmit={handleSubmit}/> :
                <>
                    <h2 className="display-font">{league.name}</h2>
                    <h3>Max # of Teams: {league.team_num}</h3>
                </> 
            }   
            {commissioner ? 
                <>
                <h3 className="commissioner">Commissioner</h3>
                <button className="btn btn-success mx-1" onClick={handleEdit}>{showEdit ? "Close" : "Edit"}</button>
                <button className="btn btn-success mx-1" onClick={deleteLeague}>Delete League</button>
                </>
                :
                null
            }
        </div>
        </div>
    )
}

export default LeagueCard