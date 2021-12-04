import React, {useEffect} from 'react'
import css from './MyPosts.module.scss'
import {useDispatch} from "react-redux"
import {getPersonalPosts} from "../../api/blog"
import Post from "../../components/Post/Post"
import Buttons from "../../components/Buttons/Buttons"

const MyPosts = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPersonalPosts(localStorage.getItem('userId')))
    }, [])

    return (
        <div className={css.container}>
            <Buttons />
            <Post />
        </div>
    )
}

export default React.memo(MyPosts)