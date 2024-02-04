import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {URL} from "../URL";

const TopHeader = () => {
    let [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        checkLogin();
    }, []);

    // Check User Login
    const checkLogin = () => {
        axios.get(`${URL}users/check-login`)
            .then(res => {
                // console.log(res.data);
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
    }

    return (
        <>
            {/*<div className="header-top">*/}
            {/*    <div className="container">*/}
            {/*        <div className="header-left">*/}
            {/*            <p className="welcome-msg">Welcome to Wolmart Store!</p>*/}
            {/*        </div>*/}
            {/*        <div className="header-right pr-0">*/}
            {/*            {*/}

            {/*                loggedIn ?*/}
            {/*                    <Link title={"User Dashboard"} to="/users/dashboard"*/}
            {/*                          className="d-lg-show">My Account</Link>*/}
            {/*                    :*/}
            {/*                    <>*/}
            {/*                        <Link to="/user-login"*/}
            {/*                           className="d-lg-show login sign-in">*/}
            {/*                            <i className="w-icon-account"></i>Sign In*/}
            {/*                        </Link>*/}
            {/*                        <span className="delimiter d-lg-show">/</span>*/}
            {/*                        <Link to="/user-signup"*/}
            {/*                              className="ml-0 d-lg-show login register">Register</Link>*/}
            {/*                    </>*/}
            {/*            }*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </>
    );
}

export default TopHeader