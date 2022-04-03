import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useMyAuth } from "@context/authContext";
import Alert from "@components/Alert.jsx";

import googleIcon from '@icons/googleIcon.svg';

const Login = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const [user, setUser] = useState({
        email: "",
        password: "",
    })

    const { login, loginWithGoogle, sendUserToDB, updateStateUserToDB } = useMyAuth();
    const navigate = useNavigate();

    const handleChange = ({target: {name, value}}) => {
        setUser({
            ...user,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(!loading);
        setUser({...user})
        try {
            const credentialUser = await login(user.email, user.password);
            await updateStateUserToDB(true, credentialUser)
            setLoading(!loading);
            navigate('/');
        } catch (error) {
            if(error.code === "auth/user-not-found") {
                setError("Usuario no encontrado");
            } if(error.code === "auth/wrong-password") {
                setError("Contraseña incorrecta");
            }
            setLoading(false);
        }
    }

    const handleGoogleSignin = async () => {
        setLoading(!loading);
        try {
            const registredDataUser = await loginWithGoogle();
            await sendUserToDB(registredDataUser.user.displayName, registredDataUser.user.email, registredDataUser);
            await updateStateUserToDB(true, registredDataUser)
            setLoading(!loading);
            navigate('/');
        } catch (error) {
            setLoading(false)
            setError(error.message)
        }
    }

    return(
        <section className="sign__container">
            <h1 className="sign__title">Entrar</h1>
            {
                error && <Alert message={error}></Alert>
            }
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input 
                    type="text" 
                    name="email" 
                    id="email" 
                    required
                    value={user.email}
                    placeholder='Digita tu email'
                    onChange={handleChange}
                    />
                <label htmlFor="password">Contraseña</label>
                <input 
                    type="password" 
                    id="password"
                    name="password"
                    required 
                    value={user.password}
                    placeholder='******'
                    onChange={handleChange}/>
                <button 
                    type="submit">
                    {
                        loading ? 'Entrando..' : 'Entrar'
                    }
                </button>
            </form>

            <Link to='/register'>No tengo una cuenta registrada</Link>

            <button onClick={handleGoogleSignin}>
                Login with google
                <img src={googleIcon} alt="Google icon" />
            </button>
        </section>
    )
}

export default Login;