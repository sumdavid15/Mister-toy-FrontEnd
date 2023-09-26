import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { showErrorMsg } from "../services/event-bus.service"
import { toyService } from "../services/toy.service"
import Select from "react-select"

export function ToyEdit() {
    const [toy, setToy] = useState(null)
    const [selectedLabels, setSelectedLabels] = useState([])
    const { toyId } = useParams()
    const navigate = useNavigate()

    const labels = toyService.getLabels()

    useEffect(() => {
        if (!toyId) {
            const emptyToy = toyService.getEmptyToy()
            setToy(emptyToy)
            setSelectedLabels(emptyToy.labels)
        } else {
            loadToy()
        }
    }, [toyId])

    function loadToy() {
        toyService.getById(toyId)
            .then((toy) => {
                setToy(toy)
                setSelectedLabels(toy.labels)
            })
            .catch((err) => {
                console.log('loadToy err:', err)
                showErrorMsg('Cannot load toy')
            })
    }

    function handleSubmit(e) {
        e.preventDefault()
        toyService.save({ ...toy, labels: selectedLabels })
            .then(() => navigate('/toy'))
            .catch((err) => {
                console.log('handleSubmit err:', err)
                showErrorMsg(`Could not ${toy._id ? 'edit' : 'add'} toy`)
            })
    };

    function handleLabelChange(selectedOptions) {
        setSelectedLabels(selectedOptions.map(option => option.value))
    }

    function handleInputChange(e) {
        const { name, value } = e.target;

        if (name === 'inStock') {
            setToy({
                ...toy,
                [name]: !toy.inStock,
            })
            return
        }
        setToy({
            ...toy,
            [name]: value,
        });
    }


    if (!toy) return <div>loading...</div>
    return (
        <div>
            <Link to="/toy"><button title="Back to shop"><i className="fa-solid fa-arrow-left"></i></button></Link>
            <form onSubmit={handleSubmit}>
                <div>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={toy.name}
                        onChange={handleInputChange}
                    />
                </div>

                <div>
                    Price:
                    <input
                        type="number"
                        name="price"
                        value={toy.price}
                        onChange={handleInputChange}
                    />
                </div>

                <div>
                    In-stock:
                    <input
                        type="checkbox"
                        name="inStock"
                        checked={toy.inStock}
                        onChange={handleInputChange}
                    />
                    <Select options={labels}
                        name="labels"
                        value={labels.filter(label => selectedLabels.includes(label.value))}
                        onChange={handleLabelChange}
                        isMulti />
                </div>

                <button type="submit">{toy._id ? 'Edit' : 'Add'} toy</button>
            </form>
        </div>
    )
}