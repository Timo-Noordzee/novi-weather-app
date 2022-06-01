import IconButton from "components/common/IconButton/IconButton";
import "components/util/Page/Toolbar/Toolbar.scss";
import {MdArrowBack, MdSettings} from "react-icons/md";
import {useNavigate} from "react-router-dom";

const Toolbar = ({title, showBackButton, showSettingsButton}) => {
    const navigate = useNavigate();

    const onBackButtonPressed = () => navigate(-1);

    const onSettingsButtonPressed = () => navigate("/settings");

    return (
        <div className="toolbar">
            {showBackButton &&
                <IconButton icon={MdArrowBack} color={"var(--text-on-primary-color)"} onClick={onBackButtonPressed} />}
            <h2 className={"title"}>{title}</h2>
            {showSettingsButton &&
                <IconButton icon={MdSettings} color={"var(--text-on-primary-color)"} onClick={onSettingsButtonPressed} />}
        </div>
    );
};

Toolbar.defaultProps = {
    showBackButton: true,
    showSettingsButton: true,
}

export default Toolbar;
