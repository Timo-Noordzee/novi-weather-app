import "components/LoadingIndicator/LoadingIndicator.scss";

const LoadingIndicator = () => {
    return <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>;
};

export default LoadingIndicator;
