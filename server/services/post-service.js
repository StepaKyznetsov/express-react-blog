const PostSchema = require('../schemas/Post-schema')
const TokenSchema = require('../schemas/Token-schema')
const UserSchema = require('../schemas/User-schema')
const userService = require('./user-service')
const ApiError = require('../exceptions/api-error')

class PostService {

    async getPersonalPosts(_id){
        const author = await UserSchema.findById({_id})
        if (!author || !author.posts.length) throw ApiError.BadRequest('this user isnt have posts yet or doesnt exist')
        const posts = []
        for (let i=0; i<author.posts.length; i++){
            const post = await this.getPostById(author.posts[i]._id)
            posts.push(post)
        }
        return posts
    }
    async getAllPosts(){
        const posts = await PostSchema.find()
        return posts
    }
    async getPostById(_id){
        const post = await PostSchema.findById({_id})
        if (!post) throw ApiError.BadRequest('post doesnt exist')
        return post
    }
    async createPost(title, content, refreshToken){
        const userToken = await TokenSchema.findOne({refreshToken})
        const user = await userService.findById(userToken.userId)
        const post = await PostSchema.create({title, content, author: user.name})
        user.posts.push(post)
        await user.save()
        return {
            post,
            user
        }
    }
    async updatePost(newTitle, newContent ,id, refreshToken){
        const post = await this.getPostById(id)
        if (!post) throw ApiError.BadRequest('post doesnt exist')
        await this.amIAuthor(id, refreshToken)
        post.title = newTitle
        post.content = newContent
        await post.save()
        return post
    }
    async removePost(id, refreshToken){
        await this.amIAuthor(id, refreshToken)
        const post = await PostSchema.findById(id).deleteOne()
        if (!post) throw ApiError.BadRequest('post doesnt exist')
        return post

    }
    async amIAuthor(postId, refreshToken){
        const userToken = await TokenSchema.findOne({refreshToken})
        const user = await userService.findById(userToken.userId)
        const post = await this.getPostById(postId)
        if (post.author !== user.name) throw ApiError.BadRequest('u a not author of this post')
    }
}

module.exports = new PostService()