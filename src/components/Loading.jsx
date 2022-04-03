import logo from '@logos/secretarijuridica.png';

const Loading = () => {
    return (
        <section className='loading__container'>
            <img src={logo} alt="Logo Secretaria Juridica Distrital" />
            <p>Cargando...</p>
        </section>
    )
}

export default Loading;