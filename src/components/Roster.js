import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

function Roster() {

//     {id: 11, team_name: 'Domingo Hand', league_id: 2, user_id: 11, team_players: Array(10), …}
// id: 11
// league:
// be_num: 3
// c_num: 2
// created_at: "2021-10-02T02:59:50.007Z"
// f_num: 2
// g_num: 3
// id: 2
// name: "Flatiron League"
// pf_num: 3
// pg_num: 2
// sf_num: 3
// sg_num: 3
// team_num: 10
// updated_at: "2021-10-02T02:59:50.007Z"
// util_num: 2
// [[Prototype]]: Object
// league_id: 2
// team_name: "Domingo Hand"
// team_players: Array(10)
// 0:
// bench: null
// fantasy_team_id: 11
// id: 101
// player: {id: 560, name: 'LaMarcus Aldridge', fppg: 130.6, nba_team: 'SA', active: true, …}
// player_id: 560
// utility: null
// [[Prototype]]: Object
// 1:
// bench: null
// fantasy_team_id: 11
// id: 102
// player:
// active: true
// created_at: "2021-10-02T02:59:44.673Z"
// fppg: 12.3
// id: 697
// image_url: null
// name: "Chimezie Metu"
// nba_team: "SAC"
// position: "C"
// updated_at: "2021-10-02T02:59:44.673Z"
// [[Prototype]]: Object
// player_id: 697
// utility: null
// [[Prototype]]: Object
// 2: {id: 103, fantasy_team_id: 11, player_id: 795, bench: null, utility: null, …}
// 3: {id: 104, fantasy_team_id: 11, player_id: 646, bench: null, utility: null, …}
// 4: {id: 105, fantasy_team_id: 11, player_id: 761, bench: null, utility: null, …}
// 5: {id: 106, fantasy_team_id: 11, player_id: 695, bench: null, utility: null, …}
// 6: {id: 107, fantasy_team_id: 11, player_id: 675, bench: null, utility: null, …}
// 7: {id: 108, fantasy_team_id: 11, player_id: 519, bench: null, utility: null, …}
// 8: {id: 109, fantasy_team_id: 11, player_id: 444, bench: null, utility: null, …}
// 9: {id: 110, fantasy_team_id: 11, player_id: 694, bench: null, utility: null, …}
// length: 10
// [[Prototype]]: Array(0)
// user_id: 11
// [[Prototype]]: Object

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
        <div>
            {team && team.league ? 
            <div>
                <h1>{team.team_name}</h1>
                <h2>league: {team.league.name}</h2>
            </div> :
            <div>Page is Loading</div>
            }
        </div>


    )
}

export default Roster