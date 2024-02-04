import axios from "axios";
import {useState, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import Swal from "sweetalert2";

import {URL} from "../components/URL";

// NEW
import TopHeader from "../components/new/TopHeader";
import NewNavigation from "../components/new/Navigation";
import BreadCrumb from "../components/new/BreadCrumb";
import NewFooter from "../components/new/NewFooter";
import load from "load-script";
import AfterFooter from "../components/AfterFooter";

function UserLogin() {
    let navigate = useNavigate();

    let [formInputs, setFormInputs] = useState({
        username: '',
        password: ''
    });

    function ToTop() {
        window.scrollTo(0, 0);
        document.title = "User Login";
        document.body.classList.remove("home");
        document.body.classList.add("about-us");
    }

    useEffect(async () => {
        await ToTop();
    }, []);

    const handle_Inputs = (e) => {
        let key = e.target.name;
        formInputs[key] = e.target.value;
        setFormInputs(formInputs);
    }

    const login = () => {
        let {username, password} = formInputs;

        if (username && password) {
            axios.post(`${URL}user-login`, {
                "username": formInputs.username,
                "password": formInputs.password
            }).then(res => {
                if (res.status === 200 && res.statusText === "OK") {
                    // console.log(res.data);

                    if (res.data === 'success') {
                        navigate('/users/dashboard');
                    } else {
                        Swal.fire({
                            icon: 'warning',
                            title: 'Invalid Username or Password',
                        })
                    }
                }
            }).catch(err => {
                console.log(err);
            })
        } else {
            Swal.fire({
                title: 'All Fields Are Required.',
                icon: 'warning',
            });
        }
    }

    return (
        <>
            <div className="page-wrapper">
                <header className="header">
                    <TopHeader logo="new/img/logos/white-logo.png"/>

                    <NewNavigation/>
                </header>

                <main className="main login-page">
                    <BreadCrumb title="User Login"/>

                    <div className="page-content">
                        <div className="container">
                            <section className="col-lg-6 offset-lg-3">
                                <div className="login-popup">
                                    <form id="sign-in">
                                        <div className="ui form">
                                            <div className="form-group">
                                                <label style={{fontWeight: "600"}}>Username *</label>
                                                <input onChange={handle_Inputs} type="text" name="username"
                                                       id="username" className="form-control"
                                                       required/>
                                                <i className="uil uil-user icon"></i>
                                            </div>

                                            <div className="form-group">
                                                <label style={{fontWeight: "600"}}>Password *</label>
                                                <input onChange={handle_Inputs} type="password" id="password"
                                                       name="password" className="form-control"
                                                       required/>
                                                <i className="uil uil-unlock icon"></i>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <button style={{fontWeight: "600"}}
                                                    className="btn btn-block py-3 btn-primary"
                                                    onClick={login}
                                                    type="button">Sign In
                                            </button>
                                        </div>

                                        <div className="text-center">
                                            <label>New User? <Link to="/user-signup"> Create account</Link></label>
                                        </div>
                                    </form>
                                </div>
                            </section>
                        </div>
                    </div>
                </main>

                <NewFooter logo="new/img/logos/logo.png"/>
            </div>

            <AfterFooter/>
        </>
    );
}

export default UserLogin;