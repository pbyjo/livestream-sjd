function MessageChat(props) {
    const {messageFirebase, user} = props;
    return (
        <div 
            key={messageFirebase.id}
            className="message__container"
        >
            <div>
                <span>
                    {
                        new Date(messageFirebase.id).toLocaleString
                    }
                </span>
                <h3>{messageFirebase.user || user.displayName || messageFirebase.email}</h3>    
                <img src={messageFirebase.picture} alt="user pic" />
            </div>
            <p className="message">
                {messageFirebase.message}
            </p>
        </div>
    );
}

export default MessageChat;