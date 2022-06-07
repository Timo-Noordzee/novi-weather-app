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

export class WrongPasswordError extends Error {
}

export class UserNotFoundError extends Error {
    constructor (email, message) {
        super(message);
        this.email = email;
    }
}

export class EmailAlreadyInUseError extends Error {
    constructor (email, message) {
        super(message);
        this.email = email;
    }
}

export class UserDisabledError extends Error {
}

export class TooManyRequestError extends Error {
}

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

    const signIn = useCallback(async (email, password) => {
        try {
            await signInWithEmailAndPassword(firebaseAuth, email, password);
        } catch (error) {
            switch (error.code) {
            case "auth/wrong-password":
                throw new WrongPasswordError();
            case "auth/user-not-found":
                throw new UserNotFoundError(email, error.message);
            case "user-disabled":
                throw new UserDisabledError();
            case "too-many-requests":
                throw new TooManyRequestError();
            default:
                throw error;
            }
        }
    }, []);

    const signUp = useCallback(async (email, password) => {
        try {
            await createUserWithEmailAndPassword(firebaseAuth, email, password);
        } catch (error) {
            switch (error.code) {
            case "auth/email-already-in-use":
                throw new EmailAlreadyInUseError(email, error.message);
            case "too-many-requests":
                throw new TooManyRequestError();
            default:
                throw error;
            }
        }
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
