import "components/weather/WeatherIcon/WeatherIcon.scss";
import {getWeatherIconPath} from "helper/weather-helper";

function WeatherIcon ({id, onClick}) {
    const path = getWeatherIconPath(id);
    return <img className={"weather-icon"} onClick={onClick} src={path} alt="icon" />;
}

export default WeatherIcon;
