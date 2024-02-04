import {Link} from "react-router-dom";
import {useEffect} from "react";
import load from "load-script";

// NEW
import TopHeader from "../components/new/TopHeader";
import NewNavigation from "../components/new/Navigation";
import BreadCrumb from "../components/new/BreadCrumb";
import NewFooter from "../components/new/NewFooter";
import Banner from "../components/new/Banner";
import AfterFooter from "../components/AfterFooter";

function About() {
    function ToTop() {
        window.scrollTo(0, 0);
        document.title = "About Us";
        document.body.classList.remove("home");
        document.body.classList.add("about-us");
    }

    useEffect(async () => {
        await ToTop();
    });

    return (
        <>
            <div className="page-wrapper">
                {/*<h1 className="d-none">Wolmart - Responsive Marketplace HTML Template</h1>*/}
                <header className="header">
                    <TopHeader logo="new/img/logos/white-logo.png"/>

                    <NewNavigation/>
                </header>

                <main className="main">
                    {/*<BreadCrumb title="About Us"/>*/}

                    <div className="page-content">
                        <div className="container">

                            <section className="introduce pt-9">
                                <h2 className="title title-center">
                                    We’re Devoted Marketing<br/>Consultants Helping Your Business Grow
                                </h2>
                                <p className=" mx-auto text-center">Lorem ipsum dolor sit amet, consectetur adipiscing
                                    elit, sed do eiusmod tempor
                                    labore et dolore magna aliqua. Venenatis tellu metus</p>
                                <figure className="br-lg">
                                    <img src="assets/images/pages/about_us/1.jpg" alt="Banner"
                                         width="1240" height="540" style={{backgroundColor:"#D0C1AE"}}/>
                                </figure>
                            </section>
                        </div>

                        <section className="member-section pt-9 mb-10 pb-4">
                            <div className="container">
                                <h4 className="title title-center mb-3">Team Members</h4>
                                <p className="text-center mb-8">Nunc id cursus metus aliquam. Libero id faucibus nisl
                                    tincidunt eget. Aliquam<br/>
                                        maecenas ultricies mi eget mauris. Volutpat ac</p>
                                <div className="swiper-container swiper-theme">
                                    <div className="swiper-wrapper row cols-xl-4 cols-lg-3 cols-sm-2 cols-1">
                                        <div className="swiper-slide member-wrap">
                                            <figure className="br-lg">
                                                <img src="assets/images/pages/about_us/4.jpg" alt="Member" width="295"
                                                     height="332"/>
                                            </figure>
                                            <div className="member-info text-center">
                                                <h4 className="member-name">John Doe</h4>
                                                <p className="text-uppercase">Founder &amp; CEO</p>
                                            </div>
                                        </div>
                                        <div className="swiper-slide member-wrap">
                                            <figure className="br-lg">
                                                <img src="assets/images/pages/about_us/5.jpg" alt="Member" width="295"
                                                     height="332"/>
                                            </figure>
                                            <div className="member-info text-center">
                                                <h4 className="member-name">Jessica Doe</h4>
                                                <p className="text-uppercase">Marketing</p>
                                            </div>
                                        </div>
                                        <div className="swiper-slide member-wrap">
                                            <figure className="br-lg">
                                                <img src="assets/images/pages/about_us/6.jpg" alt="Member" width="295"
                                                     height="332"/>
                                            </figure>
                                            <div className="member-info text-center">
                                                <h4 className="member-name">Rick Edward Doe</h4>
                                                <p className="text-uppercase">Developer</p>
                                            </div>
                                        </div>
                                        <div className="swiper-slide member-wrap">
                                            <figure className="br-lg">
                                                <img src="assets/images/pages/about_us/7.jpg" alt="Member" width="295"
                                                     height="332"/>
                                            </figure>
                                            <div className="member-info text-center">
                                                <h4 className="member-name">Melinda Wolosky</h4>
                                                <p className="text-uppercase">Design</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="swiper-pagination"></div>
                                </div>
                            </div>
                        </section>
                    </div>
                </main>

                <NewFooter logo="new/img/logos/logo.png"/>
            </div>

            <AfterFooter/>
        </>
    );
}

export default About;