import useLocationWithWeather from "hooks/use-location-with-weather";
import {useEffect} from "react";
import {useParams} from "react-router-dom";

const LocationDetailsPage = () => {

    const {id} = useParams();
    const location = useLocationWithWeather(id)

    useEffect(() => {
        document.title = location?.city
    }, [location])

    return (
        <div>{id}</div>
    );
};

export default LocationDetailsPage;
