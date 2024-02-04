import {Link} from "react-router-dom";

const AfterFooter = () => {
    return (
        <>
            {/*<div className="sticky-footer sticky-content fix-bottom">*/}
            {/*    <Link to="/" className="sticky-link active">*/}
            {/*        <i className="w-icon-home"></i>*/}
            {/*        <p>Home</p>*/}
            {/*    </Link>*/}

            {/*    <Link to="/products" className="sticky-link">*/}
            {/*        <i className="w-icon-category"></i>*/}
            {/*        <p>Shop</p>*/}
            {/*    </Link>*/}

            {/*    <div className="cart-dropdown dir-up">*/}
            {/*        <Link to="/cart" className="sticky-link">*/}
            {/*            <i className="w-icon-cart"></i>*/}
            {/*            <p>Cart</p>*/}
            {/*        </Link>*/}
            {/*    </div>*/}

            {/*    <div className="header-search hs-toggle dir-up">*/}
            {/*        <Link to="/search" className="search-toggle sticky-link">*/}
            {/*            <i className="w-icon-search"></i>*/}
            {/*            <p>Search</p>*/}
            {/*        </Link>*/}
            {/*    </div>*/}
            {/*</div>*/}

            <div className="mobile-menu-wrapper">
                <div className="mobile-menu-overlay"></div>

                <a href="#" className="mobile-menu-close"><i className="close-icon"></i></a>

                <div className="mobile-menu-container scrollable">
                    <div className="tab-content">
                        <div className="" id="main-menu">
                            <ul className="mobile-menu">
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/about">About</Link></li>
                                <li><Link to="/products">Products</Link></li>
                                <li><Link to="/contact">Contact</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AfterFooter;