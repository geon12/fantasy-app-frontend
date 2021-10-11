import TeamCardContainer from "./TeamCardContainer"
import "./styles/Profile.css"

function Profile({user,setUser}) {
    return (
        <div className="text-center">
            <h1 className="display-2">Hey, <strong>{user.username}</strong></h1>
            <h2 className="display-6 dotted-border">email: {user.email}</h2>
            <TeamCardContainer user={user} setUser={setUser}/>
        </div>
    )
}

export default Profile