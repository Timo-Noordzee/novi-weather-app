import PropTypes from "prop-types";
import {MdExpandMore} from "react-icons/md";

const AccordionSummary = props => {

    return (
        <div className="accordion-summary" onClick={props.__on_click}>
            <div className={`accordion-summary-content ${props.className ?? ''}`}>
                {props.children}
            </div>
            <div className={`accordion-expand-icon-wrapper ${props.opened ? 'expanded' : ''}`} onClick={props.__on_click}>
                <MdExpandMore size="2.5rem"/>
            </div>
        </div>
    );
};

AccordionSummary.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    __TYPE: PropTypes.string,
    __on_click: PropTypes.func
};

AccordionSummary.TYPE = "AccordionSummary";

AccordionSummary.defaultProps = {
    __TYPE: AccordionSummary.TYPE
};

export default AccordionSummary;
