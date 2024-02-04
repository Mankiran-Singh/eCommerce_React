import {useState, useEffect} from "react";

import TopHeader from "../../components/new/TopHeader";
import AdminNavigation from "../../components/AdminNavigation";
import NewFooter from "../../components/new/NewFooter";
import load from "load-script";
import BreadCrumb from "../../components/new/BreadCrumb";
import AfterFooter from "../../components/AfterFooter";
import {Link} from "react-router-dom";
import AfterFooterAdmin from "../../components/AfterFooterAdmin";

function AdminDashboard() {
    function ToTop() {
        window.scrollTo(0, 0);
        document.title = "Admin Dashboard";
        document.body.classList.remove("home");
        document.body.classList.add("about-us");
    }

    useEffect(async () => {
        await ToTop();
    }, []);

    return (
        <>
            <div className="page-wrapper">
                <header className="header">
                    <AdminNavigation logo="../new/img/logos/logo.png"/>
                </header>

                <main className="main">
                    {/*<BreadCrumb title="About Us"/>*/}

                    <section className="introduce mt-10 pt-10 mb-10 pb-10">
                        <div className="container">
                            <div className="col-lg-8 col-md-8 col-sm-10 col-12 mx-auto">
                                <h1 className='jumbotron text-dark text-center'>
                                    <marquee behavior="" direction="">Welcome Admin</marquee>
                                </h1>
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

export default AdminDashboard;