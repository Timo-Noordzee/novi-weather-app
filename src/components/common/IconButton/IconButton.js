import "components/common/IconButton/IconButton.scss";
import {createElement} from "react";

const IconButton = ({icon, onClick, size, color}) => {

    return (
        <button className="icon-button" onClick={onClick}>
            {createElement(icon, {
                size: size ?? "2rem",
                color: color ?? "var(--text-color)",
                className: "icon"
            })}
        </button>
    );

};

export default IconButton;
