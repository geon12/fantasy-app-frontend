function StatsTable({stats}) {

        return (    
                !stats.message ?
                    <table className="table my-2">
                        <thead>
                            <tr>
                                <th>Points</th>
                                <th>FG</th>
                                <th>FG3</th>
                                <th>FT</th>
                                <th>Steals</th>
                                <th>Blocks</th>
                                <th>Assists</th>
                                <th>Turnovers</th>
                            </tr>
                        </thead>
                            <tbody>
                                <tr>
                                    <td>{stats.pts}</td>
                                    <td>{stats.fg}</td>
                                    <td>{stats.fg3}</td>
                                    <td>{stats.ft}</td>
                                    <td>{stats.stl}</td>
                                    <td>{stats.blk}</td>
                                    <td>{stats.ast}</td>
                                    <td>{stats.tov}</td>
                                </tr>
                            </tbody>
                    </table> :
                    <p className="h5 m-2">{stats.message}</p>
    )
}

export default StatsTable
