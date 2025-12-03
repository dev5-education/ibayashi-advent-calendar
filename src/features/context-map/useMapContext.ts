import {useContext} from "react";
import {MapContext} from "./MapContext.ts";

// MapContextの値`mapRef`を取得するためのフック。Provider外から呼ばれた場合、エラーをthrowする。
export const useMapContext = () => {
    const ctx = useContext(MapContext);
    if (!ctx) {
        throw new Error("useMapContext must be used inside <MapProvider>");
    }
    return ctx;
};
