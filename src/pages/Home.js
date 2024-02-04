import {Link} from "react-router-dom";
import axios from "axios";
import {useState, useEffect} from "react";

import ProductCard from "../components/ProductCard";
import {URL} from "../components/URL";
import {LoadingScreen} from "../components/ReactLoadingAnimation";
import load from "load-script";
import Swal from "sweetalert2";

// NEW
import TopHeader from "../components/new/TopHeader";
import NewNavigation from "../components/new/Navigation";
import Banner from "../components/new/Banner";
import NewFooter from "../components/new/NewFooter";
import AfterFooter from "../components/AfterFooter";

function Home(props) {
    let [products, setProducts] = useState([]);
    // let [loading, setLoading] = useState(true);
    let [loading, setLoading] = useState(false);

    let FetchAPI = async () => {
        await axios.post(`${URL}view-products`, {
            action: "home"
        }).then(res => {
            setProducts(res.data);
            setTimeout(() => {
                setLoading(false);
            }, 2000);
        }).catch(err => {
            console.log(err);
        });
    }

    function ToTop() {
        window.scrollTo(0, 0);
        document.title = "Home";
        document.body.classList.remove("about-us");
        document.body.classList.add("home");
    }

    useEffect(async () => {
        await FetchAPI();
        await ToTop();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        document.getElementById('subscribe').reset();
        Swal.fire({
            icon: "success",
            title: "Thank You"
        })
    }

    return (
        <>
            <div className="page-wrapper">
                <header className="header">
                    <NewNavigation/>
                </header>

                <main className="main">
                    <Banner/>

                    <div className="container">
                        {/* After Slider */}
                        <>
                            <div
                                className="mt-6 mb-6">
                                <h1 className="text-center my-font-size alert alert-secondary my-color">Products</h1>
                                {/* Products Card */}
                                <>
                                    {
                                        loading ?
                                            <>
                                                <div style={{height: "400px"}}>
                                                    <div style={{
                                                        display: "grid",
                                                        alignContent: "center",
                                                        justifyContent: "center"
                                                    }}>
                                                        <LoadingScreen type="spokes" color="#fcd462"/>
                                                        <p>loading...</p>
                                                    </div>
                                                </div>
                                            </> :
                                            <>
                                                {
                                                    products.length > 0
                                                        ?
                                                        <>
                                                            <div
                                                                className="swiper-wrapper row cols-lg-5 cols-md-4 cols-2">
                                                                {

                                                                    products.map((product) => {
                                                                        return (
                                                                            <ProductCard key={product.productid}
                                                                                         details={product}/>
                                                                        );
                                                                    })
                                                                }
                                                            </div>

                                                            <div className="text-center">
                                                                <Link to="products"
                                                                      className="btn px-5  btn-success">
                                                                    More Products&ensp;
                                                                    <img src="new/img/home/right-arrow.png"
                                                                         className="arrow-left" alt="Arrow Left"/>
                                                                </Link>
                                                            </div>
                                                        </>
                                                        :
                                                        <>
                                                            <div className="text-center p-5 alert alert-danger">No
                                                                Products
                                                                Found
                                                            </div>
                                                        </>
                                                }
                                            </>
                                    }

                                    <div className="swiper-pagination"></div>
                                    {/*</div>*/}
                                </>
                            </div>
                        </>
                    </div>

                </main>

                <NewFooter/>
            </div>

            <AfterFooter/>
        </>
    );
}

export default Home;