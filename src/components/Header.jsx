import { Link } from "react-router-dom";
import logo from '@logos/secretarijuridica.png';
import { useMyAuth } from "@context/authContext";
import { useNavigate } from "react-router-dom";

const Header = () => {

    const { user, logout } = useMyAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await setTimeout(() => {
                logout();
            }, 1000)
            navigate('/');
        } catch (error) {
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
                    !user
                    ? <Link to='/register'>Registrate</Link>
                    : <Link to='/'>{user.displayName || user.email}</Link>
                }
                {
                    user && <button onClick={handleLogout}>Salir</button>
                } 
                {
                    !user && <Link className="ancla__signin" to='/login'>Entrar</Link>
                }
            </nav>
        </header>
    )
}

export default Header;