import {useMap} from "../../hooks/useMap.ts";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css"

export default function MapComponent() {
    const {mapContainerRef, moveToOntex, moveToMeguroSakura} = useMap((map) => {
        new maplibregl.Marker()
            .setLngLat([135.4938, 34.6644444])
            .addTo(map);

        new maplibregl.Marker()
            .setLngLat([139.71211938, 35.63295224])
            .addTo(map);

        map.addSource("sample-polygon", {
            type: "geojson",
            data: {
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
            }
        });

        map.addLayer({
            id: "sample-polygon-fill",
            type: "fill",
            source: "sample-polygon",
            layout: {},
            paint: {
                "fill-color": "#00ff00",
                "fill-opacity": 0.5
            }
        });
    });

    return (
        <>
            <div
                className="map-container"
                ref={mapContainerRef}
            >
            </div>
            <div className="map-actions">
                <button type="button" onClick={moveToOntex}>オンテックス難波ビルへ移動</button>
                <button type="button" onClick={moveToMeguroSakura}>パスコ目黒さくらビルへ移動</button>
            </div>
        </>
    );
}
