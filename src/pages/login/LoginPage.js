import {ReactComponent as Logo} from "assets/logo.svg";
import Button from "components/Button/Button";
import Input from "components/Input/Input";
import {AuthContext} from "context/AuthContext";
import "pages/login/LoginPage.scss";
import {useContext, useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {useLocation, useNavigate} from "react-router-dom";

const LoginPage = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const {signIn, signUp} = useContext(AuthContext);
    const {register, handleSubmit, watch} = useForm();
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [error, setError] = useState("");
    const from = location.state?.from?.pathname || "/";

    useEffect(() => {
        const subscription = watch(() => {
            setError("");
        });
        return () => subscription.unsubscribe();
    }, [watch]);

    const onSubmit = async (data) => {
        const {email, password} = data;
        try {
            if (isLoginMode) {
                await signIn(email, password);
                navigate(from, {replace: true});
            } else {
                await signUp(email, password);
                navigate(from, {replace: true});
            }
        } catch (error) {
            console.error(error);
            switch (error.code) {
            case "auth/wrong-password":
                setError("Het ingevulde wachtwoord is onjuist");
                break;
            case "auth/user-not-found":
                setError(`Er bestaat geen account met het e-mailadres ${email}`);
                break;
            case "auth/email-already-in-use":
                setError(`Het e-mailadres ${email} is al in gebruik`);
                break;
            case "user-disabled":
                setError("Dit account is uitgeschakeld");
                break;
            case "too-many-requests":
                setError("Je hebt teveel onjuist inlogpogingen gedaan, inloggen is daarom tijdelijk uitgeschakeld");
                break;
            default:
                setError(`Er is een onbekende fout opgetreden, code: ${error.code}`);
                break;
            }
        }
    };

    const toggleFormMode = () => {
        setIsLoginMode(!isLoginMode);
    };

    return (
        <div className="login-page">
            <div className="logo">
                <Logo />
            </div>
            <h1>Weer kompas</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input register={register("email", {required: true})} type={"email"} placeholder={"E-mailadres"} />
                <Input register={register("password", {
                    required: true,
                    minLength: 8
                })} type={"password"} placeholder={"Wachtwoord"} />
                {error && <div className="error-message">
                    {error}
                </div>}
                <Button type={"submit"}>{isLoginMode ?
                    "Inloggen" :
                    "Aanmelden"}</Button>
            </form>
            <h4>{isLoginMode ?
                "Heb je nog geen account?" :
                "Heb je al een account?"}</h4>
            <Button color={"secondary"} onClick={toggleFormMode}>
                {isLoginMode ?
                    "Aanmelden" :
                    "Inloggen"}
            </Button>
        </div>
    );
};

export default LoginPage;
