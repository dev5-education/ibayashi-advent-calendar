import {useMapContext} from "../useMapContext.ts";

export default function MoveToOntextButton() {
    const {mapRef} = useMapContext();

    const moveToOntex = () => {
        if (!mapRef.current) {
            return;
        }

        const map = mapRef.current;
        map.setCenter([135.4938, 34.6644444]);
    };

    return (
        <button type="button" onClick={moveToOntex}>オンテックス難波ビルへ移動</button>
    );
}
