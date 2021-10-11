import TeamCard from "./TeamCard"
import "./styles/Profile.css"
function TeamCardContainer({user,setUser}) {

    function findleague(team) {
        return user.leagues.find((league) => league.id === team.league_id)
    }

    function populateTeamCards() {
        return user.fantasy_teams.map((team) => {
            return <TeamCard team={team} league={findleague(team)} user={user} setUser={setUser} key={team.id}/>
        })
    }
    return (
        <div>
            <h1 className="display-4 yourteam-title">Your Teams</h1>
            <div className="d-flex row justify-content-center">
                {populateTeamCards()}
            </div>
        </div>
    )
}

export default TeamCardContainer