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
import auth from '../firebase/firebase.js';

const myContext = createContext()

const useMyAuth = () => {
    const context = useContext(myContext)
    if(!context) throw new Error('useMyAuth must be used within an AuthProvider');
    return context
}

const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const register = (email, password) => 
        createUserWithEmailAndPassword(auth, email, password)
    const login = (email, password) => (
        signInWithEmailAndPassword(auth, email, password)
    )

    const logout = () => signOut(auth)

    const loginWithGoogle = () => {
        const googleProvider = new GoogleAuthProvider()
        return signInWithPopup(auth, googleProvider)
        
    }

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            setLoading(false)
        })

        return () => unsub()
    }, [])

    return (
        <myContext.Provider value={{register, login, logout, loginWithGoogle, loading, user}}>
            {children}
        </myContext.Provider>
    )
}

export {
    AuthProvider,
    useMyAuth,
}