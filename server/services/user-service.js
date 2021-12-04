const UserSchema = require('../schemas/User-schema')
const bcrypt = require('bcrypt')
const UserDto = require('../dtos/user-dto')
const tokenService = require('./token-service')
const ApiError = require('../exceptions/api-error')

class UserService {

    async registration(email, password, name){
        const candidate = await UserSchema.findOne({email})
        if (candidate) throw ApiError.BadRequest('email is already busy')
        const nickname = await UserSchema.findOne({name})
        if (nickname) throw ApiError.BadRequest('email is already busy')
        const hashPassword = await bcrypt.hash(password, 3)
        const user = await UserSchema.create({email, password: hashPassword, name})
        return await this.getTokens(user)
    }
    async login(email, password){
        const user = await UserSchema.findOne({email})
        const isEquals = await bcrypt.compare(password, user.password)
        if (!user || ! isEquals) throw ApiError.BadRequest('wrong email or password')
        return await this.getTokens(user)
    }
    async getTokens(user){
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return{
            ...tokens,
            userDto
        }
    }
    async getAllUsers(){
        const users = await UserSchema.find()
        return users
    }
    async findById(_id){
        const user = await UserSchema.findById({_id})
        return user
    }
    async logout(refreshToken){
        const token = await tokenService.removeToken(refreshToken)
        return token
    }
    async refresh(refreshToken) {
        if (!refreshToken) throw ApiError.UnauthorizedError();
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);
        if (!userData || !tokenFromDb) throw ApiError.UnauthorizedError();
        const user = await UserSchema.findById(userData.id);
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {
            ...tokens,
            user: userDto
        }
    }
}

module.exports = new UserService()