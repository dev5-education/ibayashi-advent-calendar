import {useEffect, useRef} from "react";
import maplibregl from "maplibre-gl";

// 地図の処理をカスタムマップを作成し、切り出す。初期化後に合わせて実行したい処理を引数で受ける。
export function useMap(onReady?: (m: maplibregl.Map) => void) {
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

    const moveToOntex = () => {
        if (!mapRef.current) {
            return;
        }

        const map = mapRef.current;
        map.setCenter([135.4938, 34.6644444]);
    };

    const moveToMeguroSakura = () => {
        if (!mapRef.current) {
            return;
        }

        const map = mapRef.current;
        map.setCenter([139.71211938, 35.63295224]);
    };

    return {
        mapContainerRef,
        moveToOntex,
        moveToMeguroSakura,
    };
}
