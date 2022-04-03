import { 
    createContext, 
    useContext, 
    useState, 
    useEffect
} from "react";
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    signOut
} from "firebase/auth";
import {auth, db} from '../firebase/firebase.js';
import {setDoc, addDoc, getDocs, collection, doc, updateDoc, Timestamp} from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';

/* Assets */
import profileDefault from '@images/profileDefault.jpg';

const myContext = createContext()

const useMyAuth = () => {
    const context = useContext(myContext)
    if(!context) throw new Error('useMyAuth must be used within an AuthProvider');
    return context
}

const AuthProvider = ({children}) => {
    /* State hooks */
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [profilePic, setProfilePic] = useState(profileDefault);
    const [arrayChannels, setArrayChannels] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [channelActive, setChannelActive] = useState(null);
    const [listMessages, setListMessages] = useState([]);

    /* Registro de usuario con correo */
    const register = (email, password) =>
        createUserWithEmailAndPassword(auth, email, password)
    /* Inicio de sesión con correo */
    const login = (email, password) => (
        signInWithEmailAndPassword(auth, email, password)
    )
    /* Iniciar sesión y registro con Gmail */
    const loginWithGoogle = () => {
        const googleProvider = new GoogleAuthProvider()
        return signInWithPopup(auth, googleProvider)   
    }
    /* Cerrar sesión */
    const logout = () => signOut(auth)

    /* Enviando datos de registro de usuario en la DB */
    const sendUserToDB = async (displayName, email, registredUser) => {
        try {
            await setDoc(doc(db, 'users', registredUser.user.uid), {
                uid: registredUser.user.uid,
                name: displayName,
                email,
                createdAt: Timestamp.now(new Date()),
                isOnline: true,
            })
            console.log('Usuario registrado en la base de datos')
        } catch (error) {
            console.error(error)
        }
    }
    /* Actualizando estado de usuario en la DB */
    const updateStateUserToDB = async (boolean, registredUser) => {
        await updateDoc(doc(db, 'users', registredUser.user.uid), {
            isOnline: boolean,
        })
    }

    /* Actualizar profilePic en la DB */
    const updateProfilePicToDB = async () => {
        const imgRef = ref(storage, `profilePics/${new Date().getTime()}-${profilePic.name}`)
        const snap = await uploadBytes(imgRef, profilePic)
        console.log(snap.ref.fullPath)
    }

    /* Agregando canales en la DB */
    const addChannel = () => {
        const channelRef = prompt('Ingrese el nombre del canal')
        if(channelRef) {
            const docRef = doc(db, `canales/${channelRef}`)
            setDoc(docRef, {
                id: `${channelRef}-${new Date().getTime()}`,
                name: channelRef,
            })
            getChannels()
        }
    }

    /* Leyendo canales en la DB */
    const getChannels = async () => {
        const myChannels = []
        const collectionRef = collection(db, 'canales');
        const encrypData = await getDocs(collectionRef);
        encrypData.forEach(encrypData => {
            myChannels.push(encrypData.data())
        })
        console.log('se ejecuto getchannels')
        setArrayChannels(myChannels)
    }

    /* Guardando collección de mensajes en canal */
    const saveMessagesCollectionToDB = () => {
        const docuRef = doc(db, `canales/${channelActive}/mensajes/${new Date().getTime()}`)
        setDoc(docuRef, {
            picture: user.photoURL || profilePic,
            user: user.displayName,
            email: user.email,
            message: inputMessage,
            id: `${new Date().getTime()}`,
        });
        setInputMessage('')
        getMessages();
    }

    /* Leyendo props de mensajes en la DB */
    const getMessages = async () => {
        const myMessages = []
        const messagesRef = collection(db, `canales/${channelActive}/mensajes`);
        const encrypMessages = await getDocs(messagesRef)
        encrypMessages.forEach(encrypMessages => {
            myMessages.push(encrypMessages.data())
        })
        setListMessages(myMessages)
    }

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, user => {
            setUser(user)
            console.log(user) 
            setLoading(false)
        })
        return () => unsub()
    }, [])

    return (
        <myContext.Provider value={{
            user,
            profilePic,
            setProfilePic,

            loading,
            setLoading,

            inputMessage,
            setInputMessage,
            
            login, 
            logout, 
            register, 
            loginWithGoogle,

            sendUserToDB, 
            updateStateUserToDB, 
            saveMessagesCollectionToDB,

            arrayChannels,
            channelActive,
            setChannelActive,
            addChannel,
            getChannels,

            getMessages,
            listMessages,
        }}>
            {children}
        </myContext.Provider>
    )
}

export {
    AuthProvider,
    useMyAuth,
}