import React, {useEffect, useState} from 'react'
import {useSelector} from "react-redux"
import {updatePost} from "../../api/blog"
import ForPost from "../../utils/ForPost/ForPost"

const UpdatePost = () => {

    const post = useSelector(store => store.blog.currentPost)
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    useEffect(() => {
        setTitle(post.title)
        setContent(post.content)
    }, [])

    const update = async () => {
        await updatePost(title, content, post._id, localStorage.getItem('accessToken'))
        setTitle('')
        setContent('')
        alert('post was successfully updated')
    }

    return (
          <ForPost
              text='update'
              click={update}
              title={title}
              setTitle={setTitle}
              content={content}
              setContent={setContent}
          />
    )
}

export default React.memo(UpdatePost)