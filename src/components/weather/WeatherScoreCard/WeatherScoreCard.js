import Accordion from "components/common/Accordion/Accordion";
import AccordionDetails from "components/common/Accordion/AccordionDetails";
import AccordionSummary from "components/common/Accordion/AccordionSummary";
import GradeBar from "components/common/GradeBar/GradeBar";
import "components/weather/WeatherScoreCard/WeatherScoreCard.scss";
import {getGradeColor} from "helper/grade-helper";

const WeatherScoreCard = ({location, grades}) => {

    const color = getGradeColor(grades.total);

    return (
        <Accordion className="weather-score-card" openedByDefault={true}>
            <AccordionSummary className={"weather-score-card-header"}>
                <div className="grade-wrapper" style={{background: color}}>
                    <p className="grade">{grades.total}</p>
                </div>
                <div className="location">
                    <p className="city">{location.city}</p>
                    <small className="province">{location.province}</small>
                </div>
            </AccordionSummary>
            <AccordionDetails>
                <div className="weather-score-card-body">
                    <GradeBar grade={grades.temperature} title="Temperatuur" />
                    <GradeBar grade={grades.sunPower} title="Zonkracht" />
                    <GradeBar grade={grades.windScale} title="Windschaal" />
                    <GradeBar grade={grades.precipitation} title="Kans op neerslag" />
                </div>
            </AccordionDetails>
        </Accordion>
    );
};

export default WeatherScoreCard;
