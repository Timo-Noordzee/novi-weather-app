const LAT_LONG_REGEX = /([0-9]+\.[0-9]+) ([0-9]+\.[0-9]+)/;

export function getCoordinates (data) {
    const matches = LAT_LONG_REGEX.exec(data.centroide_ll);
    return [
        matches[2],
        matches[1]
    ];
}
