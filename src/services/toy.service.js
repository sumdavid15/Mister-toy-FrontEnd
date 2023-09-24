import { httpService } from './http.service.js'

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy: getEmptyToy,
    getDefaultFilter,
    getLabels
}

const labels = [
    { value: 'On wheels', label: 'On wheels' },
    { value: 'Box game', label: 'Box game' },
    { value: 'Art', label: 'Art' },
    { value: 'Baby', label: 'Baby' },
    { value: 'Doll', label: 'Doll' },
    { value: 'Puzzle', label: 'Puzzle' },
    { value: 'Outdoor', label: 'Outdoor' },
    { value: 'Battery Powered', label: 'Battery Powered' },
]

function getLabels() {
    return labels
}

function query(filterBy) {
    console.log('filterBy:', filterBy)
    return httpService.get('toy', { params: { filterBy } })
}

function getById(toyId) {
    return httpService.get(`toy/${toyId}`)
}

function remove(toyId) {
    return httpService.delete(`toy/${toyId}`)
}

function save(toy) {
    if (toy._id) {
        return httpService.put(`toy/${toy._id}`, toy)
    } else {
        return httpService.post('toy', toy)
    }
}

function getEmptyToy() {
    return {
        name: '',
        price: '',
        labels: [],
        inStock: false,
    }
}

function getDefaultFilter() {
    return { name: '', inStock: 'all', sortBy: '', dir: false, labels: [] }
}
