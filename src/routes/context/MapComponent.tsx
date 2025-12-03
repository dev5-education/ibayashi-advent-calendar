import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css"
import MapProvider from "../../features/context-map/MapProvider.tsx";
import MoveToOntextButton from "../../features/context-map/actions/MoveToOntexButton.tsx";
import MoveToSakuraButton from "../../features/context-map/actions/MoveToSakuraButton.tsx";

export default function MapComponent() {
    const handleReady = (map: maplibregl.Map) => {
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
                "fill-color": "#0000ff",
                "fill-opacity": 0.5
            }
        });
    };

    return (
        <MapProvider onReady={handleReady}>
            <div className="map-actions">
                <MoveToOntextButton/>
                <MoveToSakuraButton/>
            </div>
        </MapProvider>
    );
}
