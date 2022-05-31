import "components/Input/Input.scss";

const Input = ({
    register,
    ...rest
}) => {

    return <div className="input-wrapper">
        <input className={"input"} {...rest} {...register} />
    </div>;
};

export default Input;
