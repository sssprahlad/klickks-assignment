import React from "react";
import { useNavigate } from "react-router-dom";
import "./OrderSuccess.css";
import Navbar from "../Navbar/Navbar";

const OrderSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="order-success-container">
        {/* <Navbar/> */}
        <div className="order-success-content-sub">
      <img 
        src="https://cdn-icons-png.flaticon.com/512/845/845646.png" 
        alt="Order Success" 
        className="success-image"
      />
      <h2>🎉 Order Placed Successfully!</h2>
      <p>Thank you for shopping with us. Your order is being processed.</p>
      <button className="order-success-container-button" onClick={() => navigate("/")}>Go to Home</button>
    </div>
    </div>
  );
};

export default OrderSuccess;
