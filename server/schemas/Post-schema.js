const {Schema, model, ObjectId} = require('mongoose')

const PostSchema = new Schema({
    userId: {type: ObjectId, ref: 'UserSchema'},
    author: {type: String, require: true},
    title: {type: String, require: true},
    content: {type: String, require: true},
    comments: [{type: ObjectId, ref: 'CommentSchema'}]
})

module.exports = model('PostSchema',PostSchema)