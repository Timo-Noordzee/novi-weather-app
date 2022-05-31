import axios from "axios";
import {AuthContext} from "context/AuthContext";
import {doc, GeoPoint, setDoc, onSnapshot, deleteField} from "firebase/firestore";
import {getCoordinates} from "helper/address-helper";
import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo, useState
} from "react";
import {firestore} from "services/firebase";

function getCachedLocations() {
    const saved = window.localStorage.getItem("locations") ?? "[]"
    return JSON.parse(saved)
}

export const LocationContext = createContext({});

export const LocationContextProvider = props => {

    const {user} = useContext(AuthContext);
    const [locations, setLocations] = useState(getCachedLocations())

    const getSuggestions = useCallback(async (query) => {
        if (!query) {
            return [];
        }

        const response = await axios.get(`https://geodata.nationaalgeoregister.nl/locatieserver/v3/suggest?q=${query}&fq=type:woonplaats`);
        if (response.status === 200) {
            return response.data.response.docs;
        }
        return [];
    }, []);

    const addLocation = useCallback(async (id) => {
        const response = await axios.get(`https://geodata.nationaalgeoregister.nl/locatieserver/v3/lookup?id=${id}`);
        if (response.status === 200) {
            const data = response.data.response.docs[0];
            const coordinates = getCoordinates(data);

            const userDoc = doc(firestore, "users", user.uid);
            await setDoc(userDoc, {
                locations: {
                    [id]: {
                        city: data.woonplaatsnaam,
                        municipality: data.gemeentenaam,
                        province: data.provincienaam,
                        coordinates: new GeoPoint(coordinates[0], coordinates[1])
                    }
                }
            }, {merge: true});
        }
    }, [user]);

    const removeLocation = useCallback(async (id) => {
        const userDoc = doc(firestore, "users", user.uid)
        await setDoc(userDoc, {
            locations: {
                [id]: deleteField()
            }
        }, {merge: true})

    }, [user])

    useEffect(() => {
        if(user){
            const userDoc = doc(firestore, "users", user.uid)
            const unSub = onSnapshot(userDoc, (doc) => {
                const data = doc.data();
                const userLocations = Object.entries(data?.locations ?? {}).map(location => ({id: location[0], ...location[1]}));
                const sorted = userLocations.sort((a, b) => a.city.localeCompare(b.city))
                window.localStorage.setItem("locations", JSON.stringify(sorted))
                setLocations(sorted)
            })

            return () => unSub()
        }
    }, [user])

    const contextValue = useMemo(() => ({
        locations,
        getSuggestions,
        addLocation,
        removeLocation,
    }), [
        locations,
        getSuggestions,
        addLocation,
        removeLocation,
    ]);

    return <LocationContext.Provider value={contextValue} {...props} />;
};
