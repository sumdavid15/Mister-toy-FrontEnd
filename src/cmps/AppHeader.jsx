import { NavLink } from 'react-router-dom'
import { utilService } from '../services/util.service'

export function AppHeader() {

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
                <NavLink to="/dashboard">DashBoard</NavLink>
            </nav>
        </header>
    )
}

