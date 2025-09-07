import React, { useEffect, useState } from 'react';
import "./AddProducts.css";
import Navbar from "../../Navbar/Navbar";
import { URL, ADD_PRODUCT, GET_CATEGORY } from '../../constants/Constants';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const AddProducts = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [productdescription, setproductdescription] = useState('');
    const [price, setPrice] = useState('');
    const [productimage, setproductImage] = useState('');
    const [categoryid, setcategoryid] = useState('');
    const [data, setData] = useState(null);
    const [productstock, setproductstock] = useState('');
    const [categories, setCategories] = useState([]);
    const [msgStatus, setMsgStatus] = useState(false);   

  

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(URL + ADD_PRODUCT, {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json", 
                    "Authorization": `Bearer ${Cookies.get('jwt_token')}` 
                },
                body: JSON.stringify({ 
                    name, 
                    productdescription, 
                    price,
                    productimage,
                        categoryid,
                        productstock,
                }),
            });

            const result = await response.json();
            setData(result);
            
            if (response.ok) {
                setName('');
                setproductdescription('');
                setPrice('');
                setproductImage('');
                setcategoryid('');
                setproductstock('');
            }
        } catch (error) {
            console.error('Error adding product:', error);
            setData({ error: 'Failed to add product. Please try again.' });
        }
    };

    useEffect(() => {
        const fetchCategories = async () => {
          try {
            const response = await fetch(URL + GET_CATEGORY, {
              method: "GET",
              headers: { 
                "Content-Type": "application/json", 
                "Authorization": `Bearer ${Cookies.get('jwt_token')}` 
              },
            });
      
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
      
            const data = await response.json(); 
            console.log("Fetched categories:", data);
      
            setCategories(Array.isArray(data) ? data : data.categories || []);
          } catch (error) {
            console.error("Error fetching categories:", error);
          }
        };
      
        fetchCategories();
      }, []);
      

      useEffect(() => {
        if(data?.status){
            setMsgStatus(true);
        }else{
            setMsgStatus(false);
        }
        setTimeout(() => {
            setMsgStatus(false);
        }, 2000);

      },[data?.status])
      
    

    return (
        <div className="add-product">
            <Navbar />
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "90vh" }}>  
                <div className='add-product-container'>
                    <div className="product-header">
                        <h2>Add Product</h2>
                        <button 
                            onClick={() => navigate('/products-list')} 
                            className='products-list-button'
                        >
                            Products List
                        </button>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <label htmlFor="name">Product Name:</label>
                        <input 
                            type="text" 
                            id="name" 
                            value={name}
                            onChange={(e) => setName(e.target.value)} 
                            required
                        />

                        <label htmlFor="description">Description:</label>
                        <textarea 
                            id="description" 
                            value={productdescription}
                            onChange={(e) => setproductdescription(e.target.value)}
                            required
                        ></textarea>

                        <label htmlFor="price">Price:</label>
                        <input 
                            type="number" 
                            id="price" 
                            step="0.01"
                            min="0"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)} 
                            required
                        />

                        <label htmlFor="category">Category ID:</label>
                        <select className='select'
                            id="category"
                            value={categoryid}
                            onChange={(e) => setcategoryid(e.target.value)}
                            required
                            >
                            <option value="">Select Category</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                    {category.name}
                                    </option>
                                ))}
                        </select>

                        <label htmlFor="image">Image URL:</label>
                        <input 
                            type="text" 
                            id="image"  
                            value={productimage}
                            onChange={(e) => setproductImage(e.target.value)} 
                            onPaste={(e) => console.log("Pasted:", e.clipboardData.getData("text"))}
                            required
                        />
                        <label htmlFor="stock">Stock:</label>
                        <input 
                            type="number" 
                            id="stock" 
                            min="0"
                            value={productstock}
                            onChange={(e) => setproductstock(e.target.value)} 
                            required
                        />

                        <button type="submit">Add Product</button>
                    </form>
                    {data && (
                        <p style={{ 
                            color: data.status && msgStatus ? 'green' : 'red', 
                            textAlign: 'center', 
                            marginTop: '1rem', 
                            display: data.status && msgStatus ? 'block' : 'none'
                        }}>
                            {data.message || data.error}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AddProducts;