import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../Styles/NavBar.css"
import { NavLink } from 'react-router-dom';

const NavBar = () => {
    const id = localStorage.getItem('id')
    const [logged , setLogged] = useState(id ? true : false)
    return (
        <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <div className="container">
                <NavLink to="/home" className="navbar-brand websiteName">YR Home</NavLink>
                <div className="collapse navbar-collapse" id="collapsibleNavId">
                    <div className="navbar-nav m-auto  mt-2 mt-lg-0">
                        <NavLink exact='true' to="/home" className="nav-link" activeclassname="active">
                            Home
                        </NavLink>
                        <NavLink exact='true' to="/contactUs" className="nav-link" activeclassname="active">
                            Contact Us
                        </NavLink>
                        <NavLink exact='true' to="/products" className="nav-link" activeclassname="active">
                            Products
                        </NavLink>
                        <NavLink exact='true' to="/cart" className="nav-link" activeclassname="active">
                            Cart
                        </NavLink>
                        <NavLink exact='true' to="/favourites" className="nav-link" activeclassname="active">
                            Favourites
                        </NavLink>
                        {logged ?
                        <>
                            <NavLink exact='true' to="/profile" className="nav-link" activeclassname="active">
                                Profile
                            </NavLink>
                            <NavLink exact='true' to="/login" className="nav-link" activeclassname="active"
                            onClick={()=> {
                                localStorage.removeItem('id')
                                setLogged(false)
                            }}
                            >
                                Logout
                            </NavLink>
                            </>
                            :
                            <NavLink exact='true' to="/login" className="nav-link" activeclassname="active">
                                Login
                            </NavLink>
                        }


                    </div>
                </div>
            </div>
        </nav>

    );
};

export default NavBar;