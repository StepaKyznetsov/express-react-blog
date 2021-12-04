import React from 'react'
import {useNavigate} from "react-router-dom"
import {useDispatch, useSelector} from 'react-redux'
import css from './Navbar.module.scss'
import {logout} from "../../reducers/userReducer"
import {LOGIN, MAIN, MY, REGISTRATION} from "../../constants"

const Navbar = () => {
    
    const isAuth = useSelector(store => store.user.isAuth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const outFromApp = () => {
        dispatch(logout())
        localStorage.removeItem('accessToken')
        localStorage.removeItem('userId')
    }

    return (
        <div className={css.container}>
            <div className={css.content}>
                <div className={css.title} onClick={() => navigate(MAIN)}>
                        EXPRESS REACT BLOG
                </div>
                {isAuth &&
                <div className={css.options}>
                    <div className={css.option} onClick={() => navigate(MY)}>My posts</div>
                    <div className={css.option} onClick={()=>outFromApp()}>Logout</div>
                </div>
                }
                {!isAuth &&
                    <div className={css.items}>
                       <div className={css.links} onClick={() => navigate(LOGIN)}>Login</div>
                       <div className={css.links} onClick={() => navigate(REGISTRATION)}>Registration</div>
                    </div>
                }
            </div>
        </div>
    )
}

export default React.memo(Navbar)