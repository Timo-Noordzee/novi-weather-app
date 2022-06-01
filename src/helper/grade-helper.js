import {sunPowerOptions} from "constants/sun-power-options";
import {windScaleOptions} from "constants/wind-schale-options";
import {toKelvin} from "helper/temperature-helper";

export function calculateWindScaleGrade ({wind_speed: windSpeed}, preferred) {
    const {min, max} = windScaleOptions.find(scale => scale.value === preferred);
    if (windSpeed >= min && windSpeed <= max) {
        return 10;
    }

    const isAbove = windSpeed >= max;
    const difference = Math.min(117, Math.abs(windSpeed - (isAbove ?
        max :
        min)));
    return Math.round((117 - difference) / 117 * 100) / 10;
}

export function calculateTemperatureGrade (weather, preferred, metric) {
    const preferredKelvin = toKelvin(preferred, metric);
    const difference = Math.min(55, Math.abs(weather.temp - preferredKelvin));
    return Math.round((55 - difference) / 55 * 100) / 10;
}

export function calculateSunPowerGrade ({uvi}, preferred) {
    const {min, max} = sunPowerOptions.find(scale => scale.value === preferred);
    if (uvi >= min && uvi <= max) {
        return 10;
    }

    const isAbove = uvi >= preferred.max;
    const difference = Math.min(10, Math.abs(uvi - (isAbove ?
        max :
        min)));
    return Math.round((10 - difference) / 10 * 100) / 10;
}

export function calculatePrecipitationGrade (weather, preferred) {
    const difference = Math.abs(weather.pop * 100 - preferred);
    console.log(difference, weather.pop, preferred);
    return Math.round(100 - difference) / 10;
}

export function getGradeColor(grade) {
    if (grade >= 7) {
        return "var(--color-green)"
    } else if (grade >= 5.5) {
        return "var(--color-orange)"
    } else {
        return "var(--color-red)"
    }
}
