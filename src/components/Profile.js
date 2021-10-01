function Profile({user}) {
    return (
        <div>
            <h1>Hey, {user.username}</h1>
            <h2>email:{user.email}</h2>
        </div>
    )
}

export default Profile