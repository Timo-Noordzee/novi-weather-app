import "components/common/Accordion/Accordion.scss";
import AccordionSummary from "components/common/Accordion/AccordionSummary";
import {Children, cloneElement, useEffect, useRef, useState} from "react";

const Accordion = ({className, children, openedByDefault}) => {

    const ref = useRef(null);

    const [opened, setOpened] = useState(openedByDefault);
    const [height, setHeight] = useState(opened ?
        undefined :
        0);

    useEffect(() => {
        if (!height || !opened || !ref.current) {
            return undefined;
        }
        const resizeObserver = new ResizeObserver((el) => {
            setHeight(el[0].contentRect.height);
        });
        resizeObserver.observe(ref.current);
        return () => {
            resizeObserver.disconnect();
        };
    }, [
        height,
        opened
    ]);

    useEffect(() => {
        if (opened) {
            setHeight(ref.current?.getBoundingClientRect().height);
        } else {
            setHeight(0);
        }
    }, [opened]);

    const onToggleClicked = () => setOpened(!opened);

    return (
        <div className={`accordion ${className ?? ""}`} aria-expanded={opened}>
            {Children.map(children, child => {
                const type = child.props.__TYPE;
                switch (type) {
                case AccordionSummary.TYPE:
                    return cloneElement(child, {
                        opened,
                        __ON_CLICK: onToggleClicked
                    });
                default:
                    return cloneElement(child, {
                        height,
                        ref,
                        opened
                    });
                }
            })}
        </div>
    );
};

Accordion.defaultProps = {
    openedByDefault: false
};

export default Accordion;
