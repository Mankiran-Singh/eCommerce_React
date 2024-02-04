import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState, useContext} from "react";
import axios from "axios";

import {CartContext} from "../CartContext";
import {URL} from "./URL";
import Logo from "./new/Logo";
import load from "load-script";
import Swal from "sweetalert2";

function UserNavigation({logo}) {
    let navigate = useNavigate();

    let {cart, setCart, cartCount, setCartCount} = useContext(CartContext);

    // Check User Login
    const checkLogin = () => {
        axios.get(`${URL}users/check-login`)
            .then(res => {
                if (res.status === 200 && res.statusText === "OK") {
                    if (res.data === 'notLogged') {
                        navigate('/user-login');
                    } else {

                    }
                }
            }).catch(err => {
            console.log(err);
        });
    }

    function ToTop() {
        window.scrollTo(0, 0);
        // document.body.classList.remove("grocino-home");
        // document.body.classList.add("grocino-about");
    }

    useEffect(() => {
        ToTop();
        checkLogin();

        load('../assets/js/main.min.js', function (err, script) {
            if (err) {
                // print useful message
            } else {
                // console.log(script.src);
            }
        });
    }, []);

    // Logout
    const logout = (e) => {
        e.preventDefault();

        Swal.fire({
            title: 'Are you sure to logout?',
            // text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Logout'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.get(`${URL}users/logout`)
                    .then(res => {
                        if (res.status === 200 && res.statusText === "OK") {
                            if (res.data === 'loggedOut') {
                                navigate('/user-login');
                            }
                        }
                    }).catch(err => {
                    console.log(err);
                });
            }
        });
    }

    return (
        <>
            <div className="header-middle">
                <div className="container">
                    <div className="header-left mr-md-4">
                        <a href="#" className="mobile-menu-toggle  w-icon-hamburger" aria-label="menu-toggle">
                        </a>
                        <Link to="/" className="logo ml-lg-0">
                            <img src="../assets/images/demos/demo2/logo-new.png" alt="logo" width="144" height="45"/>
                        </Link>
                        <nav className="main-nav">
                            <ul className="menu">
                                <li className="">
                                    <Link to="/users/dashboard">Home</Link>
                                </li>

                                <li className="">
                                    <Link to="/users/my-orders">My Orders</Link>
                                </li>

                                <li className="has-submenu">
                                    <a href="#">Settings</a>
                                    <ul className="submenu">
                                        <li className="">
                                            <Link to="/users/change-password">Change Password</Link>
                                        </li>
                                        <li className="">
                                            <Link onClick={logout} to="/users/logout">Logout</Link>
                                        </li>
                                    </ul>
                                </li>

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
                                <span className="cart-label">Cart</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UserNavigation;