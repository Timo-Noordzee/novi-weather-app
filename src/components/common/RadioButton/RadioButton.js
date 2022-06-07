import "components/common/RadioButton/RadioButton.scss";

const RadioButton = ({register, name, id, label, value}) => {

    return (
        <div className="radio-button-input">
            <input type="radio" {...register} id={id} name={name} value={value} />
            <label htmlFor={id}>{label}</label>
        </div>
    );
};

export default RadioButton;
