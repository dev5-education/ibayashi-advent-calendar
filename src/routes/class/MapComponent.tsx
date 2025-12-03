import {useEffect, useRef} from "react";
import {mapManager} from "../../features/class-map";
import "maplibre-gl/dist/maplibre-gl.css"

export default function MapComponent() {
    const mapContainerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!mapContainerRef.current) {
            return;
        }

        mapManager.init(mapContainerRef.current);
        mapManager.addMarker(135.4938, 34.6644444);
        mapManager.addMarker(139.71211938, 35.63295224);
        mapManager.addPolygon(
            "sample-polygon",
            [
                [135.48, 34.66],
                [135.50, 34.66],
                [135.50, 34.68],
                [135.48, 34.68],
                [135.48, 34.66],
            ]
        );

        return () => {
            mapManager.destroy()
        };
    }, []);

    const moveToOntex = () => {
        mapManager.moveTo(135.4938, 34.6644444);
    };

    const moveToMeguroSakura = () => {
        mapManager.moveTo(139.71211938, 35.63295224);
    };

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
