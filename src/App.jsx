import { Route, HashRouter as Router, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import './assets/style/main.scss'

import { AboutUs } from './pages/AboutUs'
import { AppHeader } from './cmps/AppHeader'
import { HomePage } from './pages/HomePage'
import { store } from './store/store'
import { AppFooter } from './cmps/AppFooter'
import { ToyIndex } from './pages/ToyIndex'
import { ToyDetails } from './pages/ToyDetails'
import { ToyEdit } from './pages/ToyEdit'
import { DashBoard } from './pages/DashBoard'
import { UserMsg } from './cmps/UserMsg'
import { LoginSignup } from './pages/LoginSignup'
import { ToyMsg } from './pages/ToyMsg'

export function App() {

    return (
        <Provider store={store}>
            <Router>
                <section className="app-main-layout">
                    <AppHeader />
                    <main className="app-main-layout-main">
                        <Routes>
                            <Route element={<HomePage />} path="/" />
                            <Route element={<AboutUs />} path="/about" />
                            <Route element={<ToyIndex />} path="/toy" />
                            <Route element={<ToyDetails />} path="/toy/:toyId" />
                            <Route element={<ToyEdit />} path="/toy/edit/:toyId" />
                            <Route element={<ToyEdit />} path="/toy/edit" />
                            <Route element={<DashBoard />} path="/dashboard" />
                            <Route element={<LoginSignup />} path="/login" />
                            <Route element={<ToyMsg />} path="/toy/:toyId/msg" />
                        </Routes>
                    </main>
                    <AppFooter />
                    <UserMsg />
                </section>
            </Router>
        </Provider>
    )
}