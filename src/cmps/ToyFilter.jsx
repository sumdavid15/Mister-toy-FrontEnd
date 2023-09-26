import { useEffect, useRef, useState } from "react"
import { utilService } from "../services/util.service"
import { SortToy } from "./SortToy"
import Select from "react-select"
import { toyService } from "../services/toy.service"
import { Link } from "react-router-dom"

export function ToyFilter({ filterBy, onSetFilter }) {

    const labels = toyService.getLabels()
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    const [selectedLabels, setSelectedLabels] = useState([])

    useEffect(() => {
        onSetFilter({ ...filterByToEdit })
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = (type === 'number') ? (+value || '') : value
        setFilterByToEdit(({ ...filterByToEdit, [field]: value }))
    }

    function handleLabelChange(selectedOptions) {
        setSelectedLabels(selectedOptions.map(option => option.value))
    }

    return (
        <section className="toy-filter" >
            <div className="toy-form">
                <button title="Add your Toy" className="add-toy-btn"><Link to={`/toy/edit`}>Add-toy</Link></button>

                <input type="text" title="Search toy by name"
                    id="name"
                    name="name"
                    placeholder="By name"
                    value={filterByToEdit.name}
                    onChange={handleChange}
                />
                <SortToy onChange={handleChange} />
                <section >

                    <div className="toy-filter-instock">
                        <label htmlFor="all">
                            {' '}
                            All <input type="radio" name="inStock" value="all" id="all" onChange={handleChange} />{' '}
                        </label>
                        <label htmlFor="done">
                            {' '}
                            In-Stock <input type="radio" name="inStock" value="inStock" id="inStock" onChange={handleChange} />{' '}
                        </label>
                        <label htmlFor="undone">
                            {' '}
                            Out of stock <input type="radio" name="inStock" value="OutOfStock" id="OutOfStock" onChange={handleChange} />{' '}
                        </label>
                    </div>
                </section>
                <button style={{ width: '100%' }} title="sort direction" onClick={() => {
                    setFilterByToEdit(({ ...filterByToEdit, dir: !filterByToEdit.dir }))
                }}><i className="fa-solid fa-arrows-up-down"></i></button>
            </div>
            <Select
                styles={{
                    container: (baseStyles, state) => ({
                        ...baseStyles,
                        width: '100%',
                    })
                }}
                options={labels}
                name="labels"
                value={labels.filter(label => selectedLabels.includes(label.value))}
                onChange={(selectedOption) => {
                    handleLabelChange(selectedOption)
                    setFilterByToEdit({ ...filterByToEdit, labels: selectedOption })
                }}
                isMulti />
        </section>
    )
}