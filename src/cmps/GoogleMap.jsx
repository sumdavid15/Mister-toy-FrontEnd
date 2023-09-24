import React from "react";
import GoogleMapReact from 'google-map-react';
import { utilService } from "../services/util.service";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export function GoogleMap({ coordinates }) {

    return (
        // Important! Always set the container height explicitly
        <div style={{ height: '100vh', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyCF6YSAF__0aiqIrTE2ZClywS74stbpWuE" }}
                center={coordinates.center}
                zoom={coordinates.zoom}
            >
                <AnyReactComponent
                    lat={32.109333}
                    lng={34.855499}
                    text={<img src={utilService.getAssetSrc('marker.png')} alt="" />}
                />
                <AnyReactComponent
                    lat={32.017136}
                    lng={34.745441}
                    text={<img src={utilService.getAssetSrc('marker.png')} alt="" />}
                />
                <AnyReactComponent
                    lat={32.4356}
                    lng={34.9179}
                    text={<img src={utilService.getAssetSrc('marker.png')} alt="" />}
                />
            </GoogleMapReact>
        </div>
    );
}