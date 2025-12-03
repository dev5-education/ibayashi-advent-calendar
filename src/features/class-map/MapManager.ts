import maplibregl from "maplibre-gl";

export class MapManager {
    private map: maplibregl.Map | null = null;

    constructor() {
    }

    init(mapContainer: HTMLDivElement) {
        if (this.map) {
            return;
        }

        this.map = new maplibregl.Map({
            container: mapContainer,
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
    }

    addMarker(lan: number, lng: number) {
        if (!this.map) {
            return;
        }
        new maplibregl.Marker()
            .setLngLat([lan, lng])
            .addTo(this.map);
    }

    addPolygon(sourceId: string, coordinates: number[][]) {
        if (!this.map) {
            return;
        }

        if (!this.map.isStyleLoaded()) {
            this.map.once('load', () => {
                this.addPolygon(sourceId, coordinates);
            });

            return;
        }

        this.map.addSource(sourceId, {
            type: "geojson",
            data: {
                type: "Feature",
                properties: {
                    name: "サンプルポリゴン"
                },
                geometry: {
                    type: "Polygon",
                    coordinates: [coordinates]
                },
            }
        });

        this.map.addLayer({
            id: sourceId + "-fill",
            type: "fill",
            source: sourceId,
            layout: {},
            paint: {
                "fill-color": "#ffff00",
                "fill-opacity": 0.5
            }
        });
    }

    moveTo(lng: number, lat: number) {
        this.map?.setCenter([lng, lat]);
    }

    destroy() {
        this.map?.remove();
        this.map = null;
    }
}
