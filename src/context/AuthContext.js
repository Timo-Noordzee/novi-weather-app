import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut as firebaseSignOut
} from "firebase/auth";
import {createContext, useCallback, useMemo} from "react";
import {useAuthState} from "react-firebase-hooks/auth";
import {firebaseAuth} from "services/firebase";

export const AuthContext = createContext({});

export const AuthContextProvider = props => {
    const [user, loading, error] = useAuthState(firebaseAuth);

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
        signIn,
        signUp,
        signOut
    }), [
        user,
        loading,
        error,
        signIn,
        signUp,
        signOut
    ]);

    return <AuthContext.Provider value={contextValue} {...props} />;
};
