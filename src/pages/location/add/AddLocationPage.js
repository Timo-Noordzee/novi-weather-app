import Input from "components/common/Input/Input";
import LocationSuggestionCard from "components/location/LocationSuggestionCard";
import Page from "components/util/Page/Page";
import {LocationContext} from "context/LocationContext";
import "pages/location/add/AddLocationPage.scss";
import {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const AddLocationPage = () => {

    const navigate = useNavigate();
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const {getSuggestions, addLocation} = useContext(LocationContext);

    const onInputChanged = data => {
        setIsLoading(true);
        setInput(data.target.value);
    };

    const onLocationSelected = (id) => {
        const call = async () => {
            await addLocation(id);
            navigate("/location");
        };

        call()
            .catch(console.error);
    };

    useEffect(() => {
        const call = async () => {
            setSuggestions(await getSuggestions(input));
            setIsLoading(false);
        };

        call()
            .catch(console.error);
    }, [
        input,
        getSuggestions
    ]);

    return (
        <Page title={"Plaats toevoegen"}>
            <Input id={"search-input"} onChange={onInputChanged} type={"text"} placeholder={"Plaatsnaam"} />
            {!isLoading && input && suggestions.length === 0 &&
                <div className="no-suggestions-found">
                    <p>
                        Er geen geen plaatsen gevonden met de plaatsnaam <span className={"city"}>{input}</span>, probeer het opnieuw met een andere zoekwaarde
                    </p>
                </div>}
            <div className="location-suggestions">
                {suggestions.map(location => {
                    const parts = location.weergavenaam.split(",");
                    const province = parts.slice(1)
                        .join(",");
                    return <LocationSuggestionCard
                        key={location.id}
                        city={parts[0]}
                        province={province}
                        onClick={() => onLocationSelected(location.id)}
                    />;
                })}
            </div>
        </Page>
    );
};

export default AddLocationPage;
