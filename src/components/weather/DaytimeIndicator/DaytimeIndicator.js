import {ReactComponent as SunriseIcon} from "assets/icons/sunrise.svg";
import {ReactComponent as SunsetIcon} from "assets/icons/sunset.svg";
import "components/weather/DaytimeIndicator/DaytimeIndicator.scss";
import {scaleLinear} from "d3-scale";
import {arc} from "d3-shape";
import dayjs from "dayjs";
import useInterval from "hooks/use-interval";
import {useEffect, useState} from "react";


const DaytimeIndicator = ({sunset, sunrise}) => {

    const [totalSeconds, setTotalSeconds] = useState(sunset.diff(sunrise, "second"));
    const [remainingSeconds, setRemainingSeconds] = useState(calculateRemainingSeconds());

    function calculateRemainingSeconds () {
        const now = dayjs();
        const timeOfDay = sunrise
            .set("hour", now.hour())
            .set("minute", now.minute())
            .set("second", now.second());
        return sunset.diff(timeOfDay, "second");
    }

    useEffect(() => {
        setTotalSeconds(sunset.diff(sunrise, "second"));
    }, [
        sunset,
        sunrise
    ]);

    useInterval(() => {
        setRemainingSeconds(calculateRemainingSeconds());
    }, 1000);

    const backgroundArc = arc()
        .innerRadius(0.95)
        .outerRadius(1)
        .startAngle(-Math.PI / 2)
        .endAngle(Math.PI / 2)
        ();

    const percentScale = scaleLinear()
        .domain([
            0,
            1
        ])
        .range([
            0,
            1
        ]);

    const percent = percentScale(1 - (remainingSeconds / totalSeconds));

    const angleScale = scaleLinear()
        .domain([
            0,
            1
        ])
        .range([
            -Math.PI / 2,
            Math.PI / 2
        ])
        .clamp(true);

    const angle = angleScale(percent);

    const filledArc = arc()
        .innerRadius(0.95)
        .outerRadius(1)
        .startAngle(-Math.PI / 2)
        .endAngle(angle)
        ();

    const markerLocation = getCoordsOnArc(angle, 1 - ((1 - 0.95) / 2));

    return (
        <div className="daytime-indicator-wrapper">
            <div className={"daytime-animation-wrapper"}>
                <svg className="daytime-animation"
                     viewBox="-1 -1 2 1">

                    <path d={backgroundArc} fill="#FFFFFF" />
                    <path d={filledArc} fill="#E4B612" />
                    <svg x={markerLocation[0] - 0.2} y={markerLocation[1] - 0.2} height="0.4" viewBox="0 0 480 480" width="0.4" xmlns="http://www.w3.org/2000/svg">
                        <g fill="#FDD020">
                            <path d="m376 240c0 75.109375-60.890625 136-136 136s-136-60.890625-136-136 60.890625-136 136-136 136 60.890625 136 136zm0 0" />
                            <path d="m240 480c-4.417969 0-8-3.582031-8-8v-64c0-4.417969 3.582031-8 8-8s8 3.582031 8 8v64c0 4.417969-3.582031 8-8 8zm0 0" />
                            <path d="m240 80c-4.417969 0-8-3.582031-8-8v-64c0-4.417969 3.582031-8 8-8s8 3.582031 8 8v64c0 4.417969-3.582031 8-8 8zm0 0" />
                            <path d="m120 120-48-48" />
                            <path d="m120 128c-2.121094 0-4.15625-.84375-5.65625-2.34375l-48-48c-3.03125-3.140625-2.988281-8.128906.097656-11.214844 3.085938-3.085937 8.074219-3.128906 11.214844-.097656l48 48c2.285156 2.289062 2.972656 5.730469 1.734375 8.71875s-4.15625 4.9375-7.390625 4.9375zm0 0" />
                            <path d="m408 408-48-48" />
                            <path d="m408 416c-2.121094 0-4.15625-.84375-5.65625-2.34375l-48-48c-3.03125-3.140625-2.988281-8.128906.097656-11.214844 3.085938-3.085937 8.074219-3.128906 11.214844-.097656l48 48c2.285156 2.289062 2.972656 5.730469 1.734375 8.71875s-4.15625 4.9375-7.390625 4.9375zm0 0" />
                            <path d="m360 120 48-48" />
                            <path d="m360 128c-3.234375 0-6.152344-1.949219-7.390625-4.9375s-.550781-6.429688 1.734375-8.71875l48-48c3.140625-3.03125 8.128906-2.988281 11.214844.097656 3.085937 3.085938 3.128906 8.074219.097656 11.214844l-48 48c-1.5 1.5-3.535156 2.34375-5.65625 2.34375zm0 0" />
                            <path d="m472 248h-64c-4.417969 0-8-3.582031-8-8s3.582031-8 8-8h64c4.417969 0 8 3.582031 8 8s-3.582031 8-8 8zm0 0" />
                            <path d="m72 248h-64c-4.417969 0-8-3.582031-8-8s3.582031-8 8-8h64c4.417969 0 8 3.582031 8 8s-3.582031 8-8 8zm0 0" />
                            <path d="m72 408 48-48" />
                            <path d="m72 416c-3.234375 0-6.152344-1.949219-7.390625-4.9375s-.550781-6.429688 1.734375-8.71875l48-48c3.140625-3.03125 8.128906-2.988281 11.214844.097656 3.085937 3.085938 3.128906 8.074219.097656 11.214844l-48 48c-1.5 1.5-3.535156 2.34375-5.65625 2.34375zm0 0" />
                        </g>
                    </svg>
                </svg>
                {
                    remainingSeconds > 0 &&
                    <div className={"countdown-wrapper"}>
                        <p className={"countdown"}>{new Date(remainingSeconds * 1000).toISOString()
                            .substring(11, 19)}</p>
                        <small className={"description"}>Tot zonsondergang</small>
                    </div>
                }
                {
                    remainingSeconds < 0 &&
                    <div className={"countdown-wrapper"}>
                        <p className={"countdown"}>{new Date(-remainingSeconds * 1000).toISOString()
                            .substring(11, 19)}</p>
                        <small className={"description"}>Na zonsondergang</small>
                    </div>
                }

            </div>
            <div className="time-row">
                <div className="sunrise">
                    <SunriseIcon />
                    <p>{dayjs(sunrise).format("HH:mm")}</p>
                </div>
                <div className="sunset">
                    <p>{dayjs(sunset).format("HH:mm")}</p>
                    <SunsetIcon width="2rem" height="2rem" />
                </div>
            </div>
        </div>
    );
};

const getCoordsOnArc = (angle, offset = 10) => [
    Math.cos(angle - (Math.PI / 2)) * offset,
    Math.sin(angle - (Math.PI / 2)) * offset
];

export default DaytimeIndicator;
