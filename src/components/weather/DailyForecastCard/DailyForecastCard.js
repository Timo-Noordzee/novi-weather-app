import Accordion from "components/common/Accordion/Accordion";
import AccordionDetails from "components/common/Accordion/AccordionDetails";
import AccordionSummary from "components/common/Accordion/AccordionSummary";
import Card from "components/common/Card/Card";
import "components/weather/DailyForecastCard/DailyForecastCard.scss";
import DaytimeIndicator
    from "components/weather/DaytimeIndicator/DaytimeIndicator";
import WeatherGrid from "components/weather/WeatherGrid/WeatherGrid";
import WeatherIcon from "components/weather/WeatherIcon/WeatherIcon";
import {WeatherContext} from "context/WeatherContext";
import dayjs from "dayjs";
import {useContext, useMemo} from "react";

const DailyForecastEntry = ({weather}) => {
    const {displayTemperature} = useContext(WeatherContext);

    const date = useMemo(() => dayjs(weather.dt * 1000), [weather.dt]);
    const sunset = useMemo(() => dayjs.unix(weather.sunset), [weather]);
    const sunrise = useMemo(() => dayjs.unix(weather.sunrise), [weather]);

    const dayOfTheWeek = date.format("dddd");
    const dateAndMonth = date.format("DD MMMM");
    const tempMin = displayTemperature(weather.temp.min);
    const tempMax = displayTemperature(weather.temp.max);

    return (
        <Accordion>
            <AccordionSummary className={"daily-forecast-entry-header"}>
                <WeatherIcon id={weather.weather[0].icon} />
                <div className="section">
                    <p className="main">{dayOfTheWeek}</p>
                    <small className="secondary">{dateAndMonth}</small>
                </div>
                <div className="section">
                    <p className="main">
                        {tempMin} tot {tempMax}
                    </p>
                    <small className={"secondary"}>{weather.weather[0].description}</small>
                </div>
            </AccordionSummary>
            <AccordionDetails className={"daily-forecast-entry-body"}>
                <WeatherGrid weather={weather} />
                <DaytimeIndicator sunrise={sunrise} sunset={sunset}/>
            </AccordionDetails>
        </Accordion>
    );
};

const DailyForecastCard = ({forecasts}) => {

    return (
        <Card title={"Voorspelling per dag"}>
            {forecasts.map(forecast => <DailyForecastEntry
                key={forecast.dt}
                weather={forecast}
            />)}
        </Card>
    );
};

export default DailyForecastCard;
