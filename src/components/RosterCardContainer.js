import RosterCard from "./RosterCard"

function RosterCardContainer({players,league}) {
    function filterPlayers(pos) {
        return players.filter((player) => player.player.position === pos && !player.bench && !player.utility )
    }
    function filterBenchAndUtility(filter) {
        return players.filter((player) => filter ? player.bench : player.utility)
    }
    function populateRosterCards(rosterPlayers, position) {
        return rosterPlayers.map((player)=>{
            return <RosterCard player={player.player} position={position} key={player.id}/>
        })
    }
    
    return (
        <div>
            <h2>Starting Lineup</h2>

            <h3>Point Guards</h3>
            <h5>max:{league.pg_num}</h5>
            {populateRosterCards(filterPlayers('PG'),'PG')}
            <h3>Power Forwards</h3>
            <h5>max:{league.pf_num}</h5>
            {populateRosterCards(filterPlayers('PF'),'PF')}
            <h3>Small Forwards</h3>
            <h5>max:{league.sf_num}</h5>
            {populateRosterCards(filterPlayers('SF'),'SF')}
            <h3>Shooting Guards</h3>
            <h5>max:{league.sg_num}</h5>
            {populateRosterCards(filterPlayers('SG'),'SG')}
            <h3>Centers</h3>
            <h5>max:{league.c_num}</h5>
            {populateRosterCards(filterPlayers('C'),'C')}
            <h3>Utility Players</h3>
            <h5>max:{league.util_num}</h5>
            {populateRosterCards(filterBenchAndUtility(false),'Utility')}
            <h2>Bench Players</h2>
            <h5>max:{league.be_num}</h5>
            {populateRosterCards(filterBenchAndUtility(true),'Bench')}
        </div>
    )
}

export default RosterCardContainer