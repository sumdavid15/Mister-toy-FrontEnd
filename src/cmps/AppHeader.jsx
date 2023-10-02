import { NavLink } from 'react-router-dom'
import { utilService } from '../services/util.service'
// import { LoginSignup } from './LoginSignup'
import { loginOrSignUp, logout } from '../store/actions/user.actions.js'
import { useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { useState } from 'react'
import { userService } from '../services/user.service'

export function AppHeader() {

    const user = useSelector(storeState => storeState.userModule.loggedinUser)

    function onLogout() {
        logout()
            .then(() => {
                showSuccessMsg('Logout successfully')
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot logout')
            })
    }

    return (
        <header className="app-header" >
            <div className='app-header-logo flex align-center' style={{ gap: 7 }}>
                <img width={60} src={utilService.getAssetSrc('logo2.svg')} alt="" />
                <h1>Mister-Toy</h1>
            </div>
            <nav className="app-header-nav">
                <NavLink to="/">Home</NavLink> |
                <NavLink to="/toy">Toys</NavLink> |
                <NavLink to="/about">About</NavLink> |
                {user && < NavLink to="/dashboard">DashBoard</NavLink>}

                {/* {(!user && showLogin) && <section className="user-info"> */}

            </nav>
            {!user && <section className="user-info flex" style={{ gap: 10 }}>
                <NavLink to="/login"><button onClick={() => loginOrSignUp(false)}>login</button></NavLink>
                <NavLink to="/login"><button onClick={() => loginOrSignUp(true)}>signup</button></NavLink>
            </section>}
            {
                user && <section className="user-info">
                    <p>
                        {/* {user.fullname} <span>${user.score.toLocaleString()}</span> */}
                        {user.fullname} <span>${user.score}</span>
                    </p>
                    <button onClick={onLogout}>Logout</button>
                </section>
            }
            {/* {!user && <section className="user-info">
                <LoginSignup />
            </section>} */}
        </header >
    )
}

