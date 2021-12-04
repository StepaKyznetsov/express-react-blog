const tokenService = require('../services/token-service')
const ApiError = require('../exceptions/api-error')

module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") next()
    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) throw ApiError.UnauthorizedError('user isnt auth')
        const decodedData = tokenService.validateAccessToken(token)
        req.user = decodedData
        next()
    }
    catch (e) {
        console.log(e)
        throw ApiError.UnauthorizedError('user isnt auth')
    }
};