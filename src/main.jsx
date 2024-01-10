import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";


import { HashRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
    <HashRouter>
        <App />
    </HashRouter>
);
