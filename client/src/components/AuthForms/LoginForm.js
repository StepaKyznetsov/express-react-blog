import React, {useState} from 'react'
import Input from "../../utils/Input/Input"
import css from './LoginForm.module.scss'
import {login} from "../../api/user"
import {useDispatch} from "react-redux"

const LoginForm = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()

    return (
        <div className={css.container}>
            <div className={css.content}>
                <h2>Login</h2>
                <div>
                    <Input
                        value={email}
                        placeholder="email"
                        type="text"
                        setValue={setEmail}
                    />
                    <Input
                        value={password}
                        placeholder="password"
                        type="password"
                        setValue={setPassword}
                    />
                    <button onClick={() =>
                        dispatch(login(email, password))}>
                        login
                    </button>
                </div>
        </div>
    </div>
    )
}

export default React.memo(LoginForm)