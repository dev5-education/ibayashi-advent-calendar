import {createContext, type RefObject} from "react";
import maplibregl from "maplibre-gl";

interface MapContextValue {
    mapRef: RefObject<maplibregl.Map | null>;
}

// mapRefをProvider配下で共有するためのContextを作成する
export const MapContext = createContext<MapContextValue | null>(null);
