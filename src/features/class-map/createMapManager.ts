import maplibregl from "maplibre-gl";

export function createMapManager() {
    let map: maplibregl.Map | null = null;

    function init(mapContainer: HTMLDivElement) {
        if (map) {
            return;
        }

        map = new maplibregl.Map({
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

    function destroy() {
        map?.remove();
        map = null;
    }

    return {
        init,
        destroy,
        get() {
            return map;
        }
    };
}
