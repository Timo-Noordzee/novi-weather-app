// Day icons codes - https://openweathermap.org/weather-conditions

const CLEAR_SKY_DAY = "01d";
const FEW_CLOUDS_DAY = "02d";
const SCATTERED_CLOUDS_DAY = "03d";
const BROKEN_CLOUDS_DAY = "04d";
const SHOWER_RAIN_DAY = "09d";
const RAIN_DAY = "10d";
const THUNDERSTORM_DAY = "11d";
const SNOW_DAY = "13d";
const MIST_DAY = "50d";

// Night icons codes - https://openweathermap.org/weather-conditions
const CLEAR_SKY_NIGHT = "01n";
const FEW_CLOUDS_NIGHT = "02n";
const SCATTERED_CLOUDS_NIGHT = "03n";
const BROKEN_CLOUDS_NIGHT = "04n";
const SHOWER_RAIN_NIGHT = "09n";
const RAIN_NIGHT = "10n";
const THUNDERSTORM_NIGHT = "11n";
const SNOW_NIGHT = "13n";
const MIST_NIGHT = "50n";

export const getWeatherIconPath = id => {
    switch (id) {
    case CLEAR_SKY_DAY:
        return "/assets/icons/clear_sky_day.svg";
    case CLEAR_SKY_NIGHT:
        return "/assets/icons/clear_sky_night.svg";
    case FEW_CLOUDS_DAY:
        return "/assets/icons/few_clouds_day.svg";
    case FEW_CLOUDS_NIGHT:
        return "/assets/icons/few_clouds_night.svg";
    case SCATTERED_CLOUDS_DAY:
    case SCATTERED_CLOUDS_NIGHT:
        return "/assets/icons/scattered_clouds.svg";
    case BROKEN_CLOUDS_DAY:
    case BROKEN_CLOUDS_NIGHT:
        return "/assets/icons/broken_clouds.svg";
    case SHOWER_RAIN_DAY:
    case SHOWER_RAIN_NIGHT:
        return "/assets/icons/shower_rain.svg";
    case RAIN_DAY:
        return "/assets/icons/rain_day.svg";
    case RAIN_NIGHT:
        return "/assets/icons/rain_night.svg";
    case THUNDERSTORM_DAY:
        return "/assets/icons/thunderstorm_day.svg";
    case THUNDERSTORM_NIGHT:
        return "/assets/icons/thunderstorm_night.svg";
    case SNOW_DAY:
        return "/assets/icons/snow_day.svg";
    case SNOW_NIGHT:
        return "/assets/icons/snow_night.svg";
    case MIST_DAY:
    case MIST_NIGHT:
        return "/assets/icons/mist.svg";
    default:
        return "/assets/icons/clear_sky_day.svg";
    }
};
