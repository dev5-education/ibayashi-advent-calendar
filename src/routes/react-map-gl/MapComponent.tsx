import Map from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css"
import {useState} from "react";
import {Layer, Marker, Source} from "react-map-gl/maplibre";
import type {GeoJSON} from "geojson";

const SAMPLE_POLYGON_DATA: GeoJSON = {
    type: "Feature",
    properties: {
        name: "サンプルポリゴン"
    },
    geometry: {
        type: "Polygon",
        coordinates: [[
            [135.48, 34.66],
            [135.50, 34.66],
            [135.50, 34.68],
            [135.48, 34.68],
            [135.48, 34.66],
        ]]
    },
};

export default function MapComponent() {
    const [viewState, setViewState] = useState({
        longitude: 135.4938,
        latitude: 34.6644444,
        zoom: 10
    });

    const moveToOntex = () => {
        setViewState(prevState => {
            return {
                ...prevState,
                longitude: 135.4938,
                latitude: 34.6644444
            };
        });
    };

    const moveToMeguroSakura = () => {
        setViewState(prevState => {
            return {
                ...prevState,
                longitude: 139.71211938,
                latitude: 35.63295224
            };
        });
    };

    return (
        <>
            <Map
                style={{width: "100%", height: "800px", marginBottom: "2rem"}}
                {...viewState}
                mapStyle={{
                    version: 8,
                    sources: {
                        t_pale: {
                            type: 'raster',
                            tiles: ['https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png'],
                            tileSize: 256,
                            attribution:
                                '<a href="https://www.gsi.go.jp/kikakuchousei/kikakuchousei40182.html" target="_blank">地理院タイル</a>',
                        },
                    },
                    layers: [
                        {
                            id: 't_pale',
                            type: 'raster',
                            source: 't_pale',
                            minzoom: 0,
                            maxzoom: 18,
                        },
                    ],
                }}
            >
                <Marker longitude={135.4938} latitude={34.6644444}/>
                <Marker longitude={139.71211938} latitude={35.63295224}/>
                <Source
                    id="sample-polygon"
                    type="geojson"
                    data={SAMPLE_POLYGON_DATA}
                >
                    <Layer
                        id="sample-polygon-fill"
                        type="fill"
                        paint={{
                            'fill-color': '#00ffff',
                            'fill-opacity': 0.5
                        }}
                    />
                </Source>
            </Map>
            <div className="map-actions">
                <button type="button" onClick={moveToOntex}>オンテックス難波ビルへ移動</button>
                <button type="button" onClick={moveToMeguroSakura}>パスコ目黒さくらビルへ移動</button>
            </div>
        </>
    );
}
