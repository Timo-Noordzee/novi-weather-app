import Button from "components/common/Button/Button";
import LocationCard from "components/location/LocationCard";
import Page from "components/util/Page/Page";
import {LocationContext} from "context/LocationContext";
import useLocationsWithWeather from "hooks/use-locations-with-weather";
import "pages/location/overview/LocationsPage.scss";
import {useContext} from "react";
import {useNavigate} from "react-router-dom";

const LocationsPage = () => {

    const navigate = useNavigate();
    const locations = useLocationsWithWeather();
    const {removeLocation} = useContext(LocationContext);

    const onClickLocation = id => {
        navigate(`/location/${id}`);
    };

    const onClickDeleteLocation = id => {
        const call = async () => {
            await removeLocation(id);
        };
        call().catch(console.error);
    };

    const onClickAddLocation = () => navigate("/location/add");

    return (
        <Page title={"Mijn locaties"} showBackButton={false}>
            {locations.length === 0 && <div className={"no-locations-found"}>
                <p>Geen locaties gevonden, voeg een locatie toe door op onderstaande knop te klikken</p>
            </div>}
            <div className="locations-list">
                {locations.map(location => <LocationCard
                    key={location.id}
                    city={location.city}
                    weather={location.weather.current}
                    province={location.province}
                    onClick={() => onClickLocation(location.id)}
                    onClickDelete={() => onClickDeleteLocation(location.id)}
                />)}
            </div>
            <Button onClick={onClickAddLocation}>Plaats toevoegen</Button>
        </Page>
    );
};

export default LocationsPage;
