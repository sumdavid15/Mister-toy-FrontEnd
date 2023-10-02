import { useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { toyService } from "../services/toy.service"
import { useSelector } from "react-redux"

export function ToyMsg() {
    const [msg, setMsg] = useState('')
    const { toyId } = useParams()
    const navigate = useNavigate()
    const user = useSelector(storeState => storeState.userModule.loggedinUser)
    console.log('user:', user)

    function handleInputChange(e) {
        const { value } = e.target;
        setMsg(value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        setMsg('')
        toyService.addMsg(msg, toyId)
        navigate(`/toy/${toyId}`)
    }

    return (
        <section >
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        name="name"
                        value={msg}
                        onChange={handleInputChange}
                    />
                </div>
                {user && <button type="submit">Add review</button>}
            </form>
            <Link to={`/toy/${toyId}`}><button title="Back to toy details" onClick={() => setMsg('')}><i className="fa-solid fa-arrow-left"></i></button></Link>
        </section>
    )
}