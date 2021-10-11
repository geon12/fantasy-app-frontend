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
            return <RosterCard 
                    teamPlayer={player} 
                    position={position} 
                    key={uuidv4()} 
                    setTeam={setTeam} 
                    team={team} 
                    benchable={benchable()} 
                    canStart={canStart(player.player.position)}
                    />
        }) : []
        while (cards.length < num) {
            cards.push(<RosterCard position={position} key={uuidv4()} setTeam={setTeam} team={team}/>)
        }

        return cards
    }

    function benchable() {
        
        return filterBenchAndUtility(true).length < league.be_num
    }

    function canStart(pos) {
        
        return [filterPlayers(pos).length < league[`${pos.toLowerCase()}_num`] , filterBenchAndUtility(false).length < league.util_num]
    }
    
    return (
        <div>
            <h2 className="display-4">Starting Lineup</h2>
            <div className="dotted-border my-3"></div>
            <h3 className="display-5">Point Guards</h3>
            <h5 className="display-6">max: {league.pg_num}</h5>
            <div className="d-flex row justify-content-center">
                {populateRosterCards(filterPlayers('PG'),'PG',league.pg_num)}
            </div>
            <div className="dotted-border my-3"></div>
            <h3 className="display-5">Power Forwards</h3>
            <h5 className="display-6">max: {league.pf_num}</h5>
            <div className="d-flex row justify-content-center">
                {populateRosterCards(filterPlayers('PF'),'PF',league.pf_num)}
            </div>
            <div className="dotted-border my-3"></div>
            <h3 className="display-5">Small Forwards</h3>
            <h5 className="display-6">max: {league.sf_num}</h5>
            <div className="d-flex row justify-content-center">
                {populateRosterCards(filterPlayers('SF'),'SF',league.sf_num)}
            </div>
            <div className="dotted-border my-3"></div>
            <h3 className="display-5">Shooting Guards</h3>
            <h5 className="display-6">max: {league.sg_num}</h5>
            <div className="d-flex row justify-content-center">
                {populateRosterCards(filterPlayers('SG'),'SG',league.sg_num)}
            </div>
            <div className="dotted-border my-3"></div>
            <h3 className="display-5">Centers</h3>
            <h5 className="display-6">max: {league.c_num}</h5>
            <div className="d-flex row justify-content-center">
                {populateRosterCards(filterPlayers('C'),'C',league.c_num)}
            </div>
            <div className="dotted-border my-3"></div>
            <h3 className="display-5">Utility Players</h3>
            <h5 className="display-6">max: {league.util_num}</h5>
            <div className="d-flex row justify-content-center">
                {populateRosterCards(filterBenchAndUtility(false),'Utility',league.util_num)}
            </div>
            <div className="dotted-border my-3"></div>
            <h2 className="display-5">Bench Players</h2>
            <h5 className="display-6">max: {league.be_num}</h5>
            <div className="d-flex row justify-content-center">
                {populateRosterCards(filterBenchAndUtility(true),'Bench',league.be_num)}
            </div>
        </div>
    )
}

export default RosterCardContainer