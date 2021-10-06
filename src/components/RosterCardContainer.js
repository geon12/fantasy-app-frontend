import RosterCard from "./RosterCard"
import { v4 as uuidv4 } from 'uuid';

function RosterCardContainer({team,setTeam}) {
    const players = team.team_players
    const league = team.league
    
    function filterPlayers(pos) {
        return players.filter((player) => player.player.position === pos && !player.bench && !player.utility )
    }
    function filterBenchAndUtility(filter) {
        return players.filter((player) => filter ? player.bench : player.utility)
    }
    function populateRosterCards(rosterPlayers, position,num) {
        const cards = rosterPlayers ? rosterPlayers.map((player)=>{
            return <RosterCard teamPlayer={player} position={position} key={uuidv4()} setTeam={setTeam} team={team}/>
        }) : []
        while (cards.length < num) {
            cards.push(<RosterCard position={position} key={uuidv4()} setTeam={setTeam} team={team}/>)
        }

        return cards
    }
    
    return (
        <div>
            <h2>Starting Lineup</h2>

            <h3>Point Guards</h3>
            <h5>max:{league.pg_num}</h5>
            <div className="d-flex justify-content-center">
                {populateRosterCards(filterPlayers('PG'),'PG',league.pg_num)}
            </div>
            <h3>Power Forwards</h3>
            <h5>max:{league.pf_num}</h5>
            <div className="d-flex justify-content-center">
                {populateRosterCards(filterPlayers('PF'),'PF',league.pf_num)}
            </div>
            <h3>Small Forwards</h3>
            <h5>max:{league.sf_num}</h5>
            <div className="d-flex justify-content-center">
                {populateRosterCards(filterPlayers('SF'),'SF',league.sf_num)}
            </div>
            <h3>Shooting Guards</h3>
            <h5>max:{league.sg_num}</h5>
            <div className="d-flex justify-content-center">
                {populateRosterCards(filterPlayers('SG'),'SG',league.sg_num)}
            </div>
            <h3>Centers</h3>
            <h5>max:{league.c_num}</h5>
            <div className="d-flex justify-content-center">
                {populateRosterCards(filterPlayers('C'),'C',league.c_num)}
            </div>
            <h3>Utility Players</h3>
            <h5>max:{league.util_num}</h5>
            <div className="d-flex justify-content-center">
                {populateRosterCards(filterBenchAndUtility(false),'Utility',league.util_num)}
            </div>
            <h2>Bench Players</h2>
            <h5>max:{league.be_num}</h5>
            <div className="d-flex justify-content-center">
                {populateRosterCards(filterBenchAndUtility(true),'Bench',league.be_num)}
            </div>
        </div>
    )
}

export default RosterCardContainer