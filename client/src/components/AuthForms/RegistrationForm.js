import React, {useState} from 'react'
import Input from "../../utils/Input/Input"
import css from './LoginForm.module.scss'
import {registration} from "../../api/user"
import {useDispatch} from "react-redux"

const RegistrationForm = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const dispatch = useDispatch()

    return (
        <div className={css.container}>
            <div className={css.content}>
                <h2>Registration</h2>
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
                    <Input
                        value={name}
                        placeholder="name"
                        type="text"
                        setValue={setName}
                    />
                    <button onClick={() =>
                        dispatch(registration(email, password, name))}>
                        registration
                    </button>
                </div>
            </div>
        </div>
    )
}

export default React.memo(RegistrationForm)