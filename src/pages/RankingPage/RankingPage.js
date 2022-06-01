import Page from "components/util/Page/Page";
import WeatherScoreCard
    from "components/weather/WeatherScoreCard/WeatherScoreCard";
import {AuthContext} from "context/AuthContext";
import {
    calculatePrecipitationGrade,
    calculateSunPowerGrade,
    calculateTemperatureGrade,
    calculateWindScaleGrade
} from "helper/grade-helper";
import useLocationsWithWeather from "hooks/use-locations-with-weather";
import "pages/RankingPage/RankingPage.scss";
import {useContext, useMemo} from "react";

const RankingPage = () => {

    const {preferences} = useContext(AuthContext);
    const locations = useLocationsWithWeather();
    const locationsWithGrades = useMemo(() => locations.map(location => {
        const weather = location.weather.hourly[0];
        const temperatureGrade = calculateTemperatureGrade(weather, preferences.temperature, preferences.metric);
        const sunPowerGrade = calculateSunPowerGrade(weather, preferences.sunPower);
        const windScaleGrade = calculateWindScaleGrade(weather, preferences.windScale);
        const precipitationGrade = calculatePrecipitationGrade(weather, preferences.pop);
        const total = Math.round((temperatureGrade + sunPowerGrade + windScaleGrade + precipitationGrade) / 0.4) / 10;

        return ({
            ...location, grades: {
                "total": total,
                "temperature": temperatureGrade,
                "sunPower": sunPowerGrade,
                "windScale": windScaleGrade,
                "precipitation": precipitationGrade
            }
        });
    }).sort((a, b) => b.grades.total - a.grades.total), [
        locations,
        preferences
    ]);


    return (
        <Page title={"Rangschikking"}>
            <div className="ranking-wrapper">
                {locationsWithGrades.map(location => <WeatherScoreCard
                    key={location.id}
                    location={location}
                    grades={location.grades}
                />)}
            </div>
        </Page>
    );

};

export default RankingPage;
