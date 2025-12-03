import {useEffect, useRef} from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css"

export default function MapComponent() {
    // 地図を表示するDOM要素への参照（MapLibreは実DOMが必要）
    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    // MapLibreのMapインスタンスへの参照（再レンダリング間で保持）
    const mapRef = useRef<maplibregl.Map | null>(null);

    useEffect(() => {
        // コンテナのDOM要素が存在しない場合は何もしない
        if (!mapContainerRef.current) {
            return;
        }

        // 既に地図が初期化されている場合は何もしない（二重初期化防止）
        if (mapRef.current) {
            return;
        }

        // Mapインスタンスの初期化
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
            // マーカーを追加する
            new maplibregl.Marker()
                .setLngLat([135.4938, 34.6644444])
                .addTo(map);

            new maplibregl.Marker()
                .setLngLat([139.71211938, 35.63295224])
                .addTo(map);

            // ポリゴンを追加する
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
                    "fill-color": "#ff0000",
                    "fill-opacity": 0.5
                }
            });
        });

        // クリーンアップ関数：コンポーネントのアンマウント時に地図インスタンスを破棄
        return () => {
            mapRef.current?.remove();
            mapRef.current = null;
        }
    }, []) // 空の依存配列を指定し、初回レンダリング時のみ実行

    // 中心位置をオンテックス難波ビルに移動する
    const moveToOntex = () => {
        if (!mapRef.current) {
            return;
        }

        const map = mapRef.current;
        map.setCenter([135.4938, 34.6644444]);
    };

    // 中心位置をパスコ目黒さくらビルに移動する
    const moveToMeguroSakura = () => {
        if (!mapRef.current) {
            return;
        }

        const map = mapRef.current;
        map.setCenter([139.71211938, 35.63295224]);
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
