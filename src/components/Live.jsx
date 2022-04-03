const Live = () => {
    return(
        <div className="live__container">
            <iframe
                src="https://www.youtube.com/embed/82D8YJ0Azec" 
                title="YouTube video player" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen>
            </iframe>
        </div>
    )
}

export default Live;