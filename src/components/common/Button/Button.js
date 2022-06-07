import "components/common/Button/Button.scss";

const Button = ({
    children,
    onClick,
    color,
    type
}) => {
    return <button className={`button button-${color ?? "primary"}`} onClick={onClick} type={type}>{children}</button>;
};

export default Button;
