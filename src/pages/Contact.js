import {Link} from "react-router-dom";
import {useEffect, useState} from "react";

// NEW
import TopHeader from "../components/new/TopHeader";
import NewNavigation from "../components/new/Navigation";
import BreadCrumb from "../components/new/BreadCrumb";
import NewFooter from "../components/new/NewFooter";
import load from "load-script";
import AfterFooter from "../components/AfterFooter";
import Swal from "sweetalert2";

function Contact() {
    function ToTop() {
        window.scrollTo(0, 0);
        document.title = "Contact Us";
        document.body.classList.remove("home");
        document.body.classList.add("about-us");
    }

    useEffect(async () => {
        await ToTop();
        load('assets/js/main.min.js', function (err, script) {
            if (err) {
                // print useful message
            } else {
                // console.log(script.src);
            }
        })
    });

    let [name, setName] = useState("");
    let [email, setEmail] = useState("");
    let [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (name && email && message) {
            document.getElementById('contact').reset();
            alert('Message Submitted');
        } else {
            Swal.fire({
                icon: "warning",
                title: "All fields are required."
            })
        }

    }

    return (
        <>
            <div className="page-wrapper">
                {/*<h1 className="d-none">Wolmart - Responsive Marketplace HTML Template</h1>*/}
                <header className="header">
                    <TopHeader logo="new/img/logos/white-logo.png"/>

                    <NewNavigation/>
                </header>

                <main className="main">
                    {/*<BreadCrumb title="Contact Us"/>*/}

                    <div className="page-content contact-us">
                        <div className="container">

                            <div className="row py-5">
                                <div className="col-lg-6">
                                    <section className="content-title-section mb-10">
                                        <h3 className="title title-center mb-3">
                                            Contact Information
                                        </h3>
                                        <p className="text-center">Lorem ipsum dolor sit amet,
                                            consectetur adipiscing elit, sed do eiusmod tempor incididunt ut</p>
                                    </section>

                                    <section className="contact-information-section mb-10">
                                        <div className=" swiper-container swiper-theme ">
                                            <div className="swiper-wrapper row cols-xl-4 cols-md-3 cols-sm-2 cols-1">
                                                <div className="col-lg-6 my-3">
                                                    <div className="swiper-slide icon-box text-center icon-box-primary">
                                    <span className="icon-box-icon icon-email">
                                        <i className="w-icon-envelop-closed"></i>
                                    </span>
                                                        <div className="icon-box-content">
                                                            <h4 className="icon-box-title">E-mail Address</h4>
                                                            <p>mail@example.com</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 my-3">
                                                    <div className="swiper-slide icon-box text-center icon-box-primary">
                                    <span className="icon-box-icon icon-headphone">
                                        <i className="w-icon-headphone"></i>
                                    </span>
                                                        <div className="icon-box-content">
                                                            <h4 className="icon-box-title">Phone Number</h4>
                                                            <p>(123) 456-7890 / (123) 456-9870</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="swiper-wrapper row cols-xl-4 cols-md-3 cols-sm-2 cols-1">
                                                <div className="col-lg-6 my-3">
                                                    <div className="swiper-slide icon-box text-center icon-box-primary">
                                    <span className="icon-box-icon icon-map-marker">
                                        <i className="w-icon-map-marker"></i>
                                    </span>
                                                        <div className="icon-box-content">
                                                            <h4 className="icon-box-title">Address</h4>
                                                            <p>Lawrence, NY 11345, USA</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 my-3">
                                                    <div className="swiper-slide icon-box text-center icon-box-primary">
                                    <span className="icon-box-icon icon-fax">
                                        <i className="w-icon-fax"></i>
                                    </span>
                                                        <div className="icon-box-content">
                                                            <h4 className="icon-box-title">Fax</h4>
                                                            <p>1-800-570-7777</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </div>

                                <div className="col-lg-6">
                                    <section className="contact-section">
                                        <div className="row gutter-lg pb-3">
                                            <div className="col-lg-12 mb-8">
                                                <h4 className="title mb-3">Send Us a Message</h4>
                                                <form className="form contact-us-form" id="contact">
                                                    <div className="form-group">
                                                        <label htmlFor="username">Your Name</label>
                                                        <input onChange={(e) => setName(e.target.value)} type="text"
                                                               id="username" name="username"
                                                               className="form-control"/>
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="email_1">Your Email</label>
                                                        <input onChange={(e) => setEmail(e.target.value)} type="email"
                                                               id="email_1" name="email_1"
                                                               className="form-control" required/>
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="message">Your Message</label>
                                                        <textarea onChange={(e) => setMessage(e.target.value)}
                                                                  id="message" name="message" cols="30" rows="5"
                                                                  className="form-control" required/>
                                                    </div>
                                                    <button onClick={handleSubmit} type="submit"
                                                            className="btn btn-dark btn-sm btn-block btn-rounded">Send Now
                                                    </button>
                                                </form>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                            </div>

                        </div>

                    </div>
                </main>

                <NewFooter logo="new/img/logos/logo.png"/>
            </div>

            <AfterFooter/>
        </>
    );
}

export default Contact;