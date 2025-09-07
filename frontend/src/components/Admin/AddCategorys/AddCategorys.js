import React, { useEffect, useState } from 'react';
import "./AddCategory.css";
import Navbar from "../../Navbar/Navbar";
import { URL, ADD_CATEGORY } from '../../constants/Constants';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const AddCategorys = () => {
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [data, setData] = useState('');
    const navigate = useNavigate();
    const [msgStatus, setMsgStatus] = useState(false);

    console.log(msgStatus);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(name, image);

        try{
            const response = await fetch(URL + ADD_CATEGORY, {
                method: "POST",
                headers: { "Content-Type": "application/json", "Authorization": `Bearer ${Cookies.get('jwt_token')}` },
                body: JSON.stringify({ name, image }),
            });

            const data = await response.json();
            console.log(data);
            setData(data);
            setMsgStatus(true);
        }catch(error){
            console.log(error)
            setData({ error: 'backend is not running'});
        }

    }



    useEffect(() => {
        if(data?.status){
            setMsgStatus(true);  
        }else{
            setMsgStatus(false);
        }
        setTimeout(() => {
            setMsgStatus(false);
        }, 3000);
    }, [data?.status])

    





    return (
        <div className='add-category'> 
            <Navbar />
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "80vh" }}>  
                <div className='add-category-container'>
                    <div className="category-header">
                        <h2>Add Category</h2>
                        <button onClick={() => navigate('/categories-list')} className='categories-list-button'>Categories list</button>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <label htmlFor="category">Category:</label>
                        <input type="text" id="category" name="category" onChange={(e) => setName(e.target.value)} />
                        <label htmlFor="image">Image URL:</label>
                        <input type="text" id="image" name="image" onChange={(e) => setImage(e.target.value)} />
                        <button type="submit">Add Category</button>
                    </form>

                    {data && <p style={{ color: data.status ? 'green' : 'red', textAlign: 'center', marginTop: '1rem',
                    // display:data?.status && msgStatus ? 'block' : 'none'

                     }}>{data.message || data.error}</p>}
                </div>
            </div>
        </div>
    );
};

export default AddCategorys;
