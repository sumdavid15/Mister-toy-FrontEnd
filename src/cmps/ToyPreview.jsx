import { utilService } from "../services/util.service"

export function ToyPreview({ toy }) {

    const randomColor = utilService.getRandomColor()

    return (
        <div className="toy-preview">
            <div className="flex justify-center">
                <img width={100} src={utilService.getAssetSrc(toy.img || 'logo2.svg')} alt="" />
            </div>
            <h1 >ToyName: {toy.name}</h1>
            <p>Price: {toy.price}</p>
            <p>{toy.inStock ? 'In stock' : 'Out of stock'} </p>
            <div className="toy-label-container">
                {toy.labels.map(label =>
                    <div className="toy-label" key={utilService.makeId()} style={{ backgroundColor: { randomColor } }}>
                        {label}
                    </div>
                )}
            </div>
        </div >
    )

}
