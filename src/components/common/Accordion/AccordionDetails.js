import PropTypes from "prop-types";
import {forwardRef, useEffect, useState} from "react";

const AccordionDetails = forwardRef((props, ref) => {

    const [visible, setVisible] = useState(true);

    useEffect(() => {
        if (props.opened) {
            setVisible(props.opened);
        }

        if (!props.opened) {
            const id = setTimeout(() => {
                setVisible(false);
            }, 300);

            return () => clearTimeout(id);
        }
    }, [props.opened]);

    return (
        <div className="accordion-details" style={{height: props.height}}>
            <div ref={ref} className={props.className}>
                {(props.opened || visible) && props.children}
            </div>
        </div>
    );
});

AccordionDetails.propTypes = {
    className: PropTypes.string
};

AccordionDetails.displayName = "AccordionDetails";

export default AccordionDetails;
