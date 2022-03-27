import { useState } from "react";
import { useMyAuth } from "@context/authContext";
import { useNavigate, Link } from "react-router-dom";
import Alert from "@components/Alert.jsx";

import googleIcon from '@icons/googleIcon.svg';

const Signup = () => {
    const [error, setError] = useState();
    const [user, setUser] = useState({
        email: "",
        password: "",
    })

    const { register, loginWithGoogle } = useMyAuth();

    const navigate = useNavigate();

    const handleChange = ({target: {name, value}}) => {
        setUser({
            ...user,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(user.email, user.password);
            navigate('/')
        } catch (error) {
            if(error.code === "auth/email-already-in-use") {
                setError("Este email ya está registrado");
                console.log(error)
            } if(error.code === "auth/invalid-email") {
                setError("Digita un email valido");
                console.log(error);
            } if(error.code === "auth/weak-password") {
                setError("Tu contraseña debe contener al menos 6 caracteres");
                console.log(error);
            }
        }
    }

    const handleGoogleSignin = async () => {
        try {
            await loginWithGoogle();
            navigate('/');
        } catch (error) {
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
                    Registrarme
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