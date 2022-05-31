import {useParams} from "react-router-dom";

const LocationDetailsPage = () => {

    const {id} = useParams();

    return (
        <div>{id}</div>
    );
};

export default LocationDetailsPage;
