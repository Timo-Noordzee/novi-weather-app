import "components/location/LocationSuggestionCard.scss";
import {MdAddLocationAlt} from "react-icons/md";

const LocationSuggestionCard = ({city, province, onClick}) => {

    return (
        <div className="location-suggestion-card" onClick={onClick}>
            <MdAddLocationAlt className="icon" size="2.5rem" />
            <div className="location">
                <p className={"city"}>{city}</p>
                <small className={"province"}>{province}</small>
            </div>
        </div>
    );
};

export default LocationSuggestionCard;
