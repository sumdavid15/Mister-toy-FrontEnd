import { userService } from "../../services/user.service.js";

export const SET_USER = 'SET_USER'
export const SET_IS_SING_UP = 'SET_SING_UP'

const initialState = {
    loginOrSignUp: null,
    loggedinUser: userService.getLoggedinUser()
}

export function userReducer(state = initialState, action = {}) {
    switch (action.type) {
        case SET_USER:
            return { ...state, loggedinUser: action.user }

        case SET_IS_SING_UP:
            return { ...state, loginOrSignUp: action.boolean }

        default:
            return state;
    }
}