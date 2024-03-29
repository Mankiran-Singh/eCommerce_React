import {useState, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {URL} from "../../components/URL";
import Swal from "sweetalert2";

import TopHeader from "../../components/new/TopHeader";
import AdminNavigation from "../../components/AdminNavigation";
import BreadCrumb from "../../components/new/BreadCrumb";
import NewFooter from "../../components/new/NewFooter";
import load from "load-script";
import {Button, Table} from "react-bootstrap";
import {FcFullTrash} from "react-icons/fc";
import ReactTooltip from "react-tooltip";
import AfterFooterAdmin from "../../components/AfterFooterAdmin";

function ChangePassword() {
    let navigate = useNavigate();

    let [formInputs, setFormInputs] = useState({
        oldpassword: '',
        newpassword: '',
        confirmpassword: ''
    });

    function ToTop() {
        window.scrollTo(0, 0);
        document.title = "Change Password";
        // document.body.classList.remove("grocino-home");
        // document.body.classList.add("grocino-about");
    }

    useEffect(async () => {
        await ToTop();
    }, []);

    const handle_Inputs = (e) => {
        let key = e.target.name;
        formInputs[key] = e.target.value;
        // console.log(formInputs);
        setFormInputs(formInputs);
    }

    // Update Password Action
    const UpdatePassword = () => {
        let {oldpassword, newpassword, confirmpassword} = formInputs;

        if (oldpassword && newpassword && confirmpassword) {
            axios.post(`${URL}admin/change-password`, {
                oldpassword,
                newpassword,
                confirmpassword
            }).then(res => {
                    if (res.status === 200 && res.statusText === "OK") {
                        // console.log(res.data);

                        if (res.data === 'success') {
                            Swal.fire({
                                icon: 'success',
                                title: 'Password Updated Successfully',
                            });
                            document.getElementById('change-password').reset();

                            setFormInputs({
                                oldpassword: '',
                                newpassword: '',
                                confirmpassword: ''
                            });
                        } else if (res.data === 'notsame') {
                            Swal.fire({
                                icon: 'warning',
                                // title: 'New Password && Confirm Password Must Be Same.',
                                text: 'New Password & Confirm Password Must Be Same.',
                            });
                        } else if (res.data === 'invalidpassword') {
                            Swal.fire({
                                icon: 'error',
                                text: 'Invalid Old Password Entered.',
                            });
                        } else {
                            navigate('/admin-login');
                        }
                    }
                }
            ).catch(err => {
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
                    <AdminNavigation logo="../new/img/logos/logo.png"/>
                </header>

                <main className="main">
                    <BreadCrumb title="Change Password"/>

                    <section className="introduce mt-10 mb-10">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-5 col-md-8 col-sm-10 col-12 mx-auto">
                                    <form id="change-password" className="form-signin">
                                        <div className="form-group">
                                            <input onChange={handle_Inputs} type="password" id="oldpassword"
                                                   name="oldpassword" className="form-control"
                                                   placeholder="Enter Old Password" required/>
                                            <i className="uil uil-unlock icon"></i>
                                        </div>

                                        <div className="form-group">
                                            <input onChange={handle_Inputs} type="password" id="newpassword"
                                                   name="newpassword" className="form-control"
                                                   placeholder="Enter New Password" required/>
                                            <i className="uil uil-unlock icon"></i>
                                        </div>

                                        <div className="form-group">
                                            <input onChange={handle_Inputs} type="password" id="confirmpassword"
                                                   name="confirmpassword" className="form-control"
                                                   placeholder="Enter Confirm Password" required/>
                                            <i className="uil uil-unlock icon"></i>
                                        </div>

                                        <div className="form-group">
                                            <button className="btn btn-block btn-font py-3 btn-primary"
                                                    onClick={UpdatePassword}
                                                    type="button">Update Password
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>

                <NewFooter/>
            </div>

            <AfterFooterAdmin/>
        </>
    );
}

export default ChangePassword;