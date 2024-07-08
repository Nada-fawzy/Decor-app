import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddProductComponent = () => {
  const navigate = useNavigate();
  const categories = ['Living Room', 'Kitchen', 'Bedrooms', 'Bathrooms', 'Outdoor', 'Home Office'];
  const [form, setForm] = useState({
  //  id: '',
    name: '',
    description: '',
    paths: {
      img: '',
      icon: [],
    },
    color: ['darkcyan', 'cornflowerblue', 'cadetblue', 'coral', 'burlywood'],
    price: '',
    rate: '',
    categoryId: 0, // Default category index

  });
  const iconArr = [
    'https://th.bing.com/th/id/OIP.EGjBiDLwzB0GIWcew26bGwAAAA?rs=1&pid=ImgDetMain',
    'https://th.bing.com/th/id/OIP.W67uDPBXyVwdhkB8qF3dyAHaLH?rs=1&pid=ImgDetMain',
    'https://th.bing.com/th/id/OIP.8vZ0PNtUonAiAowVamFr8gHaF-?rs=1&pid=ImgDetMain',
    'https://th.bing.com/th/id/OIP.v3gLmRH_-iFx46MfpjKGSAAAAA?rs=1&pid=ImgDetMain',
  ]
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log({ name, value } );
    if(name === 'img'){
      setForm({
        ...form,
        paths: {img : value , icon : iconArr}
      });
    } else {
          setForm({
      ...form,
      [name]: value, 
    });
    }

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/products', form);

      console.log('Response:', response);
      navigate('/product');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="con w-75 m-auto p-3">
      <h1>Add Product</h1>
      <hr />
      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          {/* <div className="col-md-3 col-sm-12">
            <label htmlFor="id">ID</label>
            <input
              type="text"
              name="id"
              className="form-control w-100"
              id="id"
              value={form.id}
              onChange={handleChange}
            />
            {errors.id && <p style={{ color: 'red' }}>{errors.id}</p>}
          </div> */}
          <div className="col-md-3 col-sm-12">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              className="form-control w-100"
              id="name"
              value={form.name}
              onChange={handleChange}
            />
            {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
          </div>
          <div className="col-md-3 col-sm-12">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              className="form-control"
              id="description"
              value={form.description}
              onChange={handleChange}
            ></textarea>
            {errors.description && <p style={{ color: 'red' }}>{errors.description}</p>}
          </div>
          <div className="col-md-4 col-sm-12">
            <label htmlFor="img">Image URL</label>
            <input
              type="text"
              name="img"
              className="form-control"
              id="img"
              value={form.paths.img && form.paths.img }
              onChange={handleChange}
            />
            {errors.img && <p style={{ color: 'red' }}>{errors.img}</p>}
            {form.paths.img && <img src={form.paths.img} alt="Product" />}
          </div>
          <div className="col-md-3 col-sm-12">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              name="price"
              className="form-control w-100"
              id="price"
              value={form.price}
              onChange={handleChange}
            />
            {errors.price && <p style={{ color: 'red' }}>{errors.price}</p>}
          </div>
          <div className="col-md-3 col-sm-12">
            <label htmlFor="rate">Rate</label>
            <input
              type="number"
              name="rate"
              className="form-control w-100"
              id="rate"
              value={form.rate}
              onChange={handleChange}
            />
            {errors.rate && <p style={{ color: 'red' }}>{errors.rate}</p>}
          </div>
          <div className="col-md-3 col-sm-12">
          <label htmlFor="categoryId">Category</label>
            <select
              name="categoryId"
              className="form-control w-100"
              id="categoryId"
              value={form.categoryId}
              onChange={handleChange}
            >
              {categories.map((category, index) => (
                <option key={index} value={index+1}>
                  {category}
                </option>
              ))}
            </select>
            {errors.categoryId && <p style={{ color: 'red' }}>{errors.categoryId}</p>}
          </div>
        </div>
        <div className="d-flex justify-content-end mt-3">
          <button className="btn btn-success w-25 m-auto" type="submit">
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProductComponent;
