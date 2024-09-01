import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
// import "bootstrap/dist/css/bootstrap.css"
// import "bootstrap"
import "./assets/css/bootstrap.css";
import "./assets/css/style.css";
import {Provider} from "react-redux";
import store from "./redux/store/Store.js";
import App from "./App.jsx";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </StrictMode>,
)
