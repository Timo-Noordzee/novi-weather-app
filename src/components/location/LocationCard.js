import IconButton from "components/common/IconButton/IconButton";
import "components/location/LocationCard.scss";
import {MdDelete} from "react-icons/md";

const LocationCard = ({city, province, onClick, onClickDelete}) => {

    return (
        <div className="location-card">
            <div className="location" onClick={onClick}>
                <p className="city">{city}</p>
                <small className="province">{province}</small>
            </div>
            <IconButton icon={MdDelete} onClick={onClickDelete} />
        </div>
    );
};

export default LocationCard;
