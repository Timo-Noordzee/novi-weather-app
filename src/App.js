import AuthenticatedRoute
    from "components/util/AuhenticatedRoute/AuthenticatedRoute";
import {AuthContext} from "context/AuthContext";
import AddLocationPage from "pages/location/add/AddLocationPage";
import LocationDetailsPage from "pages/location/details/LocationDetailsPage";
import LocationsPage from "pages/location/overview/LocationsPage";
import LoginPage from "pages/login/LoginPage";
import {useContext} from "react";
import {Route, Routes} from "react-router-dom";
import "./App.css";

const EmptyPage = ({title}) => {

    const {signOut} = useContext(AuthContext);

    const onClickSignOut = async () => {
        await signOut();
    };

    return <div>
        <h1>{title}</h1>
        <button onClick={onClickSignOut}>Uitloggen</button>
    </div>;
};

function App () {
    return (
        <div className="app" data-theme={"light"}>
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
                    <EmptyPage title={"Intellingen"} />
                </AuthenticatedRoute>} />
            </Routes>
        </div>
    );
}

export default App;
