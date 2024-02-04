import {Link} from "react-router-dom";

const NewFooter = () => {
    return (
        <>
            <footer className="footer">
                <div className="container">
                    <div className="footer-top">
                        <div className="row">
                            <div className="col-lg-4 col-sm-6">
                                <div className="widget widget-about">
                                    <a href="demo2.html" className="logo-footer">
                                        <img src="../assets/images/demos/demo2/logo-footer.png" alt="logo-footer"
                                             width="144" height="45"/>
                                    </a>
                                    <div className="widget-body">
                                        <p className="widget-about-desc">Register now to get updates on pronot get up
                                            icons & coupons ster now toon.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-3 col-sm-6">
                                <div className="widget">
                                    <h3 className="widget-title">Company</h3>
                                    <ul className="widget-body">
                                        <li><Link to="/about">About Us</Link></li>
                                        <li><Link to="/contact">Contact Us</Link></li>
                                    </ul>
                                </div>
                            </div>

                            <div className="col-lg-3 col-sm-6">
                                <div className="widget">
                                    <h4 className="widget-title">My Account</h4>
                                    <ul className="widget-body">
                                        <li><Link to="/user-login">Sign In</Link></li>
                                    </ul>
                                </div>
                            </div>

                            <div className="col-lg-3 col-sm-6">
                                <div className="widget">
                                    <h4 className="widget-title">Customer Service</h4>
                                    <ul className="widget-body">
                                        <li><Link to="#">Term and Conditions</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="py-3">
                        <div className="text-center">
                            <p className="copyright">Copyright © 2022. All Rights Reserved.</p>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default NewFooter;