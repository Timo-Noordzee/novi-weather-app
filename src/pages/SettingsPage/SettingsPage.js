import Button from "components/common/Button/Button";
import FormField from "components/common/FormField/FormField";
import Input from "components/common/Input/Input";
import RadioButton from "components/common/RadioButton/RadioButton";
import Select from "components/common/Select/Select";
import Page from "components/util/Page/Page";
import {sunPowerOptions} from "constants/sun-power-options";
import {windScaleOptions} from "constants/wind-schale-options";
import {AuthContext} from "context/AuthContext";
import {convertToMetric} from "helper/temperature-helper";
import "pages/SettingsPage/SettingsPage.scss";
import {useContext, useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";

const SettingsPage = () => {

    const navigate = useNavigate();
    const {preferences, updatePreferences} = useContext(AuthContext);
    const [previousMetric, setPreviousMetric] = useState(preferences.metric);
    const {register, handleSubmit, watch, setValue} = useForm({
        defaultValues: {
            metric: preferences.metric,
            sunPower: preferences.sunPower,
            windScale: preferences.windScale,
            temperature: preferences.temperature,
            pop: preferences.pop,
            theme: preferences.theme
        }
    });

    const onSubmit = (data) => {
        const call = async () => {
            await updatePreferences({
                ...data,
                pop: parseFloat(data.pop),
                temperature: parseFloat(data.temperature)
            });
            navigate(-1);
        };
        call().catch(console.error);
    };

    useEffect(() => {
        const subscription = watch((value, {name, type}) => {
            if (name === "metric") {
                const converted = convertToMetric(value.temperature, previousMetric, value.metric);
                setValue("temperature", converted);
                setPreviousMetric(value.metric);
            }
        });

        return () => subscription.unsubscribe();
    }, [
        watch,
        previousMetric,
        setValue
    ]);

    return (
        <Page title={"Instellingen"} showSettingsButton={false}>
            <form className="settings-form" onSubmit={handleSubmit(onSubmit)}>
                <FormField title={"Temperatuur eenheid"}>
                    <RadioButton register={register("metric")} id={"radio-kelvin"} name={"metric"} value={"kelvin"} label={"Kelvin"} />
                    <RadioButton register={register("metric")} id={"radio-celcius"} name={"metric"} value={"celcius"} label={"Celcius"} />
                    <RadioButton register={register("metric")} id={"radio-farenheit"} name={"metric"} value={"farenheit"} label={"Farenheit"} />
                </FormField>
                <FormField title={"Voorkeurs temperatuur"}>
                    <Input register={register("temperature")} type={"number"} step={0.01} placeholder={"Voorkeurs temperatuur"} />
                </FormField>
                <FormField title={"Voorkeurs zonkracht"}>
                    <Select register={register("sunPower")} options={sunPowerOptions} />
                </FormField>
                <FormField title={"Voorkeurs windschaal"}>
                    <Select register={register("windScale")} options={windScaleOptions} />
                </FormField>
                <FormField title={"Voorkeurs kans op neerslag"}>
                    <Input register={register("pop")} type={"number"} min={0} max={100} step={1} placeholder={"Kans op neerslag (%)"} />
                </FormField>
                <FormField title={"Thema"}>
                    <Select register={register("theme")} name={"theme"} options={[
                        {
                            value: "light",
                            label: "Licht"
                        },
                        {value: "dark", label: "Donker"}
                    ]} />
                </FormField>
                <Button type={"submit"}>Opslaan</Button>
            </form>
        </Page>
    );
};

export default SettingsPage;
