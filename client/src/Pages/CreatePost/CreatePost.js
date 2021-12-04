import React, {useState} from 'react'
import {createPost} from "../../api/blog";
import ForPost from "../../utils/ForPost/ForPost";

const CreatePost = () => {

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    const create = async () => {
        await createPost(title, content, localStorage.getItem('accessToken'))
        setTitle('')
        setContent('')
        alert('post was successfully created')
    }

    return (
           <ForPost
               text='create'
               click={create}
               title={title}
               setTitle={setTitle}
               content={content}
               setContent={setContent}
           />
    )
}

export default React.memo(CreatePost)