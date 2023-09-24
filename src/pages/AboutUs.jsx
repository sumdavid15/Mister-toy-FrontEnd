import { utilService } from "../services/util.service"
import { GoogleMap } from "../cmps/GoogleMap"
import { useState } from "react"
import { StorePreview } from "../cmps/StorePreview"

export function AboutUs() {
    const storeLocations = [{
        city: 'Tel-aviv',
        coordinates: {
            lat: 32.109333,
            lng: 34.855499,
        }
    }, {
        city: 'Hadera',
        coordinates: {
            lat: 32.4356,
            lng: 34.9179,
        }
    }, {
        city: 'Bat-yam',
        coordinates: {
            lat: 32.017136,
            lng: 34.745441,
        }
    }]

    const [coordinates, setCoordinates] = useState({
        center: {
            lat: 32.109333,
            lng: 34.855499,
        },
        zoom: 11,
    })

    function setCenterCoordinates(lat, lng) {
        setCoordinates({ ...coordinates, center: { lat, lng } })
    }


    return (
        <section>
            <h2>About Us</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni aperiam quo veniam velit dolor reprehenderit, laudantium consequatur neque numquam labore quae. Accusamus libero perferendis ducimus? Alias unde hic quisquam doloremque.</p>
            <section className="map-container" >
                <GoogleMap coordinates={coordinates} />
                <div className="store-container" style={{ width: 300 }}>
                    {storeLocations.map(store =>
                        <StorePreview key={utilService.makeId()} store={store} setCenterCoordinates={setCenterCoordinates} />
                    )}
                </div>
            </section>
        </section >
    )
}



