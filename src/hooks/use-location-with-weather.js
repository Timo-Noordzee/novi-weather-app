import {WeatherContext} from "context/WeatherContext";
import {useContext, useEffect, useState} from "react";

const useLocationWithWeather = id => {
    const {locationsWithWeather} = useContext(WeatherContext);
    const [location, setLocation] = useState(undefined);

    useEffect(() => {
        setLocation(locationsWithWeather[id]);
    }, [
        id,
        locationsWithWeather
    ]);

    return location;
};

export default useLocationWithWeather;
