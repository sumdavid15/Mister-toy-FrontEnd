import { utilService } from "../services/util.service"

export function ToyPreview({ toy }) {

    const randomColor = utilService.getRandomColor()

    return (
        <div className="toy-preview">
            <h1>ToyName: {toy.name}</h1>
            <p>Price: {toy.price}</p>
            <p>In-stock :{toy.inStock ? 'Yes' : 'out of stock'} </p>
            <div className="toy-label-container">
                {toy.labels.map(label =>
                    <div className="toy-label" key={utilService.makeId()} style={{ backgroundColor: { randomColor } }}>
                        {label}
                    </div>
                )}
            </div>
        </div>
    )

}

const toy = {
    _id: 't101',
    name: 'Talking Doll',
    price: 123,
    labels: ['Doll', 'Battery Powered', 'Baby'],
    createdAt: 1631031801011,
    inStock: true,
}