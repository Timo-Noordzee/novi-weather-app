import {getWeatherIconPath} from "helper/weather-helper";
import useLocationWithWeather from "hooks/use-location-with-weather";
import {useEffect} from "react";
import {useParams} from "react-router-dom";

const LocationDetailsPage = () => {

    const {id} = useParams();
    const location = useLocationWithWeather(id);

    useEffect(() => {
        if (location) {
            const iconId = location.weather.current.weather[0].icon;
            document.getElementById("favicon").href = getWeatherIconPath(iconId);
            document.title = location.city;
        }

        return () => {
            document.getElementById("favicon").href = "/assets/logo.svg";
        };
    }, [location]);

    return (
        <div>
            <p>{id}</p>
        </div>
    );
};

export default LocationDetailsPage;
