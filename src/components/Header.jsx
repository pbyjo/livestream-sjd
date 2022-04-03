import { Link, useNavigate } from "react-router-dom";
import { useMyAuth } from "@context/authContext";
import { doc, updateDoc } from "firebase/firestore";
import {auth, db} from '../firebase/firebase.js';

/* Assets */
import logo from '@logos/secretarijuridica.png';

const Header = () => {
    const { 
        user, 
        logout, 
        profilePic,
        loading,
        setLoading
    } = useMyAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        setLoading(!loading);
        try {
            await updateDoc(doc(db, 'users', auth.currentUser.uid), {
                isOnline: false,
            })
            await logout();
            navigate('/');
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error(error);
        }
    }

    return(
        <header>
            <Link to='/'>
                <img src={logo} alt="logo secretaria juridica" />
            </Link>

            <nav>    
                {
                    user ? 
                    <>  
                        <div>
                            <figure>
                                <img src={user.photoURL || profilePic} alt="avatar user" />
                            </figure>
                            {user.displayName || user.email}
                        </div>
                        <button onClick={handleLogout}>{loading ? 'Saliendo...' : 'Salir'}</button>
                    </> :
                    <>    
                        <Link to='/register'>Registrate</Link>
                        <Link className="ancla__signin" to='/login'>Entrar</Link> 
                    </>
                }
            </nav>
        </header>
    )
}

export default Header;