import React from 'react'
import css from './Post.module.scss'
import {useDispatch, useSelector} from "react-redux"
import {getPostById} from "../../api/blog"

const Post = () => {

    const dispatch = useDispatch()
    const posts = useSelector((store => store.blog.currentPosts))

    return (
            <div>
                {posts.map(post =>
                        <div onClick={() =>
                            dispatch(getPostById(post._id))}
                            key={post._id}
                            className={css.container}>
                            <h3>{post.title}</h3>
                            <p>{post.content}</p>
                            <span>{post.author}</span>
                        </div>
                    )
                }
            </div>
    )
}

export default React.memo(Post)