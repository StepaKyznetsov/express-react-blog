const jwt = require('jsonwebtoken')
const TokenSchema = require('../schemas/Token-schema')

class TokenService {

    generateTokens(payload){
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_KEY, {expiresIn: '30m'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_KEY, {expiresIn: '30d'})
        return {
            accessToken,
            refreshToken
        }
    }
    async saveToken(userId, refreshToken){
        const tokenData = await TokenSchema.findOne({userId})
        if (tokenData) {
            tokenData.refreshToken = refreshToken
            return tokenData.save()
        }
        const token = await TokenSchema.create({userId, refreshToken})
        return token
    }
    async removeToken(refreshToken){
        const token = await TokenSchema.deleteOne({refreshToken})
        return token
    }
    validateAccessToken(accessToken){
            const userData = jwt.verify(accessToken, process.env.JWT_ACCESS_KEY)
            return userData

    }
    validateRefreshToken(refreshToken){
            const userData = jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY)
            return userData
    }
    async findToken(refreshToken){
        const tokenData = await TokenSchema.findOne({refreshToken})
        return tokenData
    }
}

module.exports = new TokenService()