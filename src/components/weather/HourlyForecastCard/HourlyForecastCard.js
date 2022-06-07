import "components/weather/HourlyForecastCard/HourlyForecastCard.scss";
import Card from "components/common/Card/Card";
import WeatherIcon from "components/weather/WeatherIcon/WeatherIcon";
import {WeatherContext} from "context/WeatherContext";
import dayjs from "dayjs";
import {useContext, useMemo} from "react";
import {ReactComponent as HumidityIcon} from "assets/icons/humidity.svg";

const HourlyForecastEntry = ({weather}) => {

    const {temp, dt, pop} = weather

    const {displayTemperature} = useContext(WeatherContext)
    const time = useMemo(() => dayjs(new Date(dt * 1000)), [dt])
    const probabilityOfPrecipitation = useMemo(() => Math.round(pop * 100), [pop])

    return <div className="hourly-forecast-entry">
        <small className="time">{time.format("dd HH:mm")}</small>
        <div className="weather">
            <WeatherIcon id={weather.weather[0].icon} />
            <small>{displayTemperature(temp)}</small>
        </div>
        <div className="precipitation">
            <HumidityIcon className="icon" />
            <small>{probabilityOfPrecipitation}%</small>
        </div>
    </div>
}

const HourlyForecastCard = ({forecasts}) => {

    return (
        <Card title={"Voorspelling per uur"}>
            <div className="hourly-forecast">
                {forecasts.map((weather) => <HourlyForecastEntry
                    key={weather.dt}
                    weather={weather}
                />)}
            </div>
        </Card>
    )
};

export default HourlyForecastCard;
