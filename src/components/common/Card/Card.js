import "components/common/Card/Card.scss"

const Card = ({title, className,  children}) => {

    return (
        <div className="card">
            <h3 className="card-title">{title}</h3>
            <div className={`card-body ${className ?? ''}`}>
                {children}
            </div>
        </div>
    )
}

export default Card
