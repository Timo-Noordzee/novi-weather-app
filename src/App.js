import AuthenticatedRoute
    from "components/util/AuhenticatedRoute/AuthenticatedRoute";
import {AuthContext} from "context/AuthContext";
import AddLocationPage from "pages/location/add/AddLocationPage";
import LocationDetailsPage from "pages/location/details/LocationDetailsPage";
import LocationsPage from "pages/location/overview/LocationsPage";
import LoginPage from "pages/login/LoginPage";
import SettingsPage from "pages/SettingsPage/SettingsPage";
import {useContext} from "react";
import {Route, Routes} from "react-router-dom";
import "./App.css";

function App () {
    const {preferences} = useContext(AuthContext)

    return (
        <div className="app" data-theme={preferences.theme}>
            <Routes>
                <Route path="/" element={
                    <AuthenticatedRoute>
                        <LocationsPage />
                    </AuthenticatedRoute>
                } />
                <Route path={"/login"} element={<LoginPage />} />
                <Route path={"/location/*"} element={<AuthenticatedRoute>
                    <Routes>
                        <Route index element={<LocationsPage />} />
                        <Route exact path={"add"} element={
                            <AddLocationPage />} />
                        <Route path={":id"} element={<LocationDetailsPage />} />
                    </Routes>
                </AuthenticatedRoute>} />
                <Route path={"/locations"} element={<AuthenticatedRoute>
                    <LocationsPage />
                </AuthenticatedRoute>} />
                <Route path={"/settings"} element={<AuthenticatedRoute>
                    <SettingsPage />
                </AuthenticatedRoute>} />
            </Routes>
        </div>
    );
}

export default App;
