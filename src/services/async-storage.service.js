import { utilService } from "./util.service";

export const storageService = {
    query,
    get,
    post,
    put,
    remove,
}

function query(entityType, delay = 0) {
    var entities = JSON.parse(localStorage.getItem(entityType)) || []
    if (!entities.length) {
        console.log('Added Toys To storage');
        entities = [
            {
                _id: 't101',
                name: 'Stuffed Teddy Bear',
                price: 19.99,
                labels: ['Stuffed Animal', 'Cute', 'Soft'],
                createdAt: 1631031801011,
                inStock: true,
            },
            {
                _id: 't102',
                name: 'Remote-Controlled Car',
                price: 39.99,
                labels: ['Toy Car', 'Remote Control', 'Speed'],
                createdAt: 1631031801012,
                inStock: true,
            },
            {
                _id: 't103',
                name: 'LEGO Building Set',
                price: 49.99,
                labels: ['Building Blocks', 'Creative', 'Educational'],
                createdAt: 1631031801013,
                inStock: true,
            },
            {
                _id: 't104',
                name: 'Barbie Doll',
                price: 14.99,
                labels: ['Fashion Doll', 'Collectible', 'Kids'],
                createdAt: 1631031801014,
                inStock: true,
            },
            {
                _id: 't105',
                name: 'Monopoly Board Game',
                price: 29.99,
                labels: ['Board Game', 'Family', 'Strategy'],
                createdAt: 1631031801015,
                inStock: true,
            },
            {
                _id: 't106',
                name: '1000-Piece Puzzle',
                price: 24.99,
                labels: ['Puzzle', 'Jigsaw', 'Entertainment'],
                createdAt: 1631031801016,
                inStock: true,
            },
            {
                _id: 't107',
                name: 'Nerf Blaster',
                price: 19.99,
                labels: ['Toy Gun', 'Foam Darts', 'Action'],
                createdAt: 1631031801017,
                inStock: true,
            },
            {
                _id: 't108',
                name: 'Play-Doh Modeling Set',
                price: 9.99,
                labels: ['Creative', 'Sculpting', 'Kids'],
                createdAt: 1631031801018,
                inStock: true,
            },
            {
                _id: 't109',
                name: 'Hot Wheels Car Collection',
                price: 29.99,
                labels: ['Toy Cars', 'Collectible', 'Kids'],
                createdAt: 1631031801019,
                inStock: true,
            },
            {
                _id: 't110',
                name: 'Plush Unicorn',
                price: 17.99,
                labels: ['Stuffed Animal', 'Magical', 'Soft'],
                createdAt: 1631031801020,
                inStock: true,
            },
        ];
        utilService.saveToStorage('toyDB', entities)
    }
    return new Promise(resolve => setTimeout(() => resolve(entities), delay))
}

function get(entityType, entityId) {
    return query(entityType).then(entities => {
        const entity = entities.find(entity => entity._id === entityId)
        if (!entity) throw new Error(`Get failed, cannot find entity with id: ${entityId} in: ${entityType}`)
        return entity
    })
}

function post(entityType, newEntity) {
    newEntity = { ...newEntity }
    newEntity._id = _makeId()
    return query(entityType).then(entities => {
        entities.unshift(newEntity)
        _save(entityType, entities)
        return newEntity
    })
}

function put(entityType, updatedEntity) {
    return query(entityType).then(entities => {
        const idx = entities.findIndex(entity => entity._id === updatedEntity._id)
        if (idx < 0) throw new Error(`Update failed, cannot find entity with id: ${entityId} in: ${entityType}`)
        entities.splice(idx, 1, updatedEntity)
        _save(entityType, entities)
        return updatedEntity
    })
}

function remove(entityType, entityId) {
    return query(entityType).then(entities => {
        const idx = entities.findIndex(entity => entity._id === entityId)
        if (idx < 0) throw new Error(`Remove failed, cannot find entity with id: ${entityId} in: ${entityType}`)
        entities.splice(idx, 1)
        _save(entityType, entities)
    })
}

// Private functions

function _save(entityType, entities) {
    localStorage.setItem(entityType, JSON.stringify(entities))
}

function _makeId(length = 5) {
    var text = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}