import Card from "components/common/Card/Card";
import "components/weather/CurrentWeatherCard/CurrentWeatherCard.scss";
import DaytimeIndicator
    from "components/weather/DaytimeIndicator/DaytimeIndicator";
import WeatherGrid from "components/weather/WeatherGrid/WeatherGrid";
import dayjs from "dayjs";
import {useMemo} from "react";

const CurrentWeatherCard = ({weather}) => {

    const sunset = useMemo(() => dayjs.unix(weather.current.sunset), [weather]);
    const sunrise = useMemo(() => dayjs.unix(weather.current.sunrise), [weather]);

    return (
        <Card title={"Huidige weer"}>
            <div className="current-weather-card-body">
                <WeatherGrid weather={weather.current} />
                <DaytimeIndicator sunset={sunset} sunrise={sunrise} />
            </div>
        </Card>
    );
};

export default CurrentWeatherCard;
