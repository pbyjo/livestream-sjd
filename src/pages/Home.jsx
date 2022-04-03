import { useMyAuth } from "../context/authContext";
import Chat from '@components/Chat.jsx'
import Live from '@components/Live.jsx'

/* Components */
import Loading from '@components/Loading.jsx'

const Home = () => {
    
    const {loading} = useMyAuth();

    return(
        <section className="home__container">
            {
                loading && <Loading />
            }

            <Live />
            <Chat />
        </section>
    )
}

export default Home;