import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut as firebaseSignOut
} from "firebase/auth";
import {doc, onSnapshot, setDoc} from "firebase/firestore";
import {createContext, useCallback, useEffect, useMemo, useState} from "react";
import {useAuthState} from "react-firebase-hooks/auth";
import {firebaseAuth, firestore} from "services/firebase";

const defaultPreferences = {
    metric: "celcius",
    sunPower: "mediocre",
    temperature: 20,
    windScale: "moderate_breeze",
    pop: 25,
    theme: "light"
};

const cachedPreferences = () => {
    const saved = window.localStorage.getItem("preferences") ?? "{}";
    return ({
        ...defaultPreferences,
        ...JSON.parse(saved)
    });
};

export const AuthContext = createContext({});

export const AuthContextProvider = props => {
    const [user, loading, error] = useAuthState(firebaseAuth);
    const [preferences, setPreferences] = useState(cachedPreferences());

    const updatePreferences = useCallback((preferences) => {
        if (user) {
            const userDoc = doc(firestore, "users", user.uid);
            return setDoc(userDoc, {preferences}, {merge: true});
        }
    }, [user]);

    useEffect(() => {
        if (user) {
            const userDoc = doc(firestore, "users", user.uid);

            const unSub = onSnapshot(userDoc, (doc) => {
                const data = doc.data();
                const userPreferences = data["preferences"] ?? defaultPreferences;
                window.localStorage.setItem("preferences", JSON.stringify(userPreferences));
                setPreferences(userPreferences);
            });
            return () => unSub();
        }
    }, [user]);

    const signIn = useCallback((email, password) => {
        return signInWithEmailAndPassword(firebaseAuth, email, password);
    }, []);

    const signUp = useCallback((email, password) => {
        return createUserWithEmailAndPassword(firebaseAuth, email, password);
    }, []);

    const signOut = useCallback(() => {
        return firebaseSignOut(firebaseAuth);
    }, []);

    const contextValue = useMemo(() => ({
        user,
        loading,
        error,
        preferences,
        signIn,
        signUp,
        signOut,
        updatePreferences
    }), [
        user,
        loading,
        error,
        preferences,
        signIn,
        signUp,
        signOut,
        updatePreferences
    ]);

    return <AuthContext.Provider value={contextValue} {...props} />;
};
