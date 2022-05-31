import {Route, Routes} from "react-router-dom";
import "./App.css";

const EmptyPage = ({title}) => {
    return <h1>{title}</h1>;
};

function App () {
    return (
        <div className="app">
            <Routes>
                <Route path="/" element={<EmptyPage title={"Home"} />} />
                <Route path={"/login"} element={
                    <EmptyPage title={"Login"} />} />
            </Routes>
        </div>
    );
}

export default App;
