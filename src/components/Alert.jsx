const Alert = (props) => {

    console.log(props.type)
    
    return (
        <div className={`alert alert-${props.type}`}>
            {props.message}
        </div>
    );
}

export default Alert;