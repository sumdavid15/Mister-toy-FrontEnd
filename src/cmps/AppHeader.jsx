import { NavLink } from 'react-router-dom'

export function AppHeader() {

    return (
        <header className="app-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h1>Mister-Toy</h1>
            <nav>
                <NavLink to="/">Home</NavLink> |
                <NavLink to="/toy">Toys</NavLink> |
                <NavLink to="/about">About</NavLink> |
            </nav>
        </header>
    )
}

