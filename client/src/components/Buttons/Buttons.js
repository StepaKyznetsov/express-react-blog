import React from 'react';
import css from './Buttons.module.scss'
import {useNavigate} from "react-router-dom";
import {deletePost} from "../../api/blog";
import {useSelector} from "react-redux";
import {CREATE, UPDATE} from "../../constants";

const Buttons = () => {

    const post = useSelector(store => store.blog.currentPost)
    const navigate = useNavigate()

    return (
        <div className={css.container}>
            <button onClick={() => navigate(CREATE)}>Create</button>
            <button onClick={() => navigate(UPDATE)}>Update</button>
            <button
                onClick={() =>
                    deletePost(post._id, localStorage.getItem('accessToken'))}>
                Delete
            </button>
        </div>
    );
};

export default Buttons;