import TeamCardContainer from "./TeamCardContainer"

function Profile({user,setUser}) {
    return (
        <div>
            <h1>Hey, {user.username}</h1>
            <h2>email:{user.email}</h2>
            <TeamCardContainer user={user} setUser={setUser}/>
        </div>
    )
}

export default Profile