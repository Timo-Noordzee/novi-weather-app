export function kelvinToFarenheit (kelvin) {
    return (kelvin - 273.15) * 1.8 + 32;
}

export function kelvinToCelsius (kelvin) {
    return kelvin - 273.15;
}

export function celciusToKelvin (celcius) {
    return (parseFloat(celcius) + 273.15).toFixed(2);
}

export function farenheitToKelvin (farenheit) {
    return ((parseFloat(farenheit) - 32) * 5 / 9 + 273.15).toFixed(2);
}

export function toKelvin (value, metric) {
    if (metric === "celcius") {
        return celciusToKelvin(value);
    } else if (metric === "farenheit") {
        return farenheitToKelvin(value);
    } else {
        return value;
    }
}

export function convertToMetric (value, fromMetric, toMetric) {
    const kelvin = parseFloat(toKelvin(value, fromMetric));
    if (toMetric === "celcius") {
        return parseFloat((kelvin - 273.15).toFixed(2));
    } else if (toMetric === "farenheit") {
        return parseFloat((((kelvin - 273.15) * 1.8) + 32).toFixed(2));
    } else {
        return kelvin;
    }
}
