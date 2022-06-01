import "components/common/GradeBar/GradeBar.scss";
import {getGradeColor} from "helper/grade-helper";

const GradeBar = ({grade, title}) => {

    const color = getGradeColor(grade);
    const percentage = (grade / 10.0) * 100;

    return (
        <div className="grade-bar-wrapper">
            <p className="title">{title}</p>
            <div className="grade-stack">
                <div className="grade" style={{borderColor: color}}>
                    <p style={{color: color}}>
                        {grade}
                    </p>
                </div>
                <div className="grade-bar">
                    <div className="fill" style={{
                        background: color,
                        width: `${percentage}%`
                    }}></div>
                </div>
            </div>
        </div>
    );
};

export default GradeBar;
