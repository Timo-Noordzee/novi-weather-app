import {ReactComponent as ErrorIcon} from "assets/error.svg";
import "components/AuhenticatedRoute/AuthenticatedRoute.scss";
import LoadingIndicator from "components/LoadingIndicator/LoadingIndicator";
import {AuthContext} from "context/AuthContext";
import {useContext} from "react";
import {Navigate, useLocation} from "react-router-dom";

const AuthenticatedRoute = ({children}) => {
    const location = useLocation();
    const {user, loading, error} = useContext(AuthContext);

    if (loading) {
        return <div className="loading-indicator">
            <LoadingIndicator />
            <p>Aan het laden...</p>
        </div>;
    }

    if (error) {
        return <div className="error-page">
            <ErrorIcon className={"error-icon"} />
            <h1>Er is iets fout gegaan</h1>
            <p>{error}</p>
        </div>;
    }

    if (!user) {
        return <Navigate to={"/login"} state={{from: location}} replace />;
    }

    return children;
};

export default AuthenticatedRoute;
