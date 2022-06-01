import {useContext} from "react";
import {WeatherContext} from "context/WeatherContext";
import {useMemo} from "react";

const useLocationsWithWeather = () => {
    const {locationsWithWeather} = useContext(WeatherContext);
    return useMemo(() => Object.values(locationsWithWeather), [locationsWithWeather]);
};

export default useLocationsWithWeather;
