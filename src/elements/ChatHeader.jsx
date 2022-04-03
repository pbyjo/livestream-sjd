function ChatHeader(props) {
    const {channelActive} = props;
    return (
        <div className="chat__container-boxchat-header">
            <h2>{channelActive}</h2>
        </div>
    );
}

export default ChatHeader;