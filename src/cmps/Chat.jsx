import { useEffect, useState } from "react"
import { socketService, SOCKET_EMIT_SEND_MSG, SOCKET_EVENT_ADD_MSG, SOCKET_EMIT_SET_TOPIC } from '../services/socket.service'
import { toyService } from "../services/toy.service"

export function Chat({ toyMsgs, user, toyId }) {
    console.log('toyMsgs:', toyMsgs)

    const [msg, setMsg] = useState('')
    const [msgs, setMsgs] = useState(toyMsgs || [])
    const topic = toyId

    useEffect(() => {
        socketService.on(SOCKET_EVENT_ADD_MSG, addMsg)
        return () => {
            socketService.off(SOCKET_EVENT_ADD_MSG, addMsg)
        }
    }, [])

    useEffect(() => {
        socketService.emit(SOCKET_EMIT_SET_TOPIC, topic)
    }, [topic])

    function addMsg(newMsg) {
        console.log('newMsg Emited:', newMsg)
        setMsgs([...msgs, newMsg])
    }

    async function sendMsg(ev) {
        ev.preventDefault()
        const newMsg = await toyService.addMsg(msg, toyId)
        socketService.emit(SOCKET_EMIT_SEND_MSG, newMsg)
        setMsg('')
    }

    function removeMsg(msgId) {
        const toyMsg = msgs.find(msg => msg.id === msgId)
        if (user._id === toyMsg.by._id || user.isAdmin) {
            toyService.removeMsg(msgId, toyId)
        }
        console.log(msgId);
    }

    function handleFormChange(ev) {
        const { value } = ev.target
        setMsg(value)
    }

    return (
        <section style={{ marginTop: 20, border: '1px solid black', width: 'max-content', padding: 10 }}>

            <form onSubmit={sendMsg}>
                <input type="text" name="txt" value={msg} onChange={handleFormChange} placeholder="enter you message" autoComplete="off" />
                <button type="submit">send</button>
            </form>

            <div style={{ marginTop: 10, width: 300, height: '40vh', overflowY: 'scroll', scrollBehavior: 'smooth' }}>
                {!msgs?.length ? <div>No messages</div> :
                    msgs.map((msg, i) => {
                        return (
                            <div key={i} style={{ border: '1px solid black', padding: 5, marginTop: 10 }}>
                                <div className="flex justify-between">
                                    <h1>{user?._id === msg.by._id ? 'Me' : msg.by.fullname}</h1>
                                    <p>{msg.createdAt}</p>
                                </div>
                                <div className="flex justify-between" style={{ gap: 10 }}>
                                    <p>{msg.txt}</p>
                                    <div className="flex" style={{ gap: 10 }}>
                                        {(user?._id === msg.by._id || user?.isAdmin) && <button onClick={() => { removeMsg(msg.id) }}><i className="fa-solid fa-trash"></i></button>}
                                    </div>
                                </div>
                            </div>)
                    })}
            </div>
        </section >
    )
}