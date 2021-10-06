import { useState } from "react"
function LeagueEditForm({league,handleSubmit}) {
    const initialState = {
        
        name: league ? league.name : "",
        team_num: league ? league.team_num : 10,
        pg_num: league ? league.pg_num : 1,
        sf_num: league ? league.sf_num : 1,
        pf_num: league ? league.pf_num : 1,
        sg_num: league ? league.sg_num : 1,
        c_num: league ? league.c_num : 1,
        be_num: league ? league.be_num : 3,
        util_num: league ? league.util_num : 2
    }
    const [formData, setFormData] = useState(initialState)

    function handleChange(event) {
        const name = event.target.name
        let value = event.target.value

        setFormData({
            ...formData,
            [name]: value
        })
    }
    function onSubmit(event) {
        event.preventDefault()
        handleSubmit(formData)
    }
    return (
        <form onSubmit={onSubmit}>
            <div>
                <input type="text" name="name" value={formData.name} placeholder="Name" onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="team_num">Number of Teams: </label>
                <input type="number" id="team_num" min="1" max="12" name="team_num" value={formData.team_num} onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="pg_num">Number of Point Guards: </label>
                <input type="number" id="pg_num" min="1" max="3" name="pg_num" value={formData.pg_num} onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="pf_num">Number of Power Forwards: </label>
                <input type="number" id="pf_num" min="1" max="3" name="pf_num" value={formData.pf_num} onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="sg_num">Number of Shooting Guards: </label>
                <input type="number" id="sg_num" min="1" max="3" name="sg_num" value={formData.sg_num} onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="sf_num">Number of Small Forwards: </label>
                <input type="number" id="sf_num" min="1" max="3" name="sf_num" value={formData.sf_num} onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="c_num">Number of Centers: </label>
                <input type="number" id="c_num" min="1" max="3" name="c_num" value={formData.c_num} onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="be_num">Number of Bench Players: </label>
                <input type="number" id="be_num" min="1" max="5" name="be_num" value={formData.be_num} onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="pg_num">Number of Utility Players: </label>
                <input type="number" id="util_num" min="1" max="4" name="util_num" value={formData.util_num} onChange={handleChange}/>
            </div>
            <div>
                <button>Save</button>
            </div>
        </form>
    )
}

export default LeagueEditForm