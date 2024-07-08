import React from 'react';
import { Link } from 'react-router-dom';
const Footer = () => {
    return (
        <div className="text-center text-lg-start bg-body-tertiary text-muted mt-5">
            <div className="py-3" style={{ backgroundColor: 'rgba(207, 198, 198, 0.5)' }}>
                <div className="container text-center text-md-start mt-2">
                    <div className="row mt-3">
                        <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                            <h6 className="text-uppercase fw-bold mb-4" style={{ fontStyle: "italic" }}>
                                <i className="fas fa-gem me-3" ></i>YR Home
                            </h6>
                            <p>

                                Website helps you choose the style of decor you dream of in your home
                            </p>
                        </div>

                        <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                            <h6 className="text-uppercase fw-bold mb-4">
                                Our Pages
                            </h6>

                            <p>
                                <Link to="/products" routerLinkActive="router-link-active" className="text-reset">Products</Link>
                            </p>

                            <p>
                                <Link to="/cart" routerLinkActive="router-link-active" className="text-reset">Cart</Link>
                            </p>

                            <p>
                                <Link to="/favourites" routerLinkActive="router-link-active" className="text-reset">Favourites</Link>

                            </p>

                            <p>
                                <Link to="/contactUs" routerLinkActive="router-link-active" className="text-reset">Contact Us</Link>

                            </p>
                        </div>
                        <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                            <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                            <p><i className="fas fa-home me-3"></i> Egypt</p>
                            <p><i className="fas fa-phone me-3"></i> + 01 234 567 88</p>
                            <p><i className="fas fa-print me-3"></i> + 01 234 567 89</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Footer;