const {Schema, model, ObjectId} = require('mongoose')

const UserSchema = new Schema({
    email: {type: String, require: true, unique: true},
    password: {type: String, require: true},
    name: {type: String, require: true},
    posts: [{type: ObjectId, ref: 'PostSchema'}]
})

module.exports = model('UserSchema',UserSchema)