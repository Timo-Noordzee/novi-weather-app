import IconButton from "components/common/IconButton/IconButton";
import "components/location/LocationCard.scss";
import WeatherIcon from "components/weather/WeatherIcon/WeatherIcon";
import {MdDelete} from "react-icons/md";

const LocationCard = ({city, province, weather, onClick, onClickDelete}) => {

    return (
        <div className="location-card">
            <WeatherIcon id={weather.weather[0].icon} />
            <div className="location" onClick={onClick}>
                <p className="city">{city}</p>
                <small className="province">{province}</small>
            </div>
            <IconButton icon={MdDelete} onClick={onClickDelete} />
        </div>
    );
};

export default LocationCard;
