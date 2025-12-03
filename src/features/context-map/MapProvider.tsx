import {type ReactNode, useEffect, useRef} from "react";
import maplibregl from "maplibre-gl";
import {MapContext} from "./MapContext.ts";

export default function MapProvider({onReady, children}: {
    onReady?: (m: maplibregl.Map) => void,
    children?: ReactNode
}) {
    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const mapRef = useRef<maplibregl.Map | null>(null);

    useEffect(() => {
        if (!mapContainerRef.current) {
            return;
        }

        if (mapRef.current) {
            return;
        }

        const map = new maplibregl.Map({
            container: mapContainerRef.current,
            style: {
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
            },
            center: [135.4938, 34.6644444],
            zoom: 10
        });
        mapRef.current = map;

        map.on('load', () => {
            onReady?.(map);
        });

        return () => {
            map.remove();
            mapRef.current = null;
        };
    }, []);

    return (
        <MapContext.Provider value={{mapRef}}>
            <div
                className="map-container"
                ref={mapContainerRef}
            >
            </div>
            {/* 子孫コンポーネントにmapRefを共有する */}
            {children}
        </MapContext.Provider>
    );
}
