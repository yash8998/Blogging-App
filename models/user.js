const {Schema,model} = require('mongoose')
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
userSchema.pre('save',function(next){
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

    //If next() is not called, Mongoose will never proceed to the next step 
    // next is provided by Mongoose to pre and post middleware functions.
    next()
})


// This is a virtual function which allows us to create properties on the fields 
// that are not stored in db
userSchema.static('matchPassword', async function(email, password){
    const user = await this.findOne({email})
    if(!user){
        throw new Error('User not found')
    }

    const salt = user.salt
    const hashedPassword = user.password

    const userProvidedHash = createHmac('sha256', salt)
    .update(password)
    .digest('hex')

    if(hashedPassword !== userProvidedHash){
        throw new Error('Incorrect Password')
    }
    return user
})


const User = model('user', userSchema)

module.exports = User