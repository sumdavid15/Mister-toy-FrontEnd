// import { storageService } from './async-storage.service.js'
// import { utilService } from './util.service.js'

// const STORAGE_KEY = 'toyDB'

// export const toyService = {
//     query,
//     getById,
//     save,
//     remove,
//     getEmptyToy: getEmptyToy,
//     getDefaultFilter,
//     getLabels
// }

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

function sortBy(toys, type, dir) {

    const sortByType = {
        name: function () {
            if (dir) return toys.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
            else return toys.sort((a, b) => b.name.toLowerCase().localeCompare(a.name.toLowerCase()))
        },
        price: function () {
            if (dir) return toys.sort((a, b) => a.price - b.price)
            else return toys.sort((a, b) => b.price - a.price)
        },
        createdAt: function () {
            if (dir) return toys.sort((a, b) => a.createdAt - b.createdAt)
            else return toys.sort((a, b) => b.createdAt - a.createdAt)
        },
    }
    return sortByType[type]
}

function query(filterBy) {
    console.log('filterBy ToyService Query:', filterBy)

    return storageService.query(STORAGE_KEY)
        .then(toys => {
            let toysToReturn = toys
            if (filterBy.name) {
                const regExp = new RegExp(filterBy.name, 'i')
                toysToReturn = toys.filter(toy => regExp.test(toy.name))
            }
            if (filterBy.inStock !== 'all') {
                if (filterBy.inStock === 'inStock') toysToReturn = toysToReturn.filter(toy => toy.inStock)
                if (filterBy.inStock === 'OutOfStock') toysToReturn = toysToReturn.filter(toy => !toy.inStock)
            }
            if (filterBy.labels.length) toysToReturn = toysToReturn.filter(toy => toy.labels.some(label => filterBy.labels.map(value => value.label).includes(label)))
            if (filterBy.sortBy) sortBy(toysToReturn, filterBy.sortBy, filterBy.dir)()
            return toysToReturn
        })
}

function getById(toyId) {
    return storageService.get(STORAGE_KEY, toyId)
}

function remove(toyId) {
    return storageService.remove(STORAGE_KEY, toyId)
}

function save(toy) {
    if (toy._id) {
        toy.updatedAt = Date.now()
        return storageService.put(STORAGE_KEY, toy)
    } else {
        toy.createdAt = Date.now()
        return storageService.post(STORAGE_KEY, toy)
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
