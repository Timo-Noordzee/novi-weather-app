import PropTypes from "prop-types";
import {MdExpandMore} from "react-icons/md";

const AccordionSummary = props => {

    return (
        <div className="accordion-summary" onClick={props.__ON_CLICK}>
            <div className={`accordion-summary-content ${props.className ?? ''}`}>
                {props.children}
            </div>
            <div className={`accordion-expand-icon-wrapper ${props.opened ? 'expanded' : ''}`} onClick={props.__ON_CLICK}>
                <MdExpandMore size="2.5rem"/>
            </div>
        </div>
    );
};

AccordionSummary.propTypes = {
    children: PropTypes.node,
    __TYPE: PropTypes.string,
    __ON_CLICK: PropTypes.func
};

AccordionSummary.TYPE = "AccordionSummary";

AccordionSummary.defaultProps = {
    __TYPE: AccordionSummary.TYPE
};

export default AccordionSummary;
