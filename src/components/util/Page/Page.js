import "components/util/Page/Page.scss";
import Toolbar from "components/util/Page/Toolbar/Toolbar";

const Page = ({title, showBackButton, children}) => {

    return (
        <div className="page">
            <Toolbar title={title} showBackButton={showBackButton ?? true} />
            <div className="content">
                {children}
            </div>
        </div>
    );
};

export default Page;
