import { useState } from "react";
import { useMyAuth } from "@context/authContext";
import { useNavigate, Link } from "react-router-dom";

import Alert from "@components/Alert.jsx";

import googleIcon from '@icons/googleIcon.svg';

const Signup = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const [user, setUser] = useState({
        displayName: "",
        email: "",
        password: "",
    })

    const { register, loginWithGoogle, sendUserToDB } = useMyAuth();

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
            const registredData = await register(user.email, user.password);
            await sendUserToDB(user.displayName, user.email, registredData);
            setLoading(!loading);
            navigate('/')
        } catch (error) {
            if(error.code === "auth/email-already-in-use") {
                setError("Este email ya está registrado");
            } if(error.code === "auth/invalid-email") {
                setError("Digita un email valido");
            } if(error.code === "auth/weak-password") {
                setError("Tu contraseña debe contener al menos 6 caracteres");
            }
            setLoading(false);
        }
    }

    const handleGoogleSignin = async () => {
        setLoading(!loading);
        try {
            const registredDataUser = await loginWithGoogle();
            await sendUserToDB(registredDataUser.user.displayName, registredDataUser.user.email, registredDataUser);
            setLoading(!loading);
            navigate('/');
        } catch (error) {
            setLoading(false)
            setError(error.message)
        }
    }

    return (
        <section className="sign__container">
            <h1 className="sign__title">Registrate</h1>
            {
                error && <Alert message={error}></Alert>
            }
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Nombre</label>
                        <input 
                            type="text"
                            name="displayName"
                            id="displayName"
                            required
                            value={user.displayName}
                            placeholder='Primer nombre'
                            maxLength='12'
                            onChange={handleChange}
                            />
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
                        name="password"
                        id="password"
                        required
                        value={user.password}
                        placeholder='******'
                        onChange={handleChange}
                    />  
                <button 
                    type="submit">
                    {
                        loading ? "Creando..." : "Registrarme"
                    }
                </button>
            </form>

            <Link to='/login'>Ya poseo una cuenta</Link>

            <button onClick={handleGoogleSignin}>
                Sign up with google
                <img src={googleIcon} alt="Google icon" />
            </button>
        </section>
    )
}

export default Signup;