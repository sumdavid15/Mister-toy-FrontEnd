import { Link } from "react-router-dom"
import { ToyPreview } from "./ToyPreview"

export function ToyList({ toys, onRemoveToy }) {

    return (
        <section >
            <main className="toy-story">
                {
                    toys.map(toy =>
                        <div className="toy-card" key={toy._id}>
                            <ToyPreview toy={toy} />
                            <div className="toy-action-btn">
                                <Link to={`/toy/${toy._id}`}><button title="Toy details"><i className="fa-solid fa-circle-info"></i></button></Link>
                                <Link to={`/toy/edit/${toy._id}`}><button title="Edit toy"><i className="fa-solid fa-pen-to-square"></i></button></Link>
                                <button title="Remove toy" onClick={() => onRemoveToy(toy._id)}><i className="fa-solid fa-trash"></i></button>
                            </div>
                        </div>)
                }
            </main>
        </section >
    )
}