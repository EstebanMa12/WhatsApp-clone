function UserEncapsulation(User = false) {
    function setPrivateUser (newUser) {
        User = newUser
    }

    function getPrivateUser () {
        return User    
    }

    return {
        set: function(newUser) {
            setPrivateUser(newUser)
        },
        
        get: function() {
            return getPrivateUser()
        }
    }
}

export const User = UserEncapsulation()
// export default User