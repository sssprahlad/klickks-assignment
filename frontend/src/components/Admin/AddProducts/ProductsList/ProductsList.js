import React, { useEffect, useState } from "react";
import { URL, GET_PRODUCTS } from "../../../constants/Constants";
import Navbar from "../../../Navbar/Navbar";
import "./ProductsList.css";
import Cookies from 'js-cookie';
// import { useNavigate } from 'react-router-dom';

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
//   const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(URL + GET_PRODUCTS, {
          method: "GET",
          headers: { 
            "Content-Type": "application/json", 
            "Authorization": `Bearer ${Cookies.get('jwt_token')}` 
          },
        });
        const data = await response.json();
        console.log(data);
        setProducts(data);
      } catch (error) {
        console.log(error);
        setError(error.message);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await fetch(URL + GET_PRODUCTS, {
          method: "GET",
          headers: { 
            "Content-Type": "application/json", 
            "Authorization": `Bearer ${Cookies.get('jwt_token')}` 
          },
        });
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
    fetchCategories();
  }, []);

  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'N/A';
  };

  const deleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const response = await fetch(`${URL}${GET_PRODUCTS}/${id}`, {
          method: "DELETE",
          headers: { 
            "Content-Type": "application/json", 
            "Authorization": `Bearer ${Cookies.get('jwt_token')}` 
          },
        });
    
        if (!response.ok) {
          throw new Error(`Failed to delete product with id ${id}`);
        }
    
        setProducts(prev => prev.filter(product => product.id !== id));
      } catch (error) {
        console.error("Error deleting product:", error);
        setError(error.message);
      }
    }
  };

//   const handleUpdate = (id) => {
//     navigate(`/admin/update-product/${id}`);
//   };



  return (
    <div className="products-list-container">
      <Navbar />
      <div className="products-header">
        <h2>Products List</h2>
        {/* <button 
          className="add-product-btn" 
          onClick={() => navigate('/admin/add-product')}
        >
          Add New Product
        </button> */}
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      {products.length === 0 ? (
        <div>No products found.</div>
      ) : (
        <table className="products-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{getCategoryName(product.categoryId)}</td>
                <td>
                  <img
                    src={product?.productimage} 
                    alt={product.name}
                    width="50"
                    height="50"
                    className="product-image"
                  />
                </td>
                <td>
                  <div className="actions-container">
                    {/* <button 
                      className="update-button" 
                      onClick={() => handleUpdate(product.id)}
                    >
                      Update
                    </button> */}
                    <button 
                      className="delete-button" 
                      onClick={() => deleteProduct(product.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductsList;