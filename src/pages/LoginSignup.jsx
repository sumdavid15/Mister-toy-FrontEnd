
import { useState } from 'react'
import { login, loginOrSignUp, signup } from '../store/actions/user.actions.js'
import { useNavigate } from "react-router-dom"
import { useSelector } from 'react-redux'


function getEmptyCredentials() {
    return {
        fullname: '',
        username: 'admin',
        password: 'admin',
    }
}

export function LoginSignup() {

    const isloginOrSignUp = useSelector(storeState => storeState.userModule.loginOrSignUp)
    const [credentials, setCredentials] = useState(getEmptyCredentials())
    const navigate = useNavigate()

    function handleCredentialsChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        setCredentials(credentials => ({ ...credentials, [field]: value }))
    }

    async function onSubmit(ev) {
        ev.preventDefault()

        if (isloginOrSignUp) {
            await signup(credentials)
            navigate('/')
        } else {
            await login(credentials)
            navigate('/')
        }
    }

    function onToggleSignupState() {
        loginOrSignUp(!isloginOrSignUp)
    }

    const { username, password, fullname } = credentials

    return (
        <div className="login-page">

            <form className="login-form" onSubmit={onSubmit}>
                <input
                    type="text"
                    name="username"
                    value={username}
                    placeholder="Username"
                    onChange={handleCredentialsChange}
                    required
                    autoFocus
                />

                <input
                    type="password"
                    name="password"
                    value={password}
                    placeholder="Password"
                    onChange={handleCredentialsChange}
                    required
                />
                {isloginOrSignUp && <input
                    type="text"
                    name="fullname"
                    value={fullname}
                    placeholder="Full name"
                    onChange={handleCredentialsChange}
                    required
                />}

                <button>{isloginOrSignUp ? 'Signup' : 'Login'}</button>
            </form>

            <div className="btns">
                <a href="#/login" onClick={onToggleSignupState}>
                    {isloginOrSignUp ? 'Already a member? Login' : 'New user? Signup here'}
                </a >
            </div>
        </div >
    )
}

