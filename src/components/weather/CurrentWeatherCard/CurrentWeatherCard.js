import Card from "components/common/Card/Card";
import "components/weather/CurrentWeatherCard/CurrentWeatherCard.scss";
import DaytimeIndicator
    from "components/weather/DaytimeIndicator/DaytimeIndicator";
import WeatherGrid from "components/weather/WeatherGrid/WeatherGrid";
import WeatherIcon from "components/weather/WeatherIcon/WeatherIcon";
import {WeatherContext} from "context/WeatherContext";
import dayjs from "dayjs";
import {useContext, useMemo} from "react";

const CurrentWeatherCard = ({weather}) => {

    const {displayTemperature} = useContext(WeatherContext);
    const sunset = useMemo(() => dayjs.unix(weather.current.sunset), [weather]);
    const sunrise = useMemo(() => dayjs.unix(weather.current.sunrise), [weather]);

    return (
        <Card title={"Huidige weer"} className={"current-weather-card-body"}>
            <div className={"current-weather-header"}>
                <WeatherIcon id={weather.current.weather[0].icon} />
                <div className="current-weather-summary">
                    <div className="temperature-wrapper">
                        <h2 className={"temperature"}>{displayTemperature(weather.current.temp)}</h2>
                        <small className={"feels-like-temperature"}>(Voelt als {displayTemperature(weather.current.feels_like)})</small>
                    </div>
                    <p className="description">{weather.current.weather[0].description}</p>
                </div>
            </div>
            <div className="current-weather-details">
                <WeatherGrid weather={({
                    ...weather.current,
                    pop: weather.hourly[0].pop
                })} />
                <DaytimeIndicator sunset={sunset} sunrise={sunrise} />
            </div>
        </Card>
    );
};

export default CurrentWeatherCard;
