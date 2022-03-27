import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useMyAuth } from "@context/authContext";
import Alert from "@components/Alert.jsx";

import googleIcon from '@icons/googleIcon.svg';

const Login = () => {
    const [error, setError] = useState();
    const [user, setUser] = useState({
        email: "",
        password: "",
    })

    const { login, loginWithGoogle } = useMyAuth();
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
            await login(user.email, user.password);
            navigate('/');
        } catch (error) {
            if(error.code === "auth/user-not-found") {
                setError("Usuario no encontrado");
                console.log(error);
            } if(error.code === "auth/wrong-password") {
                setError("Contraseña incorrecta");
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
                    Entrar
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