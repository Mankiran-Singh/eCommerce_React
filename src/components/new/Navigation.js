import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState, useContext} from "react";
import axios from "axios";
import {URL} from "../URL";
import {CartContext} from "../../CartContext";

import Logo from "./Logo";
import load from "load-script";

const Navigation = () => {
    let navigate = useNavigate();

    let {cart, setCart, cartCount, setCartCount} = useContext(CartContext);

    let [loading, setLoading] = useState(true);
    let [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        axios.get(`${URL}users/check-login`)
            .then(res => {
                if (res.status === 200 && res.statusText === "OK") {
                    if (res.data === 'notLogged') {
                        setLoggedIn(false);
                    } else {
                        setLoggedIn(true);
                    }
                }
            }).catch(err => {
            console.log(err);
        });

        load('../assets/js/main.min.js', function (err, script) {
            if (err) {
                // print useful message
            } else {
                // console.log(script.src);
            }
        });
    }, []);

    return (
        <>
            <div className="header-middle">
                <div className="container">
                    <div className="header-left mr-md-4">
                        <a href="#" className="mobile-menu-toggle  w-icon-hamburger" aria-label="menu-toggle">
                        </a>
                        <Link to="/" className="logo ml-lg-0">
                            {/*<img src="assets/images/demos/demo2/header-logo.png" alt="logo" width="144" height="45"/>*/}
                            <img src="assets/images/demos/demo2/logo-new.png" alt="logo" width="144" height="45"/>
                        </Link>
                        <nav className="main-nav">
                            <ul className="menu">
                                <li>
                                    <Link to="/">Home</Link>
                                </li>

                                <li className="">
                                    <Link to="/about">About</Link>
                                </li>

                                <li className="">
                                    <Link to="/products">Products</Link>
                                </li>

                                <li className="">
                                    <Link to="/contact">Contact</Link>
                                </li>

                                {
                                    loggedIn ?
                                        <li className="">
                                            <Link to="/users/dashboard">My Account <i className="fa fa-user"></i></Link>
                                        </li>
                                        :
                                        <>
                                            <li className="">
                                                <Link to="/user-login">Login</Link>
                                            </li>

                                            <li className="">
                                                <Link to="/user-signup">Signup</Link>
                                            </li>
                                        </>
                                }

                            </ul>
                        </nav>
                    </div>

                    <div className="header-right ml-4">
                        <div className="dropdown cart-dropdown mr-0 mr-lg-2">
                            <div className="cart-overlay"></div>
                            <Link to="/cart" className="cart-toggle label-down link">
                                <i className="w-icon-cart">
                                    <span className="cart-count">{cartCount > 0 ? cartCount : 0}</span>
                                </i>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Navigation;