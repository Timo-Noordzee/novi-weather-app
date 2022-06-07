import "components/util/Page/Page.scss";
import Toolbar from "components/util/Page/Toolbar/Toolbar";

const Page = ({title, showBackButton, showSettingsButton, children}) => {

    return (
        <div className="page">
            <Toolbar title={title} showBackButton={showBackButton} showSettingsButton={showSettingsButton} />
            <div className="content">
                {children}
            </div>
        </div>
    );
};

Page.defaultProps = {
    showBackButton: true,
    showSettingsButton: true
};

export default Page;
