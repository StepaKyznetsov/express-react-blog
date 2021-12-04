const {Schema, model, ObjectId} = require('mongoose')

const CommentSchema = new Schema({
    post: {type: ObjectId, ref: 'PostSchema'},
    author: {type: String, require: true},
    content: {type: String, require: true},
})

module.exports = model('CommentSchema',CommentSchema)