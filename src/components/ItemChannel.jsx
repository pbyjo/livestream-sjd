const ItemChannel = (props) => {
    const { name, id, stateChannel } = props
    return (
        <div 
            onClick={() => stateChannel(name)}
            className="chat__container-aside_canales-item" 
            key={id}
        >
            <h3>#</h3>
            <p>{name}</p>
        </div>
    )
}

export default ItemChannel;