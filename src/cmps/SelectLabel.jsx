import { useState } from "react"
import { toyService } from "../services/toy.service"

export function SelectLabel() {
    const labels = toyService.getLabels()
    const [selectedLabels, setSelectedLabels] = useState()

    function handleLabelChange(selectedOptions) {
        setSelectedLabels(selectedOptions.map(option => option.value))
    }

    return (
        <Select options={labels}
            name="labels"
            value={labels.filter(label => selectedLabels.includes(label.value))}
            onChange={handleLabelChange}
            isMulti />
    )
}