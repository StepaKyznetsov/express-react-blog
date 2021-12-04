const CommentSchema = require('../schemas/Comment-schema')
const TokenSchema = require('../schemas/Token-schema')
const postService = require('./post-service')
const userService = require('./user-service')
const ApiError = require('../exceptions/api-error')

class CommentService {

    async getPostsComments(id){
        const post = await postService.getPostById(id)
        if (post===null) throw ApiError.BadRequest('no post')
        const comments = []
        for (let i=0; i<post.comments.length; i++){
            const comment = await this.getCommentById(post.comments[i]._id)
            comments.push(comment)
        }
        return comments
    }
    async typeComment(content, postId, refreshToken){
        const post = await postService.getPostById(postId)
        const userToken = await TokenSchema.findOne({refreshToken})
        const user = await userService.findById(userToken.userId)
        const comment = await CommentSchema.create({author: user.name, content})
        post.comments.push(comment)
        post.save()
        return{
            comment,
            post
        }
    }
    async getCommentById(id){
        const comment = await CommentSchema.findById(id)
        if (!comment) throw ApiError.BadRequest('comment doesnt exist')
        return comment
    }
}

module.exports = new CommentService()
