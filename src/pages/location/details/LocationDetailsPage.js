import Card from "components/common/Card/Card";
import IconButton from "components/common/IconButton/IconButton";
import LoadingIndicator
    from "components/util/LoadingIndicator/LoadingIndicator";
import Sidenav from "components/util/Sidenav/Sidenav";
import CurrentWeatherCard
    from "components/weather/CurrentWeatherCard/CurrentWeatherCard";
import HourlyForecastCard
    from "components/weather/HourlyForecastCard/HourlyForecastCard";
import dayjs from "dayjs";
import {getWeatherIconPath} from "helper/weather-helper";
import useLocationWithWeather from "hooks/use-location-with-weather";
import "pages/location/details/LocationDetailsPage.scss";
import {useEffect, useState} from "react";
import {MdMenu, MdSettings} from "react-icons/md";
import {Link, useParams} from "react-router-dom";


const LocationDetailsPage = () => {

    const {id} = useParams();
    const location = useLocationWithWeather(id);
    const [sidenavOpened, setSidenavOpened] = useState(false);

    const toggleSidenav = () => setSidenavOpened(!sidenavOpened);

    useEffect(() => {
        if (location) {
            const iconId = location.weather.current.weather[0].icon;
            document.getElementById("favicon").href = getWeatherIconPath(iconId);
            document.title = location.city;
        }

        return () => {
            document.getElementById("favicon").href = "/assets/logo.svg";
        };
    }, [location]);

    if (!location) {
        return <div className="loading">
            <LoadingIndicator />
            <p>Aan het laden...</p>
        </div>;
    }

    return (
        <div className="location-details-page">
            <div className="header">
                <div>
                    <IconButton icon={MdMenu} onClick={toggleSidenav} />
                </div>
                <div className="location-and-time">
                    <h2 className="location">{location.city}</h2>
                    <p className="time">{dayjs(new Date(location.weather.current.dt * 1000))
                        .format("dddd DD MMMM")}</p>
                </div>
                <Link to={"/settings"}>
                    <IconButton icon={MdSettings} />
                </Link>
            </div>
            <div className="sidenav-wrapper" data-opened={sidenavOpened}>
                <Sidenav opened={sidenavOpened} onSelectLocation={toggleSidenav} />
            </div>
            <div className="body">
                <div className="current-weather">
                    <CurrentWeatherCard weather={location.weather}/>
                    <HourlyForecastCard forecasts={location.weather.hourly}/>
                </div>
                <div className="daily-forecasts-card">
                    <Card title={"Voorspelling per dag"}>

                    </Card>
                </div>
            </div>
        </div>
    );
};

export default LocationDetailsPage;
