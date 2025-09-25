import React, { useEffect, useState, useCallback } from 'react';
import { URL, GET_CART, UPDATE_CART_ITEM, REMOVE_CART_ITEM } from '../constants/Constants';
import Cookies from 'js-cookie';
import Navbar from '../Navbar/Navbar';
import "./Cart.css";
import { useDispatch } from 'react-redux';
import { setCount } from '../redux/reducer/user';
import { useNavigate } from 'react-router-dom'; 
import { Box, CircularProgress } from '@mui/material';
import { useSnackbar } from 'notistack';    
const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const fetchCartItems = useCallback(async () => {
        try {
            const response = await fetch(URL + GET_CART, {
                method: "GET",
                headers: { 
                    "Authorization": `Bearer ${Cookies.get('jwt_token')}` 
                },
            });
            const data = await response.json();
            setCartItems(data.items || []);
            dispatch(setCount(data.items.length));
        } catch (err) {
            console.error('Error fetching cart items:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCartItems();
    }, [fetchCartItems]);

    // Debounced update quantity function
    const updateQuantity = useCallback(async (itemId, newQuantity) => {
        if (newQuantity < 1) return;

        // Optimistic UI update
        setCartItems(prevItems => 
            prevItems.map(item => 
                item.id === itemId 
                    ? { ...item, quantity: newQuantity } 
                    : item
            )
        );

        try {
            setUpdating(prev => ({ ...prev, [itemId]: true }));
            
            const response = await fetch(`${URL}${UPDATE_CART_ITEM}/${itemId}`, {
                method: "PUT",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${Cookies.get('jwt_token')}` 
                },
                body: JSON.stringify({ quantity: newQuantity })
            });

            if (!response.ok) {
                throw new Error('Failed to update cart');
            }

            const data = await response.json();
            console.log('Updated cart item:', data);
            dispatch(setCount(data.items.length === 0 ? 0 : data.items.length));
            
        } catch (err) {
            console.error('Error updating cart item:', err);
          
            fetchCartItems();
        } finally {
            setUpdating(prev => ({ ...prev, [itemId]: false }));
        }
    }, [fetchCartItems]);

    const handleQuantityChange = (itemId, change) => {
        const item = cartItems.find(item => item.id === itemId);
        if (!item) return;

        const newQuantity = Math.max(1, item.quantity + change);
        updateQuantity(itemId, newQuantity);
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0).toFixed(2);
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
                   <CircularProgress />
            </Box>
        );
    }

    const handleRemove = async (itemId) => {
        try {
            const token = Cookies.get('jwt_token');
            if (!token) {
                enqueueSnackbar('Please login to modify cart', { variant: 'error' });
                return;
            }

            setUpdating(prev => ({ ...prev, [itemId]: true }));
            
            const response = await fetch(`${URL}${REMOVE_CART_ITEM}/${itemId}`, {
                method: "DELETE",
                headers: { 
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || 'Failed to remove item from cart');
            }

            const data = await response.json();
            console.log('Removed cart item:', data);
            
            // Update the cart count in Redux
            dispatch(setCount(data.items?.length || 0));
            
            // Show success message
            enqueueSnackbar('Product removed from cart!', { 
                variant: 'success',
                autoHideDuration: 3000,
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
            });
            
            // Refresh the cart items
            await fetchCartItems();

        } catch (err) {
            console.error('Error removing cart item:', err);
            enqueueSnackbar(err.message || 'Failed to remove item', { 
                variant: 'error',
                autoHideDuration: 3000,
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
            });
            await fetchCartItems();
        } finally {
            setUpdating(prev => ({ ...prev, [itemId]: false }));
        }
    };

    return (
        <div className="cart-container">
            {/* <Navbar /> */}
            <h1 className="cart-title">Your Shopping Cart</h1>
            
            {cartItems.length > 0 ? (
                <>
                    <div className="table-responsive">
                        <table className="cart-table">
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Image</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Total</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.map((item) => (
                                    <tr key={item.id}>
                                        <td className="product-name">{item.name}</td>
                                        <td>
                                            <img 
                                                src={item.productimage} 
                                                alt={item.name} 
                                                className="product-image" 
                                            />
                                        </td>
                                        <td className="product-price">${item.price}</td>
                                        <td>
                                            <div className="quantity-controls">
                                                <button 
                                                    className="quantity-btn"
                                                    onClick={() => handleQuantityChange(item.id, -1)}
                                                    disabled={updating[item.id] || item.quantity <= 1}
                                                >
                                                    -
                                                </button>
                                                <span className="quantity-display">
                                                    {updating[item.id] ? '...' : item.quantity}
                                                </span>
                                                <button 
                                                    className="quantity-btn"
                                                    onClick={() => handleQuantityChange(item.id, 1)}
                                                    disabled={updating[item.id]}
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </td>
                                        <td className="product-price">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </td>
                                        <td>
                                            <button 
                                                className="remove-btn"
                                                onClick={() => handleRemove(item.id)}
                                                disabled={updating[item.id]}
                                            
                                            >
                                                {updating[item.id] ? '...' : 'Remove'}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    
                    <div className="cart-summary">
                        <div>
                            <span className="total-amount">Total: ${calculateTotal()}</span>
                        </div>
                        <button 
                            className="checkout-btn" 
                            onClick={() => navigate("/order-success")}
                            disabled={Object.values(updating).some(Boolean)}
                        >
                            {Object.values(updating).some(Boolean) ? 'Updating...' : 'Proceed to Checkout'}
                        </button>
                    </div>
                </>
            ) : (
                <p className="cart-empty">Your cart is empty</p>
            )}
        </div>
    );
};

export default Cart;