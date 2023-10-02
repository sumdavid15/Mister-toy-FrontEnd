export function ToyMsgPreview({ msgs, user }) {
    console.log('user: ToyMsgPreview', user)

    return (
        <section>
            {msgs.map(msg => {
                return (
                    <section key={msg.id} className="flex" style={{ maxWidth: 300, justifyContent: 'space-between' }}>
                        <div>{msg.txt}</div>
                        {(user && user._id === msg.by._id || user?.isAdmin) && <div>
                            <button><i className="fa-solid fa-pen-to-square"></i></button>
                            <button><i className="fa-solid fa-trash"></i></button>
                        </div>}
                    </section>
                )
            })}
        </section >
    )

}