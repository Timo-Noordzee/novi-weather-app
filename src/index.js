import {AuthContextProvider} from "context/AuthContext";
import {LocationContextProvider} from "context/LocationContext";
import "index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter} from "react-router-dom";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <AuthContextProvider>
            <LocationContextProvider>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </LocationContextProvider>
        </AuthContextProvider>
    </React.StrictMode>
);