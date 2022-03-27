import { useMyAuth } from "../context/authContext";

const Home = () => {
    
    const {loading} = useMyAuth();

    return(
        <section className="home__container">
            <h1>Home</h1>
            {
                loading && <h1>Cargando...</h1>
            }
        </section>
    )
}

export default Home;