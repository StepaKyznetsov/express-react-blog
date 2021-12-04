import React from 'react'
import css from './ForPost.module.scss'
import Input from "../Input/Input"

const ForPost = ({click, text, title, setTitle, content, setContent}) => {

    return (
        <div className={css.container}>
            <Input
                placeholder='type title of post'
                value={title}
                setValue={setTitle}
                type='text'
            />
            <Input
                placeholder='type content of post'
                value={content}
                setValue={setContent}
                type='text'
            />
            <button onClick={() => click()}>{text}</button>
        </div>
    )
}

export default React.memo(ForPost)