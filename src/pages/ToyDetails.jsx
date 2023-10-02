import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

import { toyService } from "../services/toy.service"
import { utilService } from "../services/util.service"
import { showErrorMsg } from "../services/event-bus.service"
// import { ToyMsgPreview } from "../cmps/ToyMsgPreview"
import { useSelector } from "react-redux"
import { ReviewIndex } from "./ReviewIndex"
import { Chat } from "../cmps/Chat"


export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const { toyId } = useParams()
    const navigate = useNavigate()
    const user = useSelector(storeState => storeState.userModule.loggedinUser)

    useEffect(() => {
        loadCar()
    }, [toyId])

    async function loadCar() {
        try {
            const toy = await toyService.getById(toyId)
            setToy(toy)
        } catch (err) {
            console.log('Had issues in toy details', err)
            showErrorMsg('Cannot load toy')
            navigate('/toy')
        }
    }

    if (!toy) return <div>Loading...</div>
    return (
        <main>
            <Link to="/toy"><button title="Back to shop"><i className="fa-solid fa-arrow-left"></i></button></Link>

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
            </section>
            {/* {user && <Link to={`/toy/${toy._id}/msg`}><button style={{ marginBottom: 20 }} title="add msg">add review</button></Link>}
            {
                toy.msgs && <ToyMsgPreview msgs={toy.msgs} user={user} />
            } */}
            {/* <ReviewIndex toyId={toyId} /> */}
            <Chat toyMsgs={toy.msgs} user={user} toyId={toyId} />
        </main >
    )
}