import TeamCard from "./TeamCard"

function TeamCardContainer({user}) {

    function findleague(team) {
        return user.leagues.find((league) => league.id === team.league_id)
    }

    function populateTeamCards() {
        return user.fantasy_teams.map((team) => {
            return <TeamCard team={team} league={findleague(team)} key={team.id}/>
        })
    }
    return (
        <div>
            <h1>Your Teams</h1>
            {populateTeamCards()}
        </div>
    )
}

export default TeamCardContainer