import "components/util/Sidenav/Sidenav.scss";
import WeatherIcon from "components/weather/WeatherIcon/WeatherIcon";
import {AuthContext} from "context/AuthContext";
import useLocationsWithWeather from "hooks/use-locations-with-weather";
import {createElement, useContext} from "react";
import {MdBarChart, MdLocationPin} from "react-icons/md";
import {Link} from "react-router-dom";

const SideNavLocationLink = ({location, onClick}) => {

    return (
        <Link className={"sidenav-link"} to={`/location/${location.id}`} onClick={onClick}>
            <WeatherIcon id={location.weather.current.weather[0].icon} />
            <p className="city">{location.city}</p>
        </Link>
    );
};

const SideNavLink = ({icon, label, to}) => {

    return (
        <Link className={"sidenav-link"} to={to}>
            {createElement(icon, {
                className: "icon",
                style: {width: "2.5rem", height: "2.5rem"}
            })}
            <p className={"label"}>{label}</p>
        </Link>
    );
};

const Sidenav = ({opened, onSelectLocation}) => {

    const locations = useLocationsWithWeather();
    const {signOut} = useContext(AuthContext);

    const onSignOutPressed = async () => {
        await signOut();
    };

    return (
        <div className="sidenav" data-opened={opened}>
            <div className="content">
                <div className="sidenav-section">
                    <h3 className="title">Mijn plaatsen</h3>
                    {locations.map(location => <SideNavLocationLink
                        key={location.id}
                        location={location}
                        onClick={onSelectLocation}
                    />)}
                </div>
                <div className="sidenav-section">
                    <h3 className="title">Pagina&apos;s</h3>
                    <SideNavLink to={"/ranking"} label={"Rangschikking"} icon={MdBarChart} />
                    <SideNavLink to={"/locations"} label={"Plaatsen beheren"} icon={MdLocationPin} />
                </div>
            </div>
            <div className="footer">
                <button className="sign-out-button" onClick={onSignOutPressed}>
                    <p>Uitloggen</p>
                </button>
            </div>
        </div>
    );
};

export default Sidenav;
