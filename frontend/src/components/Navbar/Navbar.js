import React from "react";
import Cookies from 'js-cookie';
import { useNavigate, NavLink } from "react-router-dom";
import "./Navbar.css";
import { FaCartPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { URL, GET_CART } from "../constants/Constants";

function Navbar() {
    const navigate = useNavigate();
    const username = Cookies.get('username');
    const category = Cookies.get('category');
    const count = useSelector((state) => state.user.count);
    console.log(count,"count in navbar");
    const [cartItems, setCartItems] = useState([]);
    
    const handleLogout = () => {
        if(window.confirm("Are you sure you want to logout?")){
            Cookies.remove('jwt_token');
            navigate('/login', { replace: true });
        }
    };

    

  
    const navLinkClass = ({ isActive }) => {
        return isActive ? 'active' : '';
    };

     useEffect(() => {
    
            const fetchCartItems = async() =>{
                try {
                           const response = await fetch(URL + GET_CART, {
                               method: "GET",
                               headers: { 
                                   "Authorization": `Bearer ${Cookies.get('jwt_token')}` 
                               },
                           });
                           const data = await response.json();
                           console.log('Fetched cart items:', data);
                           setCartItems(data?.items);
                          
                       } catch (err) {
                           console.error('Error fetching cart items:', err);
                       } 
            }
            fetchCartItems();
            
        }, [count]);



    return (
        <div className="navbar">
            <img src="https://www.pngkit.com/png/full/1-11662_klickks-logo-png-klickks-logo-png.png" alt="logo" width="100" height="100"/>
            <ul>
                <li><NavLink to="/" className={navLinkClass} end>Home</NavLink></li>
                <li><NavLink to="/about" className={navLinkClass}>About</NavLink></li>
                <li style={{ display: category === "ADMIN" ? "block" : "none" }}>
                    <NavLink to="/add-category" className={navLinkClass}>Add Category</NavLink>
                </li>
                <li style={{ display: category === "ADMIN" ? "block" : "none" }}>
                    <NavLink to="/add-product" className={navLinkClass}>Add Product</NavLink>
                </li>
                <li><NavLink to="/cart" className={navLinkClass}><FaCartPlus />{cartItems?.length}</NavLink></li>
                <li><NavLink to="/contact" className={navLinkClass}>Contact</NavLink></li>
            </ul>
            <div className="navbar-buttons">
                <button className="username">{username?.[0]?.toUpperCase()}</button>
                <button className="logout-button" onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
}

export default Navbar;
