import './App.css'
import {HashRouter, Link, NavLink, Route, Routes} from "react-router-dom";
import MapComponent from "./routes/basic/MapComponent.tsx";
import MapComponentHook from "./routes/custom-hook/MapComponent.tsx";
import MapComponentContext from "./routes/context/MapComponent.tsx";
import MapComponentClass from "./routes/class/MapComponent.tsx";
import MapComponentLib from "./routes/react-map-gl/MapComponent.tsx";

function App() {
    return (
        <HashRouter>
            <nav style={{display: 'flex', gap: "12px"}}>
                <Link to="/">トップに戻る</Link>
                <NavLink
                    to="/basic"
                    className={({isActive}) =>
                        isActive ? "active" : ""
                    }
                >
                    コンポーネント
                </NavLink>
                <NavLink
                    to="/hook"
                    className={({isActive}) =>
                        isActive ? "active" : ""
                    }
                >
                    カスタムフック
                </NavLink>
                <NavLink
                    to="/context"
                    className={({isActive}) =>
                        isActive ? "active" : ""
                    }
                >
                    コンテキスト
                </NavLink>
                <NavLink
                    to="/class"
                    className={({isActive}) =>
                        isActive ? "active" : ""
                    }
                >
                    クラス
                </NavLink>
                <NavLink
                    to="/lib"
                    className={({isActive}) =>
                        isActive ? "active" : ""
                    }
                >
                    react-map-gl
                </NavLink>
            </nav>

            <Routes>
                <Route path="/" element={<p>あどべんとかれんだー</p>}></Route>
                <Route path="/basic" element={<MapComponent/>}></Route>
                <Route path="/hook" element={<MapComponentHook/>}></Route>
                <Route path="/context" element={<MapComponentContext/>}></Route>
                <Route path="/class" element={<MapComponentClass/>}></Route>
                <Route path="/lib" element={<MapComponentLib/>}></Route>
            </Routes>
        </HashRouter>
    );
}

export default App
