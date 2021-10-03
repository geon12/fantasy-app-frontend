function LeagueCard({league,commissioner}) {
    return (
        <div>
            <h2>{league.name}</h2>
            <h3>Max number of Teams: {league.team_num}</h3>
            {commissioner ? 
                <>
                <h3>Commisssioner</h3>
                <button>Edit</button>
                <button>Delete League</button>
                </>
                :
                null
            }
        </div>
    )
}

export default LeagueCard