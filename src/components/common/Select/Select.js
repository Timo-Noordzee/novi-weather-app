import "components/common/Select/Select.scss";

const Select = ({register, options, ...props}) => {

    return (
        <select {...register} {...props} className={"select-input"}>
            {options.map(({label, value}) => <option key={value} value={value}>
                {label}
            </option>)}
        </select>
    );
};

export default Select;
