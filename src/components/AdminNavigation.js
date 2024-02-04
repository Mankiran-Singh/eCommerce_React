import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState, useContext} from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {URL} from "./URL";

import Logo from "./new/Logo";
import load from "load-script";

function AdminNavigation({logo}) {
    let navigate = useNavigate();

    // Check Admin Logged-In
    const checkLogin = () => {
        axios.get(`${URL}admin/check-login`)
            .then(res => {
                if (res.status === 200 && res.statusText === "OK") {
                    if (res.data === 'notLogged') {
                        navigate('/admin-login');
                    } else {

                    }
                }
            }).catch(err => {
            console.log(err);
        });
    }

    useEffect(() => {
        checkLogin();
        ToTop();

        load('../assets/js/main.min.js', function (err, script) {
            if (err) {
                // print useful message
            } else {
                // console.log(script.src);
            }
        });
    }, []);

    // LOGOUT ACTION
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
                axios.get(`${URL}admin/logout`).then(res => {
                    // console.log(res.data);

                    if (res.status === 200 && res.statusText === "OK") {
                        if (res.data === 'loggedOut') {
                            navigate('/admin-login');
                        }
                    }
                }).catch(err => {
                    console.log(err);
                });
            }
        })
    }

    function ToTop() {
        window.scrollTo(0, 0);
    }

    return (
        <>
            <div className="header-middle">
                <div className="container">
                    <div className="header-left mr-md-4">
                        <a href="#" className="mobile-menu-toggle  w-icon-hamburger" aria-label="menu-toggle">
                        </a>
                        <Link to="/"  className="logo ml-lg-0">
                            <img src="../assets/images/demos/demo2/logo-new.png" alt="logo" width="144" height="45"/>
                        </Link>
                        <nav className="main-nav">
                            <ul className="menu">
                                <li>
                                    <Link to="/admin/dashboard">Home</Link>
                                </li>

                                <li>
                                    <Link to="/admin/manage-category">Manage Category</Link>
                                </li>

                                <li>
                                    <Link to="/admin/manage-sub-category">Manage Sub-Category</Link>
                                </li>

                                <li>
                                    <Link to="/admin/manage-product">Manage Products</Link>
                                </li>

                                <li>
                                    <Link to="/admin/manage-orders">Manage Orders</Link>
                                </li>

                                <li className="has-submenu">
                                    <Link to="#">Settings</Link>
                                    <ul className="submenu">
                                        <li><Link to="/admin/change-password">Change Password</Link></li>
                                        <li><Link onClick={logout} to="/admin/logout">Logout</Link></li>
                                    </ul>
                                </li>

                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminNavigation;