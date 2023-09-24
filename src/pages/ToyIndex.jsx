import { useEffect } from "react"
import { loadToys, removeToyOptimistic } from "../store/actions/toy.actions"
import { useDispatch, useSelector } from "react-redux"
import { ToyList } from "../cmps/ToyList"
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { ToyFilter } from "../cmps/ToyFilter"
import { SET_FILTER_BY } from "../store/reducers/toy.reducer"

export function ToyIndex() {

    const dispatch = useDispatch()
    const toys = useSelector(storeState => storeState.toyModule.toys)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
    const isLoading = useSelector(storeState => storeState.toyModule.isLoading)

    useEffect(() => {
        loadToys()
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot load toys')
            })
    }, [filterBy])

    function onRemoveToy(toyId) {
        removeToyOptimistic(toyId)
            .then(() => {
                console.log(`deleted ${toyId}`);
                showSuccessMsg('toy removed')
            })
            .catch(err => {
                console.log('Cannot remove toy', err)
                showErrorMsg('Cannot remove toy')
            })
    }

    function onSetFilter(filterBy) {
        dispatch({ type: SET_FILTER_BY, filterBy })
    }

    return (
        <main>
            <ToyFilter filterBy={filterBy} onSetFilter={onSetFilter} />
            <section>
                {isLoading && <div>Loading...</div>}
                {!isLoading && <ToyList toys={toys} onRemoveToy={onRemoveToy} />}
            </section>
        </main>
    )
}