const {Schema} = require('mongoose')
const {createHmac,randomBytes } = require('crypto')

const userSchema = new Schema({
    fullName:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    salt: {
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    profileImageURL:{
        type: String,
        default: '/images/default_avatar.png'
    },
    role:{
        type: String,
        enum: ['USER','ADMIN'],
        default: 'USER'
    }
},
{timestamps: true}
)


// This function will run before the entry is saved in database and hash the password
userSchema.pre('save',function (next){
    const user = this

    if (!user.isModified('password'))
        return

    // Salt is the secret key for hashing.
    const salt = randomBytes(16).toString()
    const hashedPassword = createHmac('sha256', salt)
    .update(user.password)
    .digest('hex')

    this.salt = salt,
    this.password = hashedPassword

})
const User = model('user', userSchema)

module.exports = User