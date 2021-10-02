import TeamCardContainer from "./TeamCardContainer"

function Profile({user}) {
    return (
        <div>
            <h1>Hey, {user.username}</h1>
            <h2>email:{user.email}</h2>
            <TeamCardContainer user={user}/>
        </div>
    )
}

export default Profile