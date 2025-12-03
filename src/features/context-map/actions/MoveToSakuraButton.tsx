import {useMapContext} from "../useMapContext.ts";

export default function MoveToSakuraButton() {
    const {mapRef} = useMapContext();

    const moveToMeguroSakura = () => {
        if (!mapRef.current) {
            return;
        }

        const map = mapRef.current;
        map.setCenter([139.71211938, 35.63295224]);
    };

    return (
        <button type="button" onClick={moveToMeguroSakura}>パスコ目黒さくらビルへ移動</button>
    );
}
