const {Schema,model} = require('mongoose')

const blogSchema = new Schema({
        title:{
            type: String,
            required: true,
        },
        body:{
            type: String,
            required: true,
        },
        coverImageURL:{
            type: String
        },
        // Stores the object ID in mongo db for the user
        createdBy:{
            type: Schema.Types.ObjectId,
            ref: 'user'
        },
        
    },
{timestamps:true}
)

const Blog = model('blog',blogSchema)

module.exports = Blog