import addIcon from '@icons/addIcon.svg'
import {useMyAuth} from '@context/authContext.js';
import { useEffect, useRef } from 'react';

/* Components */
import ItemChannel from '@components/ItemChannel.jsx'
/* Elements */
import ChatHeader from '@elements/ChatHeader.jsx';
import MessageChat from '@elements/MessageChat.jsx';

/* Assets */
import addChannelIlustration from '@images/addChannel.png'

const Chat = () => {
    const {
        user, 
        profilePic, 
        addChannel, 
        getChannels,
        arrayChannels,
        inputMessage,
        setInputMessage,
        channelActive,
        setChannelActive,
        saveMessagesCollectionToDB,
        getMessages,
        listMessages
    } = useMyAuth();

    const anchorRef = useRef(null);

    /* Validando usuarios administradores */
    const userAdminFunction = () => {
        if(user.email === 'joel.invictos@gmail.com' 
        || user.email === 'byjo.developer@gmail.com') {
            const userAdmin = true
            return userAdmin
        } else {
            const userAdmin = false
            return userAdmin
        }
    }

    /* Agregando canales al sidebar */
    const handleChannel = () => {
        addChannel()
    }

    /* Leyendo valor del input y seteandolo en el hook */
    const handleInputMessage = (e) => {
        setInputMessage(e.target.value)
    }

    /* Enviando mensaje a la DB, segun el canal */
    const sendInputInfo = async (e) => {
        e.preventDefault()
        await saveMessagesCollectionToDB();
        console.log('Input info enviado a la base de datos')
        anchorRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    

    useEffect(() => {
        if(user) {
            getChannels()
            getMessages()
        }
    }, [channelActive])

    return (
        <div className="chat__container">
            <aside className="chat__container-aside">
                <div className="chat__container-aside_header">
                    <h2>Selecciona un canal:</h2>
                    {
                        userAdminFunction() ?
                        <button onClick={handleChannel}>
                            <img src={addIcon} alt="add icon" />
                        </button> : null
                    }
                </div>
                <div className="chat__container-aside_canales">
                    {
                        arrayChannels.length >= 1
                        ? arrayChannels.map(channel => (
                            <ItemChannel 
                                id={channel.id} 
                                key={channel.id} 
                                name={channel.name}
                                stateChannel={setChannelActive} />
                        )) : 
                        <div className="chat__container-aside_canales-addItem">
                            <img src={addChannelIlustration} alt="add channel" />
                            <p>Crea un canal de texto...</p>
                        </div>
                    }
                </div>
                <div className="chat__container-aside_profile">
                    {
                        user && 
                        <>
                            <img src={user.photoURL || profilePic}></img> 
                            <span>
                                <p>{user.displayName || user.email}</p>
                                <p>{user.uid.substring(0, 4)}</p>
                            </span>
                        </>
                    }
                </div>
            </aside>
            <div className="chat__container-boxchat">
                <ChatHeader channelActive={channelActive} />
                <div className="chat__container-boxchat-chat">
                    {   
                        listMessages.length >= 1 ?
                        listMessages.map(message => (
                            <MessageChat 
                                user={user}
                                key={message.id} 
                                messageFirebase={message}
                            />
                        )) : null
                    }
                    <div 
                        ref={anchorRef} 
                        style={{marginBottom: '60px', width: '100%'}}
                    ></div>
                </div>
                <form onSubmit={sendInputInfo}>
                    <input 
                        type="text" 
                        name="message"
                        id='message'
                        disabled={channelActive ? false : true}
                        value={inputMessage}
                        onChange={handleInputMessage}
                        placeholder={`Escribe en #${channelActive || '...'}`}
                    />
                </form>
            </div>
        </div>
    )
}

export default Chat;