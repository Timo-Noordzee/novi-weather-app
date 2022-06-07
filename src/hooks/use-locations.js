import {LocationContext} from "context/LocationContext";
import {useContext} from "react";

const useLocations = () => {
    const {locations} = useContext(LocationContext)

    return locations
}

export default useLocations
