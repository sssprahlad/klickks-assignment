import React, { useEffect, useState } from "react";
import { URL, GET_CATEGORY } from "../../../constants/Constants";
import Navbar from "../../../Navbar/Navbar";
import "./CategoriesList.css";
import Cookies from 'js-cookie';

const CategoriesList = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  console.log(error);


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

//   const handleUpdate = async (id) => {
//     try{
//         const response = await fetch(URL + GET_CATEGORY + id, {
//             method: "PATCH",
//             headers: { "Content-Type": "application/json", "Authorization": `Bearer ${Cookies.get('jwt_token')}` },
//             body: JSON.stringify({ name, image }),
//         });
//         const data = await response.json();
//         console.log(data);
//         setCategories(data);
//     }catch(error){
//         console.log(error)
//         setError(error.message);
//     }

//   }

const deleteCategory = async (id) => {
    try {
      if(window.confirm("Are you sure you want to delete this category?")){
        const response = await fetch(`${URL}${GET_CATEGORY}/${id}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json", "Authorization": `Bearer ${Cookies.get('jwt_token')}` },
        });
    
        if (!response.ok) {
          throw new Error(`Failed to delete category with id ${id}`);
        }
    
        setCategories((prev) => prev.filter((cat) => cat.id !== id));
      }
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };
  

  return (
    <div className="categories-list">
      <Navbar />
      <h2>Categories List</h2>
      {categories.length === 0 ? (
        <div>No categories found.</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id}>
                <td>{category.id}</td>
                <td>{category.name}</td>
                <td>
                  <img
                    src={category.image?.startsWith("http") ? category.image : `${URL}/${category.image}`}
                    alt={category.name}
                    width="50"
                    height="50"
                  />
                </td>
                <td>
                    <div className="actions-container">
                        {/* <button className="update-button" onClick={handleUpdate(category.id)}>Update</button> */}
                        <button className="delete-button" onClick={() => deleteCategory(category.id)}>
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

export default CategoriesList;
