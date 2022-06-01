import "components/common/FormField/FormField.scss"

const FormField = ({title, children}) => {

    return (
        <div className="form-field">
            <p className="title">{title}</p>
            {children}
        </div>
    );

};

export default FormField;
