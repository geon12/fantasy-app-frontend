import LeagueCard from "./LeagueCard"

function Leagues({user}) {
    function populateCards() {
        return user.leagues.map((league) => {
            
            const commissioner = user.commissioners.find((com) => com.league_id === league.id)
            if (commissioner) {
                return <LeagueCard league={league} commissioner={commissioner} key={league.id}/>
            }

            return <LeagueCard league={league} key={league.id}/>
        })
    }
    return (
        <div>
            <h1>Manage your Leagues</h1>
            <button>Create a League!</button>
            {populateCards()}
        </div>
    )
}

export default Leagues