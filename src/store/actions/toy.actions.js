import { showErrorMsg, showSuccessMsg } from "../../services/event-bus.service.js";
import { toyService } from "../../services/toy.service.js";
import { ADD_TOY, TOY_UNDO, REMOVE_TOY, SET_TOYS, SET_IS_LOADING, UPDATE_TOY } from "../reducers/toy.reducer.js";
import { store } from "../store.js";

export async function loadToys() {
    const { filterBy } = store.getState().toyModule
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })

    try {
        const toys = await toyService.query(filterBy)
        store.dispatch({ type: SET_TOYS, toys })
        return toys
    } catch (err) {
        console.log('toy action -> Cannot load toys', err)
        showErrorMsg('Cannot load toys')
    } finally {
        store.dispatch({ type: SET_IS_LOADING, isLoading: false })
    }

}

export function removeToy(toyId) {

    // return toyService.remove(toyId)
    //     .then(() => {
    //         store.dispatch({ type: REMOVE_TOY, toyId })
    //     })
    //     .catch(err => {
    //         console.log('toy action -> Cannot remove toy', err)
    //         throw err
    //     })
}

export async function removeToyOptimistic(toyId) {
    store.dispatch({ type: REMOVE_TOY, toyId })
    try {
        await toyService.remove(toyId)
        showSuccessMsg('Toy removed')
    } catch (err) {
        store.dispatch({ type: TOY_UNDO })
        console.log('toy action -> Cannot remove toy', err)
        showErrorMsg('Cannot remove toy')
    }
}

export function savetoy(toy) {
    const type = toy._id ? UPDATE_TOY : ADD_TOY
    try {
        const toyToSave = toyService.save(toy)
        store.dispatch({ type, toy: toyToSave })
        showSuccessMsg(`Toy ${toy._id ? 'edited' : 'saved'}`)
        return toyToSave
    } catch (err) {
        console.log(`toy action -> Cannot ${toy._id ? 'save' : 'edit'} toy`, err)
        showErrorMsg(`Cannot ${toy._id ? 'save' : 'edit'} toy`)
    }
}