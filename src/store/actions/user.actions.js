import { showErrorMsg, showSuccessMsg } from "../../services/event-bus.service.js";
import { userService } from "../../services/user.service.js";
import { SET_USER, SET_IS_SING_UP } from "../reducers/user.reducer.js";
import { store } from "../store.js";

export async function login(credentials) {
    try {
        const user = await userService.login(credentials)
        store.dispatch({ type: SET_USER, user })
        showSuccessMsg(`Hi again ${user.fullname}`)
        return user
    } catch (err) {
        console.log('user actions -> Cannot login', err)
        showErrorMsg('Cannot login')
    }
}

export async function signup(credentials) {
    try {
        const user = await userService.signup(credentials)
        store.dispatch({ type: SET_USER, user })
        showSuccessMsg(`Welcome ${user.fullname}`)
        return user
    } catch (err) {
        console.log('user actions -> Cannot signup', err)
        showErrorMsg('Cannot signup')
    }
}

export async function logout() {
    try {
        await userService.logout()
        store.dispatch({ type: SET_USER, user: null })
    } catch (err) {
        console.error('user actions -> Cannot logout:', err)
    }
}


// export async function checkout(diff) {
//     return userService.updateScore(diff)
//         .then(newScore => {
//             store.dispatch({ type: CLEAR_CART })
//             store.dispatch({ type: SET_USER_SCORE, score: newScore })
//         })
//         .catch(err => {
//             console.error('user actions -> Cannot checkout:', err)
//             throw err
//         })
// }

export function loginOrSignUp(boolean) {
    console.log('boolean:', boolean)
    store.dispatch({ type: SET_IS_SING_UP, boolean })
}