import React, {useEffect} from 'react'
import css from './Main.module.scss'
import {useDispatch} from "react-redux"
import {getPosts} from "../../api/blog"
import Post from "../../components/Post/Post"

const Main = () => {

    const dispatch = useDispatch()

    useEffect(() => {
       dispatch(getPosts())
    }, [])

    return (
        <div className={css.container}>
            <h2>Community posts</h2>
            <Post />
        </div>
    )
}

export default React.memo(Main)