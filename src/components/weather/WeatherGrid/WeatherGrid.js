import {
    ReactComponent as WindDirectionArrow
} from "assets/icons/arrow_north.svg";
import "components/weather/WeatherGrid/WeatherGrid.scss";
import {WeatherContext} from "context/WeatherContext";
import {useContext} from "react";

const WeatherGridItem = ({title, children}) => {
    return (
        <div className="weather-grid-item">
            <small className="title">{title}</small>
            {children}
        </div>
    );
};

const WeatherGrid = ({weather}) => {
    const {displayTemperature} = useContext(WeatherContext);

    const {
        pressure,
        humidity,
        pop,
        dew_point: dewPoint,
        uvi,
        clouds,
        wind_speed: windSpeed,
        wind_deg: windDegrees,
        wind_gust: windGust
    } = weather;

    return (
        <div className="weather-grid">
            <WeatherGridItem title={"Neerslag"}>
                <p className={"value"}>{Math.round(pop * 100)}%</p>
            </WeatherGridItem>
            <WeatherGridItem title={"Luchtvochtigheid"}>
                <p className={"value"}>{humidity}%</p>
            </WeatherGridItem>
            <WeatherGridItem title={"Luchtdruk"}>
                <p className={"value"}>{pressure} hPa</p>
            </WeatherGridItem>
            <WeatherGridItem title={"Dauwpunt"}>
                <p className={"value"}>{displayTemperature(dewPoint)}</p>
            </WeatherGridItem>
            <WeatherGridItem title={"UV Index"}>
                <p className={"value"}>{uvi}</p>
            </WeatherGridItem>
            <WeatherGridItem title={"Bewolking"}>
                <p className={"value"}>{clouds}%</p>
            </WeatherGridItem>
            <WeatherGridItem title={"Windrichting"}>
                <div>
                    <WindDirectionArrow className={"wind-direction-arrow"} style={{
                        transform: `rotate(${windDegrees}deg)`,
                        fill: `var(--text-color)`
                    }} />
                </div>
            </WeatherGridItem>
            <WeatherGridItem title={"Windsnelheid"}>
                <p className={"value"}>{windSpeed} m/s</p>
            </WeatherGridItem>
            <WeatherGridItem title={"Windstoten"}>
                <p className={"value"}>{windGust ?
                    `${windGust} m/s` :
                    "onbekend"}</p>
            </WeatherGridItem>
        </div>
    );
};

export default WeatherGrid;
