export function StorePreview({ store, setCenterCoordinates }) {

    return (
        <section className="store-location-card">
            <div>{store.city}</div>
            <div style={{ display: 'flex', justifyContent: "space-between", alignItems: 'center' }}>
                <p>Open: 8:15 - 18:00</p>
                <button onClick={() => setCenterCoordinates(store.coordinates.lat, store.coordinates.lng)}>go</button>
            </div>
        </section>
    )
}