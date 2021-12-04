const {Schema, model, ObjectId} = require('mongoose')

const TokenSchema = new Schema({
    userId: {type: ObjectId, ref: 'UserSchema', require: true},
    refreshToken: {type: String, require: true},
})

module.exports = model('TokenSchema',TokenSchema)