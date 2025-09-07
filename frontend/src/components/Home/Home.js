import Navbar from "../Navbar/Navbar";
import { URL, GET_PRODUCTS, ADD_TO_CART, GET_CART, UPDATE_CART_ITEM, GET_CATEGORY } from '../constants/Constants';
import Cookies from 'js-cookie';
import { useEffect, useState } from "react";
import './Home.css';
import { useDispatch } from "react-redux";
import { setCount } from "../redux/reducer/user";


const Home = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [quantities, setQuantities] = useState({});
    const dispatch = useDispatch();
    const [addedProductsIds, setAddedProductsIds] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState();

    

    useEffect(() => {
        if (products.length > 0) {
            const initialQuantities = {};
            products.forEach(product => {
                initialQuantities[product.id] = 1;
            });
            setQuantities(initialQuantities);
        }
    }, [products]);

    const handleQuantityChange = (productId, change) => {
        setQuantities(prevQuantities => ({
            ...prevQuantities,
            [productId]: Math.max(1, (prevQuantities[productId] || 1) + change)
        }));
    };

    // const handleAddToCart = async (productId) => {

    //     console.log(addedProductsIds.includes(productId),"addedProductsIds");
      

    //         if(addedProductsIds.includes(productId)){
    //              try {
    //                 const quantityToAdd = quantities[productId] || 1;
                            
    //                         const response = await fetch(`${URL}${UPDATE_CART_ITEM}/${productId}`, {
    //                             method: "PUT",
    //                             headers: { 
    //                                 "Content-Type": "application/json",
    //                                 "Authorization": `Bearer ${Cookies.get('jwt_token')}` 
    //                             },
    //                             body: JSON.stringify({ quantity: quantityToAdd })
    //                         });
                
    //                         if (!response.ok) {
    //                             throw new Error('Failed to update cart');
    //                         }
                
    //                         const data = await response.json();
    //                         console.log('Updated cart item:', data);
                            
    //                     } catch (err) {
    //                         console.error('Error updating cart item:', err);
                          
                         
    //                     } 
                
    //         }

    //         try {
    //         const quantityToAdd = quantities[productId] || 1;
    //         const response = await fetch(`${URL}${ADD_TO_CART}/${productId}`, {
    //             method: "POST",
    //             headers: { 
    //                 "Content-Type": "application/json", 
    //                 "Authorization": `Bearer ${Cookies.get('jwt_token')}` 
    //             },
    //             body: JSON.stringify({ quantity: quantityToAdd })
    //         });
    //         const data = await response.json();
    //         console.log('Added to cart:', data);

           
    //         setQuantities(prev => ({
    //             ...prev,
    //             [productId]: 1
    //         }));
            
    //     } catch(err) {
    //         console.error('Error adding to cart:', err);
    //         setError(err.message);
    //     }
    // };


    const handleAddToCart = async (productId) => {
        const quantityToAdd = quantities[productId] || 1;

        const getProduct = addedProductsIds?.find(eachItem => eachItem.productid === productId);
        console.log(getProduct,"id");

        const updatedQuantity = getProduct?.quantity + quantityToAdd;
    
        if (getProduct?.productid === productId) {
           
            try {
                const response = await fetch(`${URL}${UPDATE_CART_ITEM}/${getProduct?.id}`, {
                    method: "PUT",
                    headers: { 
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${Cookies.get('jwt_token')}` 
                    },
                    body: JSON.stringify({ quantity: updatedQuantity })
                });
    
                if (!response.ok) {
                    throw new Error('Failed to update cart');
                }
    
                const data = await response.json();
                console.log('Updated cart item:', data);
    
                setQuantities(prev => ({
                    ...prev,
                    [productId]: 1
                }));
    
                return; 
            } catch (err) {
                console.error('Error updating cart item:', err);
                setError(err.message);
                return;
            }
        }
    
        try {
            const response = await fetch(`${URL}${ADD_TO_CART}/${productId}`, {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json", 
                    "Authorization": `Bearer ${Cookies.get('jwt_token')}` 
                },
                body: JSON.stringify({ quantity: quantityToAdd })
            });
    
            if (!response.ok) {
                throw new Error('Failed to add product to cart');
            }
    
            const data = await response.json();
            console.log('Added to cart:', data);
            

    
            setQuantities(prev => ({
                ...prev,
                [productId]: 1
            }));
    
            setAddedProductsIds(prev => [...prev, productId]);
        } catch (err) {
            console.error('Error adding to cart:', err);
            setError(err.message);
        }
    };
    

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
                console.log('Fetched products:', data);
                setProducts(data);
                dispatch(setCount(data?.length === 0 ? 0 : data?.length));
            } catch (err) {
                console.error('Error fetching products:', err);
                setError(err.message);
            }
        };
        fetchProducts();
    }, []);

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
                       setAddedProductsIds(data?.items);
                       dispatch(setCount(data?.items?.length));
                   } catch (err) {
                       console.error('Error fetching cart items:', err);
                   } 
        }
        fetchCartItems();
        
    }, []);

      useEffect(() => {
        const fetchCategories = async () => {
        try{
            const response = await fetch(URL + GET_CATEGORY, {
                method: "GET",
                headers: { "Content-Type": "application/json", "Authorization": `Bearer ${Cookies.get('jwt_token')}` },
            });
            const data = await response.json();
            console.log(data);
            setCategories(data);
        }catch(error){
            console.log(error)
            setError(error.message);
        }finally{
        }
        };
    
        fetchCategories();
      }, []);

      useEffect(() => {
        console.log(filteredProducts, "categoryid");
        if (filteredProducts === "ALL") {
          setProducts(products);
        } else {
          const filtered = products.filter(
            (product) => product.categoryid === filteredProducts
          );
          setProducts(filtered);
        }
      }, [filteredProducts]);



    return (
        <div className="home-container">
            <Navbar />
            {error && <div className="error">{error}</div>}
            <div className="home-container-2">  
                <h1>Welcome to the Home Page</h1>
                {/* <div>
                    <h2>
                        Categories
                    </h2>
                    <div style={{display: "flex", alignItems: "center", gap: "20px",margin: "20px 0px"}}>  
                        <button className="category-button">All</button>
                        {categories?.map((category) => (
                            <div key={category.id}>
                                <button className="category-button" onClick={() => setFilteredProducts(category.id)}>{category.name}</button>
                            </div>
                        ))}
                    </div>
                </div> */}
                <div className="products-container">
                    {products.length > 0 ? (
                        products.map((product) => (
                            <div key={product.id} className="product-card">
                                <img src={product?.productimage} alt={product.name} height={300} width={400} />
                                <h3 style={{textAlign: "left"}}>{product.name}</h3>
                                <p style={{textAlign: "left"}}>{product.productdescription}</p>
                                <div style={{display: "flex", justifyContent: "space-between"}}> 
                                    <p>price: {product.price}/-</p>
                                    <p>stock: {product.productstock}</p>
                                </div>
                                <div style={{display: "flex", alignItems: "center", gap: "10px"}}>
                                    <p>quantity: </p>
                                    <button 
                                        onClick={() => handleQuantityChange(product.id, -1)}
                                        disabled={quantities[product.id] <= 1}
                                        style={{
                                            marginRight: "10px", 
                                            height: "25px",
                                            width: "25px",
                                            cursor: quantities[product.id] > 1 ? 'pointer' : 'not-allowed',
                                            opacity: quantities[product.id] > 1 ? 1 : 0.5
                                        }}
                                    >-</button>
                                    <p style={{textAlign: "center", minWidth: "20px"}}>
                                        {quantities[product.id] || 1}
                                    </p>
                                    <button 
                                        onClick={() => handleQuantityChange(product.id, 1)}
                                        style={{
                                            marginLeft: "10px", 
                                            height: "25px",
                                            width: "25px",
                                            cursor: "pointer"
                                        }}
                                    >+</button>
                                </div>
                                <button 
                                    className="add-to-cart-button" 
                                    onClick={() => handleAddToCart(product.id)}
                                >
                                    Add to Cart
                                </button>
                            </div>
                        ))
                    ) : (
                        <p>No products available</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;
