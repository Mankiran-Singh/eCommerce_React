import {Link} from "react-router-dom";
import {useContext, useState} from "react";
import {CartContext} from "../CartContext";
import axios from "axios";
import Swal from "sweetalert2";

import {URL} from "./URL";

function ProductCard(props) {
    let product = props.details;

    let [isAdding, setIsAdding] = useState(false);

    let {cart, setCart, cartCount, setCartCount} = useContext(CartContext);

    let addToCart = (e, product) => {
        e.preventDefault();
        // console.log(product);

        axios.post(`${URL}add-to-cart`, {
            data: product,
            action: 'add'
        }).then(res => {
            if (res.status === 200 && res.statusText === "OK") {
                if (res.data.count) {
                    setCartCount(res.data.count);
                    setIsAdding(true);
                    setTimeout(() => {
                        setIsAdding(false);
                    }, 1500);
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Product Already Exist In Cart!',
                    })
                }
            }
        }).catch(err => {
            console.log(err);
        });
    }

    return (
        <>
            {/* Products*/}
            <div className="swiper-slide product-wrap">
                <div className="product text-center">
                    <figure className="product-media">
                        <Link to={`/product-description/${product.productid}`}>
                            <img src={URL + product.photo}
                                 alt="Product" style={{width: "202px", height: "202px"}}/>
                            <img src={URL + product.photo}
                                 alt="Product" style={{width: "202px", height: "202px"}}/>
                        </Link>
                    </figure>
                    <div className="product-details">
                        <h4 className="product-name">
                            <Link to={`/product-description/${product.productid}`}>
                                {product.productname}
                            </Link>
                        </h4>

                        <div className="product-price">
                            <ins className="new-price">
                                {
                                    product.discount > 0 ?
                                        <>
                                            &#x20b9;{Math.round(product.price - ((product.price * product.discount) / 100))}
                                            &ensp;
                                            <del className="text-danger">&#x20b9;{product.price}</del>
                                        </>
                                        :
                                        <>&#x20b9;{product.price}</>
                                }
                                {/*$45.62&nbsp;&nbsp;<del>$58.28</del>*/}
                            </ins>
                        </div>

                        <button onClick={(e) => addToCart(e, product)}
                                disabled={isAdding}
                                type="button"
                                className="btn my-btn">
                            {isAdding ? 'Added' : 'Add to Cart'}
                        </button>
                    </div>
                </div>
            </div>
            {/* //Products*/}
        </>
    );
}

export default ProductCard;