import {AuthContextProvider} from "context/AuthContext";
import {LocationContextProvider} from "context/LocationContext";
import {WeatherContextProvider} from "context/WeatherContext";
import {locale} from "dayjs";
import "index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter} from "react-router-dom";
import App from "./App";

require("dayjs/locale/nl");
locale("nl");

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <AuthContextProvider>
            <LocationContextProvider>
                <WeatherContextProvider>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </WeatherContextProvider>
            </LocationContextProvider>
        </AuthContextProvider>
    </React.StrictMode>
);
