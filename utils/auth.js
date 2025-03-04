const JWT = require('jsonwebtoken')

const secret = 'Ya$h@123'

//Function to create a JWToken using the below fields
function createTokenForUser(user){
    const payload = {
        _id: user._id,
        email: user.email,
        profileImageURL: user.profileImageURL,
        role: user.role
    }

    const token = JWT.sign(payload, secret)

    return token
}

// Function to get underlying data from token
function validateToken(token){
    const payload = JWT.verify(token, secret)
    return payload
}

module.exports = {
    createTokenForUser,
    validateToken,
}