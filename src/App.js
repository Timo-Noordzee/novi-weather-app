import AuthenticatedRoute
    from "components/AuhenticatedRoute/AuthenticatedRoute";
import {AuthContext} from "context/AuthContext";
import LoginPage from "pages/login/LoginPage";
import {useContext} from "react";
import {Route, Routes} from "react-router-dom";
import "./App.css";

const EmptyPage = ({title}) => {

    const {signOut} = useContext(AuthContext)

    const onClickSignOut = async () => {
        await signOut()
    }

    return <div>
        <h1>{title}</h1>
        <button onClick={onClickSignOut}>Uitloggen</button>
    </div>
};

function App () {
    return (
        <div className="app" data-theme={"light"}>
            <Routes>
                <Route path="/" element={
                    <AuthenticatedRoute>
                        <EmptyPage title={"Home"} />
                    </AuthenticatedRoute>
                } />
                <Route path={"/login"} element={<LoginPage />} />
                <Route path={"/settings"} element={<AuthenticatedRoute>
                    <EmptyPage title={"Intellingen"}/>
                </AuthenticatedRoute>}/>
            </Routes>
        </div>
    );
}

export default App;
