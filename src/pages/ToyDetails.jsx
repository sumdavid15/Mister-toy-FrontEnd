import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

import { toyService } from "../services/toy.service"
import { utilService } from "../services/util.service"


export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const { toyId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadCar()
    }, [toyId])

    function loadCar() {
        toyService.getById(toyId)
            .then((toy) => setToy(toy))
            .catch((err) => {
                console.log('Had issues in toy details', err)
                showErrorMsg('Cannot load toy')
                navigate('/toy')
            })
    }

    if (!toy) return <div>Loading...</div>
    return (
        <section className="toy-details">
            <p>ToyId: {toy._id}</p>
            <h1>ToyName: {toy.name}</h1>
            <p>Price: {toy.price}</p>
            <p>In-stock :{toy.inStock ? 'Yes' : 'out of stock'} </p>
            <p>CreatedAt :{toy.createdAt}</p>
            <div className="toy-label-container">
                {toy.labels.map(label =>
                    <div className="toy-label" key={utilService.makeId()} >
                        {label}
                    </div>
                )}
            </div>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi voluptas cumque tempore, aperiam sed dolorum rem! Nemo quidem, placeat perferendis tempora aspernatur sit, explicabo veritatis corrupti perspiciatis repellat, enim quibusdam!</p>
            <Link to="/toy"><button><i className="fa-solid fa-arrow-left"></i></button></Link>
        </section>
    )
}