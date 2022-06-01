import axios from "axios";
import {buildWebStorage, setupCache} from "axios-cache-interceptor";
import {AuthContext} from "context/AuthContext";
import {getIdToken} from "firebase/auth";
import {kelvinToCelsius, kelvinToFarenheit} from "helper/temperature-helper";
import useInterval from "hooks/use-interval";
import useLocations from "hooks/use-locations";
import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState
} from "react";

const localAxiosStorage = buildWebStorage(localStorage, "axios");
const cachedAxios = setupCache(axios, {storage: localAxiosStorage});

export const WeatherContext = createContext({});

export const WeatherContextProvider = props => {

    const {user, preferences} = useContext(AuthContext);
    const locations = useLocations();
    const [locationsWithWeather, setLocationsWithWeather] = useState({});

    const fetchWeatherData = useCallback(async () => {
        if (!user) {
            return {};
        }

        const idToken = await getIdToken(user);
        const response = await Promise.all(locations.map(async location => {
            const {latitude, longitude} = location.coordinates;
            const response = await cachedAxios.get(`https://europe-west1-novi-weather.cloudfunctions.net/api/weather?latitude=${latitude}&longitude=${longitude}&lang=nl`, {
                headers: {
                    "Authorization": `Bearer ${idToken}`
                },
                cache: {
                    ttl: 1000 * 60 * 5
                }
            });

            return ({location, weather: response.data});
        }));

        const mappedById = response.reduce((obj, entry) => {
            obj[entry.location.id] = {
                ...entry.location,
                weather: entry.weather
            };
            return obj;
        }, {});
        setLocationsWithWeather(mappedById);
    }, [
        user,
        locations
    ]);

    const displayTemperature = useCallback((kelvin) => {
        if (preferences.metric === "celcius") {
            const temperature = kelvinToCelsius(kelvin);
            return `${Math.round(temperature)}°C`;
        } else if (preferences.metric === "farenheit") {
            const temperature = kelvinToFarenheit(kelvin);
            return `${Math.round(temperature)}°F`;
        } else {
            return `${Math.round(kelvin)}°K`;
        }

    }, [preferences]);

    useEffect(() => {
        fetchWeatherData().catch(console.error);
    }, [fetchWeatherData]);

    useInterval(fetchWeatherData, 1000 * 60 * 60);

    const contextValue = useMemo(() => ({
        locationsWithWeather,
        displayTemperature
    }), [
        locationsWithWeather,
        displayTemperature
    ]);

    return <WeatherContext.Provider value={contextValue} {...props} />;
};
