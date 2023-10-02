import { useEffect } from "react"
import { loadToys, removeToyOptimistic } from "../store/actions/toy.actions"
import { useDispatch, useSelector } from "react-redux"
import { ToyList } from "../cmps/ToyList"
import { ToyFilter } from "../cmps/ToyFilter"
import { SET_FILTER_BY } from "../store/reducers/toy.reducer"

export function ToyIndex() {

    const dispatch = useDispatch()
    const toys = useSelector(storeState => storeState.toyModule.toys)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
    const isLoading = useSelector(storeState => storeState.toyModule.isLoading)

    useEffect(() => {
        loadToys()
    }, [filterBy])

    async function onRemoveToy(toyId) {
        await removeToyOptimistic(toyId)
    }

    function onSetFilter(filterBy) {
        dispatch({ type: SET_FILTER_BY, filterBy })
    }

    return (
        <main className="toy-index">
            <section className="toy-index-action">
                <ToyFilter filterBy={filterBy} onSetFilter={onSetFilter} />
            </section>
            <section className="toy-list">
                {isLoading && <div>Loading...</div>}
                {!isLoading && <ToyList toys={toys} onRemoveToy={onRemoveToy} />}
            </section>
        </main>
    )
}