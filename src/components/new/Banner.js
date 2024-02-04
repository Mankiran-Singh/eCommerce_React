const Banner = () => {
    return (
        <>
            <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                <ol className="carousel-indicators">
                    <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                </ol>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img className="d-block w-100" src="slider/slider1-home1.jpg" style={{height:"550px"}} alt="First slide"/>
                        {/*<div className="carousel-caption d-none d-md-block">*/}
                        {/*    <h2 style={{color: "#0088cc"}}>Deals And Promotions</h2>*/}
                        {/*</div>*/}
                    </div>
                    <div className="carousel-item">
                        <img className="d-block w-100" src="slider/slider2-home1.jpg" style={{height:"550px"}} alt="Second slide"/>
                        {/*<div className="carousel-caption d-none d-md-block">*/}
                        {/*    <h2 style={{color: "#0088cc"}}>Deals And Promotions</h2>*/}
                        {/*</div>*/}
                    </div>
                    <div className="carousel-item">
                        <img className="d-block w-100" src="slider/slider1-home3.jpg" style={{height:"550px"}} alt="Third slide"/>
                        {/*<div className="carousel-caption d-none d-md-block">*/}
                        {/*    <h2 style={{color: "#0088cc"}}>Deals And Promotions</h2>*/}
                        {/*</div>*/}
                    </div>
                </div>
                <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>
        </>
    );
}

export default Banner;